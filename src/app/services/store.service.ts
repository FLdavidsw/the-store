import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

/* we should delegate business logic to the service files.
This allows us to use this services in modular manner. Also, it's
possible to inject services into services, but we can't generate
an circular reference, that means two services inject between them, 
without knowing what service should be instanced first */
export class StoreService {

  private myShoppingCart: Product[] = []; 
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable(); //transforming myCart into a observable
                                        // It's a good practice adding '$' at the
                                        // final of name variable when we're dealing
                                        // with observables
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product); 
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    //this.total += product.price; MY MANNER
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0); //Manner showed by the course
    // The second manner to obtain the total allows us 
    //to get rid of one of their elements, as take 
    //the array and not every value that receives.
         
    //- reduce: is a method among arrays' methods 
    //  that allow us to get a unique value of an array
  }
}
