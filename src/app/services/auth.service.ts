import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlApi = `${environment.API_URL}/api/auth`;
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

    login(email: string, password: string) {
      return this.http.post<Auth>(`${this.urlApi}/login`, {email, password})
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
    }
    loginAndGet() {
      return this.login('sebas@mail.com', '1212')
      .pipe(
        switchMap((rta) => this.getProfile()),
      )
    }

    getProfile(){
      /*
      Using the library HttpHeaders is possible to send the headers dinamically, 
      first of all, you have to instance a new HttpHeader to put the elements you
      need to send through this one. Then, you just have to send the variable already
      created. For instance:
      EXAMPLE:
      const headers = new HttpHeaders();
      headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<User>(`${this.urlApi}/profile`,{
        headers
      });
      */
     // Simple way:
      return this.http.get<User>(`${this.urlApi}/profile`,{
        //headers: {
          //Authorization: `Bearer ${token}`,//Bearer is the authorization type used in this case
          //'Content-type': 'application/json' 
        //} 
    });
    }

}
