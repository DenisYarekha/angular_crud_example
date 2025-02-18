import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditRecipeDialogComponent } from '../edit-recipe-dialog/edit-recipe-dialog.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  deleteRecipe(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Вы уверены, что хотите удалить рецепт "${this.recipe.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.removeRecipe(this.recipe);
      }
    });
  }

  editRecipe(): void {
    console.log('Editing recipe:', this.recipe);
    const dialogRef = this.dialog.open(EditRecipeDialogComponent, {
      width: '500px',
      data: { ...this.recipe },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Если пользователь сохранил изменения, обновляем рецепт
        console.log('Updated recipe:', result);
        this.recipeService.updateRecipe(result);
      }
    });
  }
}
