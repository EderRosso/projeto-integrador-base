
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuscaStatusMockService } from '../services/busca-status-mock.service';
import { StatusVeiculo } from '../busca-status.model';
import { StatusCardComponent } from '../status-card/status-card';

@Component({
  selector: 'app-busca-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusCardComponent],
  templateUrl: './busca-lista.html',
  styleUrls: ['./busca-lista.css']
})
export class BuscaListaComponent {
  private buscaService = inject(BuscaStatusMockService);

  placaControl = new FormControl('', [
    Validators.required, 
    Validators.pattern(/^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)
  ]);

  // Signals para controlar a tela
  resultadoBusca = signal<StatusVeiculo | null>(null);
  pesquisado = signal<boolean>(false);
  carregando = signal<boolean>(false);

  buscar() {
   
    if (this.placaControl.invalid) {
      this.placaControl.markAsTouched();
      return;
    }

    this.carregando.set(true);
    this.pesquisado.set(true);
    this.resultadoBusca.set(null); 
    const placa = this.placaControl.value!;

    this.buscaService.buscarPorPlaca(placa).subscribe({
      next: (veiculo) => {
        this.resultadoBusca.set(veiculo);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
      }
    });
  }
}
