import { Component, OnInit, Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { StoreService } from '../../services/store.service'; 
import { AuthService } from '../../services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  createUser() {
    this.usersService.create({
      name: 'sebas',
      email: 'sebas@mail.com',
      password: '1212'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  loginAndGet() {
    this.authService.loginAndGet()
    .subscribe(user =>{ 
      this.profile = user;
    });
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      console.log(profile);
      this.profile = profile;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }
}