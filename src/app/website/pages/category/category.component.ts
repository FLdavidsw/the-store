import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';// this module is used for reading url's parameters
import { switchMap } from 'rxjs';

import { ProductsService } from '../../../services/products.service'; 
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  productId: string | null = null;
  products: Product[] = [];
  categoryId: string | null = null;
  initialCategoryId: string | null = null;
  limit = 10;
  offset = 0;
  limitCopy = 10;
  offsetCopy = 0;
  loadId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

    ngOnInit(): void {
      //this.onGetCategory(this.limit, this.offset);
      this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if(this.categoryId){
           return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [];
        })
      )
      .subscribe(data => {
            this.products = data;
            this.initialCategoryId = this.categoryId;
      });
      this.route.queryParamMap.subscribe(params => {
        this.productId = params.get('product');
        console.log(this.productId);
      });
    }
    

    onLoadMore(){
      if(this.loadId === this.categoryId || this.loadId === null){
        this.offsetCopy += this.limitCopy;
        if(this.categoryId){
          this.productsService.getByCategory(this.categoryId, this.limitCopy, this.offsetCopy)
          .subscribe(data => {
            this.products = this.products.concat(data);
          });
        }  
      }else if(this.loadId !== this.categoryId){
        this.offsetCopy = this.limitCopy;
        if(this.categoryId){
          this.productsService.getByCategory(this.categoryId, this.limitCopy, this.offsetCopy)
          .subscribe(data => {
            this.products = this.products.concat(data);
          });
        }  
      }

        this.loadId = this.categoryId;
    }

    onGetCategory(limit?:number, offset?:number) {
      if(this.initialCategoryId === this.categoryId)
      this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if(this.categoryId){
           return this.productsService.getByCategory(this.categoryId, limit, offset)
          }
          return [];
        })
      )
      .subscribe(data => {
          if(this.initialCategoryId === this.categoryId){
            this.products = this.products.concat(data);
          }else if(this.initialCategoryId !== this.categoryId){
            this.products = [];
            this.products = data;
            this.limitCopy = this.limit;
            this.offsetCopy = this.offset;
          }
          this.initialCategoryId = this.categoryId;
      });
    }
  }
