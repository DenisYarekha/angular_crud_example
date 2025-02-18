import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-recipe-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './edit-recipe-dialog.component.html',
  styleUrls: ['./edit-recipe-dialog.component.scss'],
})
export class EditRecipeDialogComponent {
  id: number = 0;
  recipeName: string = '';
  recipeDescription: string = '';
  imageUrl: string | ArrayBuffer | null = null;
  ingredients: { name: string; amount: number; unit: string }[] = [];
  units: string[] = ['г', 'кг', 'мл', 'л', 'шт', 'ч. л.', 'ст. л.'];

  constructor(
    private dialogRef: MatDialogRef<EditRecipeDialogComponent>,
    private recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) public data: Recipe // Получаем данные для редактирования
  ) {
    this.resetState(data);
  }

  ngOnInit(): void {
    this.resetState(this.data); // Сбрасываем состояние при инициализации
  }

  resetState(data: Recipe): void {
    this.id = data.id || 0;
    this.recipeName = data.name || '';
    this.recipeDescription = data.description || '';
    this.ingredients = data.ingredients ? [...data.ingredients] : [];
    this.imageUrl = data.image || null; // Сбрасываем изображение
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
    const updatedRecipe: Recipe = {
      id: this.id,
      name: this.recipeName,
      description: this.recipeDescription,
      ingredients: [...this.ingredients],
      image: this.imageUrl,
      createdAt: this.data.createdAt || new Date(),
    };

    this.dialogRef.close(updatedRecipe); // Возвращаем обновленный рецепт
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
