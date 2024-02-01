import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs'; 

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlApi = `${environment.API_URL}/api/v1/`;

  //private urlApi = 'https://young-sands-07814.herokuapp.com/api/';
  //Other possible urlApi = https://damp-spire-59848.herokuapp.com/docs

  /*
  CORS (CROSS ORIGIN RESOURCE SHARING):
  It's a mechanism of security for the request and exchange of resources between apps with different domains. 
  This could bring us mistakes if we are working with a backend that blocks the requests generated from other 
  URLs that aren't the origin domain.
  Here (talking about variable urlApi) we have changed the way a request is being sent, as we are avoiding mistakes 
  related to CORS. The stuff we are doing is changing the proxy from our server, 
  to be able to do requests if the API doesn't allow us to do requests from another 
  server that doesn't be the origin. To see the way this is being applied, review the files: 
  - "proxy.config.json"
  - "package.json"
  Besides, we have to launch the file "proxy.config.json" from cmd or PowerShell with the next command:
  npm run start:proxy
  */
  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: string, limit?:number, offset?:number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.urlApi}/categories/${categoryId}/products`,{ params })
    .pipe( 
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.urlApi}products/`,{params, context: checkTime()})
    .pipe(
      retry(2),
      //Map library is used for transforming each item received from the source observable
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
    //the retry pipe allow us to repeat a request if this is not executed satisfactorily
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
   return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.urlApi}products/${id}`)
    .pipe(
     /* map(product => {
       product['images'] = ['https://loremflickr.com/320/240?random=1','https://loremflickr.com/320/240?random=2']
       return product;
      }),*/
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError(() => new Error ('Algo esta fallando en el server'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error ('El producto no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error ('No estas autorizado'));
        }
        return throwError(() => new Error ('Algo esta fallando en el server'));
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
   /* 
   return this.http.get<Product[]>(this.urlApi+'products/?limit='+limit+'&offset='+offset);
    */
    return this.http.get<Product[]>(`${this.urlApi}products/`,{
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.urlApi+'products', dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.urlApi}products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.urlApi}products/${id}`);
  }
}
