import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For *ngIf, etc.
import { FormsModule } from '@angular/forms';    // For ngModel, ngForm

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <--- Add this line
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit() {
    if (this.email === 'admin@example.com' && this.password === '123456') {
      alert('Login successful!');
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
