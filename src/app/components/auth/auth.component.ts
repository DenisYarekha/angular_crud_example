import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private dialog: MatDialog) {}

  // Открытие модалки для логина
  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });
  }

  // Открытие модалки для регистрации
  openRegisterDialog(): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '300px',
    });
  }
}
