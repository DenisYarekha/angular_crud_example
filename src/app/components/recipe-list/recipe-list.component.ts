import { Component } from '@angular/core';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
