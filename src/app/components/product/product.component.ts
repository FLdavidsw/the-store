import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('product') product!: Product;//this way to initialize our
  //inputs allow us to don't have struggles with the fact that it's empty.
  //we're saying to angular that doesn't care about empty variable, as
  //we will fill it.
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor () { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
