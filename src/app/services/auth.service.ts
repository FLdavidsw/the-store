import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlApi = `${environment.API_URL}/api/v1/auth`;
  private user = new BehaviorSubject<User | null>(null);//initial state is between parenthesis 

  user$ = this.user.asObservable();
  
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
    loginAndGet(email: string, password: string) {
      return this.login(email, password)
      .pipe(
        switchMap((rta) => this.getProfile()),
        tap(response => this.saveRole(response.role))
      )
    }
    logout(){
      this.tokenService.removeToken();
    }

    saveRole(role: string){
      localStorage.setItem('roleUser', role)
    }

    getRole(){
      const roleUser = localStorage.getItem('roleUser');
      return roleUser;
    }
    getProfile(){
      return this.http.get<User>(`${this.urlApi}/profile`)
      .pipe(
        tap(user => this.user.next(user))//tap makes an action once we have gotten the data.
      );
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
      
      //Simple way:
      return this.http.get<User>(`${this.urlApi}/profile`,{
        //headers: {
          //Authorization: `Bearer ${token}`,//Bearer is the authorization type used in this case
          //'Content-type': 'application/json' 
        //} 
    }); */
    }

}
