import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.scss'],
})
export class AddRecipeDialogComponent {
  recipeName: string = '';
  recipeDescription: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  ingredients: { name: string; amount: number; unit: string }[] = [];
  units: string[] = ['г', 'кг', 'мл', 'л', 'шт', 'ч. л.', 'ст. л.'];

  constructor(
    private dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) public data: Recipe // Получаем данные для редактирования
  ) {
    if (data) {
      // Если передан рецепт для редактирования, заполняем поля
      this.recipeName = data.name;
      this.recipeDescription = data.description;
      this.ingredients = data.ingredients;
      this.imageUrl = data.image || null;
    }
  }

  isFormInvalid(): boolean {
    // Проверяем, что название и описание заполнены
    if (!this.recipeName || !this.recipeDescription) {
      return true;
    }

    // Проверяем, что есть хотя бы один ингредиент
    if (this.ingredients.length === 0) {
      return true;
    }

    // Проверяем, что все ингредиенты заполнены
    for (const ingredient of this.ingredients) {
      if (!ingredient.name || !ingredient.amount || !ingredient.unit) {
        return true;
      }
    }

    return false;
  }

  addIngredient(): void {
    this.ingredients.push({ name: '', amount: 0, unit: 'г' });
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveRecipe(): void {
    const newRecipe: Recipe = {
      name: this.recipeName,
      description: this.recipeDescription,
      ingredients: this.ingredients,
      image: this.imageUrl,
      id: 0,
      createdAt: new Date(),
    };

    this.recipeService.addRecipe(newRecipe);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
