import { Injectable, signal } from '@angular/core';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesMock = signal<Cliente[]>([
    {
      id: 1,
      nomeCompleto: 'Carlos Silva',
      cpf: '123.456.789-00',
      telefone: '(11) 98765-4321',
      email: 'carlos.silva@email.com',
      endereco: {
        cep: '01001-000',
        rua: 'Praça da Sé',
        numero: '100',
        bairro: 'Sé',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      observacoes: 'Cliente prefere contato via WhatsApp.'
    },
    {
      id: 2,
      nomeCompleto: 'Mariana Souza',
      cpf: '987.654.321-11',
      telefone: '(11) 91234-5678',
      email: 'mariana@email.com',
      endereco: {
        cep: '01310-100',
        rua: 'Avenida Paulista',
        numero: '1500',
        complemento: 'Apto 42',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP'
      }
    }
  ]);

  obterClientes() {
    return this.clientesMock();
  }

  adicionarCliente(cliente: Cliente) {
    const novoId = Date.now();
    this.clientesMock.update(lista => [...lista, { ...cliente, id: novoId }]);
  }

  atualizarCliente(clienteAtualizado: Cliente) {
    this.clientesMock.update(lista =>
      lista.map(c => c.id === clienteAtualizado.id ? clienteAtualizado : c)
    );
  }

  excluirCliente(id: number) {
    this.clientesMock.update(lista => lista.filter(c => c.id !== id));
  }
}