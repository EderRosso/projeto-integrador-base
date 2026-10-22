import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusVeiculo } from '../busca-status.model';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule, DatePipe], // Usamos o DatePipe para formatar a data
  templateUrl: './status-card.html',
  styleUrls: ['./status-card.css']
})
export class StatusCardComponent {
  // O input required liga os dados que vêm da lista de pesquisa a este cartão
  veiculo = input.required<StatusVeiculo>();
}


