import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';

export class SearchSuggestions {
  view: View;

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }
}