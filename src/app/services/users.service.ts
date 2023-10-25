import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO} from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = `${environment.API_URL}/api/users`;
  
  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.urlApi, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.urlApi);
  }
}
