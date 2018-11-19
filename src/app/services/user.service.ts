import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
friends: User[];
  constructor() {
    let user1: User = {
      nick: 'Carlos',
      subnick: 'Garcia',
      age: 21,
      email: 'carlos@hotmail.com',
      friend: true,
      uid: 1,
      status: 'online'
    };
    let user2: User = {
      nick: 'Alejandro',
      subnick: 'Garcia',
      age: 19,
      email: 'ale@hotmail.com',
      friend: true,
      uid: 2,
      status: 'online'
    };
    let user3: User = {
      nick: 'Paolo',
      subnick: 'Garcia',
      age: 18,
      email: 'paolo@hotmail.com',
      friend: false,
      uid: 3,
      status: 'offline'
    };
    let user4: User = {
      nick: 'Alberto',
      subnick: 'Garcia',
      age: 65,
      email: 'alberto@hotmail.com',
      friend: true,
      uid: 4,
      status: 'busy'
    };
    let user5: User = {
      nick: 'Liliana',
      subnick: 'Rosales',
      age: 43,
      email: 'liliana@hotmail.com',
      friend: false,
      uid: 5,
      status: 'away'
    };
    this.friends = [user1, user2, user3, user4, user5];
   }
   getFriends() {
     return this.friends;
   }
}
