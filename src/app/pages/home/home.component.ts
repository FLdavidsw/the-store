import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';

import { Product } from 'src/app/models/product.model';


/*
If your HTML is concise, you can write this HTML lines in "template" 
as shown below instead of having a entire HTML file
*/
@Component({
  selector: 'app-home',
  template: `<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  

  constructor(
    private productsService: ProductsService
    ){}

  ngOnInit(): void {
    this.getElements(this.limit, this.offset);
   }

   getElements(limit: number, offset: number) {
    this.productsService.getAllProducts(limit, offset)
    .subscribe(data => { 
      if(data.length !== 0){
        this.products = this.products.concat(data);
        this.offset += this.limit;
      }else{
        alert('there are not more products');
      }
    });
   }
    onLoadMore(){
      this.getElements(this.limit, this.offset);
      console.log("load");
  }
}
