/**
 * Campo que aponta para outro módulo (ex.: o tutor de um pet).
 * - Ao CADASTRAR, o front envia só o _id (string).
 * - Ao LISTAR, a API pode devolver o documento resumido, se o service usar
 *   .populate('tutor', 'nome') → { _id: '...', nome: 'Maria' }.
 * Por isso o campo pode ser uma coisa OU outra.
 */
export type Referencia = string | { _id: string; [campo: string]: unknown };

/** Devolve o _id, venha a referência como texto ou como objeto. */
export function idDe(ref: Referencia | null | undefined): string {
  if (!ref) return '';
  return typeof ref === 'string' ? ref : ref._id;
}

/**
 * Devolve o texto para mostrar na tela (ex.: o nome do tutor).
 * Se a API ainda não fez populate, mostra o próprio _id.
 * Uso no HTML: {{ textoDe(pet.tutor) }}  ou  {{ textoDe(os.veiculo, 'placa') }}
 */
export function textoDe(ref: Referencia | null | undefined, campo = 'nome'): string {
  if (!ref) return '—';
  if (typeof ref === 'string') return ref;
  const valor = ref[campo];
  return typeof valor === 'string' || typeof valor === 'number' ? String(valor) : ref._id;
}
