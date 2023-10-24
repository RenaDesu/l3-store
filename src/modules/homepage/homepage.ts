import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
//Временно выводм компонент для теста
import { SearchSuggestions } from '../searchSuggestions/searchSuggestions';

class Homepage extends Component {
  popularProducts: ProductList;
  //Временно выводм компонент для теста
  searchSuggestions: SearchSuggestions

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    //Временно выводм компонент для теста
    this.searchSuggestions = new SearchSuggestions();
    this.popularProducts.attach(this.view.popular);
    //Временно выводм компонент для теста
    this.searchSuggestions.attach(this.view.searchSuggestions);
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
