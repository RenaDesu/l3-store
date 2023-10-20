import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { favoriteService } from '../../services/favorite.service';
import Router from '../../router';

class Favorites extends Component {
  products!: ProductData[];
  router!: Router;

 async render() {
    this.products = await favoriteService.get();
    this.router = new Router();
    if (this.products.length < 1) {
        this.view.root.classList.add('is__empty');
        // this.router.toHome();
        return;
    }

    this.products.forEach((product) => {
        const productComp = new Product(product, { isHorizontal: false });
        productComp.render();
        productComp.attach(this.view.favorites);
    });
  }

//   async update() {
//     this.products = await favoriteService.get();
//     if (this.products.length < 1) {
//         this.view.root.classList.add('is__empty');
//         this.router.toHome();
//         // @ts-ignore
//         document.querySelector('[data-favorites]').style.display = 'none';
//     } else {
//         this.view.root.classList.remove('is__empty');
//         // @ts-ignore
//         document.querySelector('[data-favorites]').style.display = 'block';
//     }
//   }
}

export const favoritesComp = new Favorites(html);