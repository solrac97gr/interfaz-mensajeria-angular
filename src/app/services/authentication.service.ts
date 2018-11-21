import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }
  login_email(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  register_email(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
    return this.angularFireAuth.authState;
  }
  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
