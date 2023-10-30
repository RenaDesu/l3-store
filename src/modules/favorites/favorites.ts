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
        this.router.toHome();
        return;
    }
    // @ts-ignore
    document.querySelector('[data-favorites]').style.display = 'block';

    this.products.forEach((product) => {
        const productComp = new Product(product, { isHorizontal: false });
        productComp.render();
        productComp.attach(this.view.favorites);
    });
  }
}

export const favoritesComp = new Favorites(html);