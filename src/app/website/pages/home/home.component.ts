import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service'; 

import { Product } from '../../../models/product.model';


/*
If your HTML is concise, you can write this HTML lines in "template" 
as shown below instead of having a entire HTML file
*/
@Component({
  selector: 'app-home',
  template: `<app-products [productId]="productId" 
                              [products]="products" 
                              (loadMore)="onLoadMore()"></app-products>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;
  

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.getElements(this.limit, this.offset);

    //queryParams are OPTIONAL params which come from the URL
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
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
