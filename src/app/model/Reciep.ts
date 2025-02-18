export class Reciep {
  name: string;
  description: string;
  imagePath: string;
  ingredients: string[];

  constructor() {
    this.name = '';
    this.description = '';
    this.imagePath = '';
    this.ingredients = [];
  }
}
