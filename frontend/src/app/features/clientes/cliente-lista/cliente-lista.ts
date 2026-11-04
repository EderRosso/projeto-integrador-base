import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-lista.html',
  styleUrls: ['./cliente-lista.css']
})
export class ClienteLista {
  private clienteService = inject(ClienteService);

  clientes = signal<Cliente[]>(this.clienteService.obterClientes());

  deletar(id?: number) {
    if (id && confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.excluirCliente(id);
      this.clientes.set(this.clienteService.obterClientes());
    }
  }
}