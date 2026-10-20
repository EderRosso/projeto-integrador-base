# Receitas

Soluções prontas para situações que aparecem em quase todos os temas. Os exemplos usam **Pets** e **Tutores** (tema Pet shop); troque pelos nomes do seu módulo.

| Nº | Receita | Quando usar |
| --- | --- | --- |
| 1 | [Busca por texto](#1-busca-por-texto) | Filtro "busca por parte do nome" |
| 2 | [Exclusão lógica](#2-exclusão-lógica) | Módulos em que "excluir apenas inativa" |
| 3 | [Mostrar a referência na listagem](#3-mostrar-a-referência-na-listagem) | Campo que aponta para outro módulo |
| 4 | [Select de referência no formulário](#4-select-de-referência-no-formulário) | Escolher o tutor, o livro, o cliente... |
| 5 | [Validar uma referência](#5-validar-uma-referência) | Regra "o X informado precisa existir" |
| 6 | [Datas no formulário e na tela](#6-datas-no-formulário-e-na-tela) | Campos de data ou data e hora |
| 7 | [Botões de status](#7-botões-de-status) | Módulo C (fluxo de estados) |
| 8 | [Testar um service que usa outro service](#8-testar-um-service-que-usa-outro-service) | Depois da receita 5 |

---

## 1. Busca por texto

**Back-end** — o controller recebe `?busca=` e o service monta o filtro com expressão regular:

```ts
// pets.controller.ts
@Get()
@ApiQuery({ name: 'busca', required: false })
listar(@Query('busca') busca?: string) {
  return this.petsService.listar(busca);
}

// pets.service.ts
async listar(busca?: string): Promise<Pet[]> {
  // $options: 'i' = não diferencia maiúsculas de minúsculas
  const filtro = busca ? { nome: { $regex: busca, $options: 'i' } } : {};
  return this.petModel.find(filtro).sort({ nome: 1 }).lean().exec();
}
```

**Front-end** — um campo de busca que recarrega a lista a cada letra:

```html
<!-- pets-lista.html -->
<div class="barra-filtros">
  <label for="busca">Buscar</label>
  <input id="busca" type="search" placeholder="Digite parte do nome" (input)="buscar($any($event.target).value)" />
</div>
```

```ts
// pets-lista.ts
protected readonly busca = signal('');

protected buscar(texto: string): void {
  this.busca.set(texto);
  this.carregar(); // dentro de carregar(): this.petsService.listar(this.busca() || undefined)
}
```

No serviço mock, filtre com `nome.toLowerCase().includes(busca.toLowerCase())`.

---

## 2. Exclusão lógica

Em vez de apagar o documento, o `DELETE` marca `ativo: false`. A listagem padrão mostra só os ativos; `?todos=true` mostra todos.

```ts
// servicos.service.ts
async listar(todos = false): Promise<Servico[]> {
  const filtro = todos ? {} : { ativo: true };
  return this.servicoModel.find(filtro).sort({ nome: 1 }).lean().exec();
}

async remover(id: string): Promise<void> {
  this.validarId(id);
  const inativado = await this.servicoModel
    .findByIdAndUpdate(id, { ativo: false }, { new: true })
    .lean()
    .exec();
  if (!inativado) {
    throw new NotFoundException(`Serviço ${id} não encontrado`);
  }
}

// servicos.controller.ts
@Get()
@ApiQuery({ name: 'todos', required: false, description: 'true = inclui os inativos' })
listar(@Query('todos') todos?: string) {
  return this.servicosService.listar(todos === 'true');
}
```

Para reativar, a tela de edição envia `PATCH /servicos/:id` com `{ "ativo": true }` (o `UpdateDto` já aceita `ativo`).

---

## 3. Mostrar a referência na listagem

O MongoDB guarda só o `_id` do tutor dentro do pet. Para a listagem mostrar o **nome** do tutor, use `populate` no service:

```ts
// pets.service.ts
return this.petModel
  .find(filtro)
  .populate('tutor', 'nome') // troca o _id por { _id, nome }
  .sort({ nome: 1 })
  .lean()
  .exec();
```

No front, o campo é do tipo `Referencia` (arquivo `core/models/referencia.ts`, que já vem no projeto). Use `textoDe` para mostrar:

```ts
// pets-lista.ts
import { textoDe } from '../../../core/models/referencia';

export class PetsLista {
  protected readonly textoDe = textoDe;
  // ...
}
```

```html
<!-- pets-lista.html -->
<td>{{ textoDe(p.tutor) }}</td>
<!-- outro campo para mostrar: textoDe(os.veiculo, 'placa') -->
```

No mock, a referência é só o id (`tutor: '1'`); `textoDe` mostra o próprio id até a aula 13, quando a API passa a mandar o nome.

> **Teste unitário:** se o service usa `.populate()`, acrescente `populate: jest.fn().mockReturnThis()` na função `consulta()` copiada de `produtos.service.spec.ts`.

---

## 4. Select de referência no formulário

O formulário de pets precisa listar os tutores para o usuário escolher. Injete o serviço do colega:

```ts
// pet-form.ts
import { idDe } from '../../../core/models/referencia';
import { Tutor } from '../../tutores/tutor.model';
import { TutoresService } from '../../tutores/services/tutores.service';

export class PetForm implements OnInit {
  private readonly tutoresService = inject(TutoresService);
  protected readonly tutores = signal<Tutor[]>([]);

  ngOnInit(): void {
    this.tutoresService.listar().subscribe((lista) => this.tutores.set(lista));

    const id = this.id();
    if (id) {
      this.petsService.buscarPorId(id).subscribe({
        // a API pode devolver o tutor como objeto: guardamos só o _id no formulário
        next: (pet) => this.form.patchValue({ ...pet, tutor: idDe(pet.tutor) }),
        error: (e: Error) => this.erro.set(e.message),
      });
    }
  }
}
```

```html
<!-- pet-form.html -->
<div class="campo">
  <label for="tutor">Tutor *</label>
  <select id="tutor" formControlName="tutor" [class.invalido]="invalido('tutor')">
    <option value="" disabled>Selecione...</option>
    @for (t of tutores(); track t._id) {
      <option [value]="t._id">{{ t.nome }}</option>
    }
  </select>
  @if (invalido('tutor')) {
    <small class="msg-erro">Escolha o tutor.</small>
  }
</div>
```

**E se o módulo do colega ainda não existe?** Combine com ele o nome do arquivo de modelo e do serviço (está no manual do tema) e, até lá, use uma lista fixa no próprio componente:

```ts
protected readonly tutores = signal([{ _id: '1', nome: 'Maria Souza' }, { _id: '2', nome: 'João Lima' }]);
```

---

## 5. Validar uma referência

Regra: "o tutor informado precisa existir". O service de Pets pede ajuda ao service de Tutores.

**Passo 1** — o módulo do colega exporta o service (o modelo de Produtos já faz isso):

```ts
// tutores.module.ts
@Module({
  imports: [MongooseModule.forFeature([{ name: Tutor.name, schema: TutorSchema }])],
  controllers: [TutoresController],
  providers: [TutoresService],
  exports: [TutoresService], // ← permite que outros módulos usem
})
export class TutoresModule {}
```

**Passo 2** — o seu módulo importa o módulo do colega:

```ts
// pets.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    TutoresModule, // ← aqui
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
```

**Passo 3** — injete e use no `criar` (e no `atualizar`, se o campo vier):

```ts
// pets.service.ts
constructor(
  @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
  private readonly tutoresService: TutoresService,
) {}

async criar(dto: CreatePetDto): Promise<Pet> {
  // buscarPorId já lança 404 se o tutor não existir
  await this.tutoresService.buscarPorId(dto.tutor);
  const criado = await this.petModel.create(dto);
  return criado.toObject();
}
```

> **Cuidado com o ciclo:** se Pets importa Tutores, Tutores **não** pode importar Pets. Se as duas regras forem necessárias, fale com o professor.

---

## 6. Datas no formulário e na tela

| Situação | Como fazer |
| --- | --- |
| Campo só de data | `<input type="date" formControlName="dataNascimento" />` — o valor é `'2021-03-15'` |
| Campo de data e hora | `<input type="datetime-local" formControlName="dataHora" />` — o valor é `'2026-11-20T14:00'` |
| Ao editar (data) | `patchValue({ ...registro, dataNascimento: registro.dataNascimento?.slice(0, 10) })` |
| Ao editar (data e hora) | `patchValue({ ...registro, dataHora: registro.dataHora.slice(0, 16) })` |
| Mostrar na lista | importe `DatePipe` e use `{{ a.dataHora \| date: 'dd/MM/yyyy HH:mm' }}` |
| Comparar no service | `new Date(dto.dataHora) <= new Date()` (futuro × passado) |

A API devolve as datas no formato ISO com fuso (`2026-11-20T17:00:00.000Z`); o `DatePipe` converte para o horário local.

---

## 7. Botões de status

O front repete o mapa de transições só para **esconder** os botões inválidos. Quem **garante** a regra é a API.

```ts
// atendimento.model.ts — acrescente
export const TRANSICOES: Record<Status, Status[]> = {
  agendado: ['em_atendimento', 'cancelado'],
  em_atendimento: ['concluido'],
  concluido: [],
  cancelado: [],
};

// services/atendimentos.service.ts — acrescente no contrato
abstract mudarStatus(id: string, status: Status): Observable<Atendimento>;

// services/atendimentos-api.service.ts
mudarStatus(id: string, status: Status): Observable<Atendimento> {
  return this.http
    .patch<RespostaApi<Atendimento>>(`${this.url}/${id}/status`, { status })
    .pipe(map((r) => r.dados), catchError(this.tratarErro));
}
```

```html
<!-- atendimentos-lista.html, na coluna de ações -->
@for (proximo of transicoes[a.status]; track proximo) {
  <button type="button" class="botao secundario" (click)="mudarStatus(a, proximo)">
    {{ proximo }}
  </button>
}
```

No componente: `protected readonly transicoes = TRANSICOES;` e um método `mudarStatus(a, proximo)` que chama o serviço e recarrega a lista, igual ao `excluir` de Produtos.

---

## 8. Testar um service que usa outro service

Depois da receita 5, o teste do seu service precisa de um "dublê" do service do colega:

```ts
// pets.service.spec.ts
const tutoresServiceMock = { buscarPorId: jest.fn() };

const modulo = await Test.createTestingModule({
  providers: [
    PetsService,
    { provide: getModelToken(Pet.name), useValue: modelMock },
    { provide: TutoresService, useValue: tutoresServiceMock },
  ],
}).compile();

it('não cadastra pet de tutor inexistente', async () => {
  tutoresServiceMock.buscarPorId.mockRejectedValue(new NotFoundException());
  await expect(service.criar(dto)).rejects.toBeInstanceOf(NotFoundException);
  expect(modelMock.create).not.toHaveBeenCalled();
});
```
