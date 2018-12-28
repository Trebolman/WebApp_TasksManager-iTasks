import { Component } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  // atributo
  public isLog:string;
  public message:string;
  constructor(private auth:AuthService, private router: Router) {}

  login(){
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe((response) => {
      console.log("[login]:");
      console.log(response);
      this.isLog = 'si';
      this.router.navigateByUrl('/tasks');
    }, (err) => {
      if(err.message){
        this.message = "Usuario no registrado, registrese primero por favor";
      }
      this.isLog = 'no';
      console.error("[login] Error]");
      console.error(err);
    }); 
  }
}
