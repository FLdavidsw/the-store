import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import Swal from 'sweetalert2';//Swal library for creating better error messages

import { zip } from 'rxjs';
import { switchMap} from'rxjs/operators';


import { CreateProductDTO, Product, UpdateProductDTO } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: Product[] = []; 
  total = 0;
  @Input() products: Product[] = [];
  @Input() 
  set productId(id: string | null ){
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();
  statusLoad = true;
  showProductDetail = false;
  productChosen!: Product;
  statusDetail: 'loading' | 'success'  | 'error' | 'init' = 'init';
//today = new Date();
//date = new Date(2021, 1, 21)

   constructor(
    private storeService: StoreService,
    private productsService: ProductsService
   ) { 
      this.myShoppingCart = this.storeService.getShoppingCart();
   }

   OnAddToShoppingCart(product: Product){
      this.storeService.addProduct(product);
      this.total = this.storeService.getTotal();
    }

    toggleProductDetail() {
      this.showProductDetail = !this.showProductDetail;
    }

    onShowDetail(id: string) {
      this.statusDetail = 'loading';
      if(!this.showProductDetail) {
        this.showProductDetail = true;
      }
      this.productsService.getProduct(id)
      .subscribe(data => {
        console.log(data);
        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        this.statusDetail = 'error';
        Swal.fire({text: errorMsg});//Swal library for creating better error messages
      });
    }
 
    readAndUpdate(id: string) {
      this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, {title:'change'})),
        //switchMap((product) => this.productsService.update(product.id, {title:'change'}))
        )
      .subscribe(data => {
        console.log(data);
      });
      this.productsService.fetchReadAndUpdate(id, {title:'change'})
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      });
    }

    createNewProduct() {
      const product: CreateProductDTO = {
        title: 'Nuevo producto',
        price: 1000,
        description: 'Description',
        categoryId: 1,
        images: ['https://cdn.shopify.com/s/files/1/0604/8373/1606/products/IMG-111573_823x.jpg?v=1658314353'],
      }
      this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      });
    }
    
    updateProduct(){
      const changes: UpdateProductDTO = {
        title: 'Pearl Necklace'
      }
      const id = this.productChosen.id;
      this.productsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }

    deleteProduct() {
      const id = this.productChosen.id;
      this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }

    onLoadMore() {
      this.loadMore.emit();
    }
    
}
