import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
