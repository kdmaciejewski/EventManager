import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  onLogin() {
    const { email, password } = this.login;

    this.authService.loginUser(email, password).subscribe({
      next: (response) => {
        if (response) {
          sessionStorage.setItem('email', response.email);
          this.router.navigate(['home']);
        } else {
          this.showError('Invalid login credentials');
        }
      },
      error: () => {
        this.showError('Unable to login. Please try again.');
      },
    });
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Error',
      detail: message,
    });
  }
}
