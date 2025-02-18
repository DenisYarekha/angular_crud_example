import { Component } from '@angular/core';
import { RecipeService, Recipe } from './services/recipe.service';
import { AddRecipeButtonComponent } from './components/add-recipe-button/add-recipe-button.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AddRecipeButtonComponent,
    RecipeCardComponent,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    RecipeListComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
