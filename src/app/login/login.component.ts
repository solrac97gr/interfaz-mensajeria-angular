import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login_email(this.email, this.password).then((data) => {
      alert('Se logueo correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('no se logueo correctamente');
      console.log(error);
    });
  }
  register() {
    this.authenticationService.register_email(this.email, this.password).then((data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
    };
    this.userService.createUser(user).then((data2) => {
      alert('Registrado en la base de datos');
      console.log(data2);
    }).catch((error2) => {
      alert('error al registrar');
      console.log(error2);
    });

      alert('Se registro correctamente');
      console.log(data);
    }).catch((error) => {
      alert('no se registro correctamente');
      console.log(error);
    });
  }

}
