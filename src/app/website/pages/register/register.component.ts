import { Component, OnInit } from '@angular/core';

import { OnExit } from './../../../guards/exit.guard';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  onExit() {
    const rta = confirm('Logica desde comp, estas seguro salir?');
    return rta;
  }

}
