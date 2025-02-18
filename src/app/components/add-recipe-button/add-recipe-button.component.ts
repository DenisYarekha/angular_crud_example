import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-recipe-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './add-recipe-button.component.html',
  styleUrls: ['./add-recipe-button.component.scss'],
})
export class AddRecipeButtonComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AddRecipeDialogComponent, {
      width: '500px',
    });
  }
}
