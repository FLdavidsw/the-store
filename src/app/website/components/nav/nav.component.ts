import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { StoreService } from '../../../services/store.service'; 
import { AuthService } from '../../../services/auth.service';
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
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    });
  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  createUser() {
    this.usersService.create({
      email: 'sebas@mail.com',
      name: 'sebas',
      password: '1212',
      role: 'customer',
      avatar: 'https://imgur.com/yhW6Yw1'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  loginAndGet() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(user =>{ 
      this.router.navigate(['/profile']);
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      this.profile = profile;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }
}