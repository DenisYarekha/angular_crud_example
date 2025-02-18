import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: { name: string; amount: number; unit: string }[];
  image?: string | ArrayBuffer | null;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipes.asObservable();
  private storageKey = 'recipes';

  constructor() {
    this.loadRecipes();
  }

  // Загружаем рецепты из localStorage или добавляем начальные
  private loadRecipes() {
    const storedRecipes = localStorage.getItem(this.storageKey);
    if (storedRecipes) {
      this.recipes.next(JSON.parse(storedRecipes));
    } else {
      const initialRecipes: Recipe[] = [
        {
          id: 1,
          name: 'Котлеты с помидорами и сыром (в духовке)',
          description:
            'Эти сытные мясные котлеты с помидорами и сыром готовятся в духовке. В процессе запекания сыр плавится, а помидоры и лук выделяют сок, что делает котлеты особенно вкусными и нежными.',
          ingredients: [
            { name: 'Фарш мясной', amount: 500, unit: 'г' },
            { name: 'Помидоры', amount: 250, unit: 'г' },
            { name: 'Сыр', amount: 100, unit: 'г' },
            { name: 'Лук', amount: 200, unit: 'г' },
            { name: 'Молоко', amount: 100, unit: 'мл' },
            { name: 'Яйца', amount: 2, unit: 'шт' },
            { name: 'Майонез (или сметана)', amount: 65, unit: 'г' },
          ],
          image:
            'https://img1.russianfood.com/dycontent/images_upl/740/big_739714.jpg',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Шоколадный торт на кефире, с кремом из сгущёнки и орехами',
          description:
            'Простой торт без раскатки коржей. Выпекается шоколадный бисквит из теста на кефире с добавлением какао. Бисквит разрезается на три коржа, которые прослаиваются кремом из сгущённого молока и сливочного масла, а также жареными фисташками или другими орехами.',
          ingredients: [
            { name: 'Кефир', amount: 250, unit: 'мл' },
            { name: 'Яйца', amount: 2, unit: 'шт' },
            { name: 'Мука', amount: 160, unit: 'г' },
            { name: 'Сода', amount: 1, unit: 'ч.л.' },
            { name: 'Сливочное масло', amount: 3, unit: 'ст. л.' },
          ],
          image:
            'https://img1.russianfood.com/dycontent/images_upl/742/big_741127.jpg',
          createdAt: new Date(),
        },
      ];
      this.saveRecipes(initialRecipes);
    }
  }

  // Возвращаем текущие рецепты
  getRecipes(): Recipe[] {
    return this.recipes.value;
  }

  // Сохраняем рецепты в localStorage
  private saveRecipes(recipes: Recipe[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
    this.recipes.next(recipes);
  }

  // Добавление нового рецепта
  addRecipe(recipe: Recipe): void {
    const currentRecipes = this.recipes.value;
    const newRecipe = {
      ...recipe,
      id: this.generateUniqueId(),
      createdAt: new Date(),
    };
    const updatedRecipes = [...currentRecipes, newRecipe];
    this.saveRecipes(updatedRecipes);
  }

  // Генерация уникального ID для нового рецепта
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  // Удаление рецепта
  removeRecipe(recipeToDelete: Recipe): void {
    const updatedRecipes = this.recipes.value.filter(
      (recipe) => recipe.id !== recipeToDelete.id
    );
    this.saveRecipes(updatedRecipes);
  }

  // Обновление рецепта
  updateRecipe(updatedRecipe: Recipe): void {
    const currentRecipes = this.recipes.value;
    const index = currentRecipes.findIndex(
      (recipe) => recipe.id === updatedRecipe.id
    );

    if (index !== -1) {
      const updatedRecipes = [...currentRecipes];
      updatedRecipes[index] = { ...updatedRecipe };
      this.saveRecipes(updatedRecipes);
    }
  }
}
