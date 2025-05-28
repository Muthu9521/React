import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For *ngIf, *ngFor, etc.
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent],  // <-- Import LoginComponent and CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // App logic here
}
