import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login_email(this.email, this.password).then((data) => {
      alert('Se logueo correctamente');
      console.log(data);
    }).catch((error) => {
      alert('no se logueo correctamente');
      console.log(error);
    });
  }
  register() {
    this.authenticationService.register_email(this.email, this.password).then((data) => {
      alert('Se registro correctamente');
      console.log(data);
    }).catch((error) => {
      alert('no se registro correctamente');
      console.log(error);
    });
  }

}
