import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

import { User } from './models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the-store';
  imgParent = 'https://pictures.betaseries.com/fonds/poster/d58a6bd95b4ec22786ce995660501651.jpg';
  showImg = true;
  token = '';
  profile!: User;
  emailProfile = 'example@mail.com';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService 
  ) {}
  
  OnLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
    console.log(this.showImg);
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

  login() {
    this.authService.login('sebas@mail.com', '1212')
    .subscribe(rta => {
      this.token = rta.access_token;
    });
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      console.log(profile);
      this.profile = profile;
      this.emailProfile = profile.email;
    });
  }
  
  downloadPdf(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }

}