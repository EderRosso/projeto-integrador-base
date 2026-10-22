import { Component, input, output } from '@angular/core';
import { OrdemServico, StatusOrdemServico } from '../ordem-servico.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordem-servico-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordem-servico-card.html',
  styleUrl: './ordem-servico-card.css'
})
export class OrdemServicoCard {
  os = input.required<OrdemServico>();
  mudarStatus = output<StatusOrdemServico>();

  alterar(novoStatus: StatusOrdemServico) {
    this.mudarStatus.emit(novoStatus);
  }
}