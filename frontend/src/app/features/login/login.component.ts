import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensagemPendencia: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, senha } = this.loginForm.value;

    // ATENÇÃO: Validação temporária (mock) de frontend. 
    // A autenticação real e segura depende da integração futura com o backend.
    if (email === 'admin@oficina.com' && senha === 'admin123') {
      alert('Login simulado com sucesso! (Aguardando integração com serviço de autenticação real)');
    } else {
      this.mensagemPendencia = 'Credenciais inválidas. Verifique os dados informados.';
    }
  }
}