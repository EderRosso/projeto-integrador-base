import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo } from '../veiculo.model';

@Component({
  selector: 'app-veiculo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veiculo-card.html',
  styleUrls: ['./veiculo-card.css']
})
export class VeiculoCardComponent {
  veiculo = input.required<Veiculo>();

  
  clicado = output<Veiculo>();

  aoClicar() {
    this.clicado.emit(this.veiculo());
  }
}
