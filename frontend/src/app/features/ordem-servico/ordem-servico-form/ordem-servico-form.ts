import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { OrdemServicoService } from '../services/ordem-servico.service';
import { VeiculosService } from '../../veiculos/services/veiculos.service';
import { ClienteService } from '../../clientes/cliente.service';
import { Veiculo } from '../../veiculos/veiculo.model';
import { Cliente } from '../../clientes/cliente.model';
import { OrdemServicoInput } from '../ordem-servico.model';

@Component({
  selector: 'app-ordem-servico-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ordem-servico-form.html',
  styleUrl: './ordem-servico-form.css',
})
export class OrdemServicoForm implements OnInit {
  private fb = inject(FormBuilder);
  private ordemService = inject(OrdemServicoService);
  private veiculosService = inject(VeiculosService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  veiculos: Veiculo[] = [];
  clientes: Cliente[] = [];
  carregando = true;
  salvando = false;
  erro = '';

  form = this.fb.nonNullable.group({
    veiculoId: ['', Validators.required],
    descricaoProblema: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    this.clientes = this.clienteService.obterClientes();

    this.veiculosService.listar().subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os veículos cadastrados.';
        this.carregando = false;
      },
    });
  }

  get veiculoSelecionado(): Veiculo | undefined {
    const id = this.form.controls.veiculoId.value;
    return this.veiculos.find((veiculo) => veiculo._id === id);
  }

  get clienteSelecionado(): Cliente | undefined {
    const clienteId = this.veiculoSelecionado?.clienteId;

    return this.clientes.find((cliente) => cliente.id === clienteId);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const veiculo = this.veiculoSelecionado;

    if (!veiculo || veiculo.clienteId == null || !this.clienteSelecionado) {
      this.erro = 'Selecione um veículo vinculado a um cliente cadastrado.';
      return;
    }

    this.salvando = true;
    this.erro = '';

    const dados: OrdemServicoInput = {
      veiculoId: veiculo._id,
      clienteId: veiculo.clienteId,
      descricaoProblema: this.form.controls.descricaoProblema.value.trim(),
      status: 'Na Fila',
      dataEntrada: this.dataAtual(),
    };

    this.ordemService.criar(dados).subscribe({
      next: () => {
        this.router.navigate(['/painel/ordem-servico']);
      },
      error: () => {
        this.erro = 'Não foi possível salvar a ordem de serviço.';
        this.salvando = false;
      },
    });
  }

  private dataAtual(): string {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}