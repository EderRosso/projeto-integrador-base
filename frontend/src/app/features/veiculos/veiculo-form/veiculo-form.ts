import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VeiculosService } from '../services/veiculos.service';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './veiculo-form.html',
  styleUrls: ['./veiculo-form.css']
})
export class VeiculoFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private veiculosService = inject(VeiculosService);
  private router = inject(Router);

  // A variável que guarda as regras do formulário
  form!: FormGroup;
  salvando = false;

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      cor: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1950), Validators.max(2026)]],
      defeitoRelatado: ['', Validators.required]
    });
  }

  // Função para salvar os dados
  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Faz os erros aparecerem se o form for inválido
      return;
    }

    this.salvando = true;
    const dados = this.form.value;

    this.veiculosService.criar(dados).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/veiculos']); // Volta para a lista após salvar
      },
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        this.salvando = false;
      }
    });
  }
}
