import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {ConversationService} from '../services/conversation.service';
import {AuthenticationService} from '../services/authentication.service';
import { FirebaseStorage } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;
  conversation: any[];
  shake: Boolean = false;
  croppedImage: any = '';
  img_env: any = '';
  envio_imagen: boolean;
  imageChangedEvent: any;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private firebaseStorage: AngularFireStorage,
               ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUsersById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUsersById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversation_id = ids.join('|');
          this.getConversation();
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  ngOnInit() {
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }
  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'Zumbido'
    };
    this.conversationService.createConversation(message).then(() => {});
    this.doZumbido();
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }
  sendImagen() {
    const message = {
        uid: this.conversation_id,
        timestamp: Date.now(),
        text: null,
        url: null,
        sender: this.user.uid,
        receiver: this.friend.uid,
        type: 'imagen'
    };
    this.conversationService.createConversation(message).then(() => {});
  }
  doImagen(message) {
    if (this.croppedImage) {
           const currentPictureId = Date.now();
           const picture = this.firebaseStorage.ref('imagenes/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
           picture.then((result) => {
           this.img_env = this.firebaseStorage.ref('imagenes/' + currentPictureId + '.jpg').getDownloadURL();
           this.img_env.subscribe((p) => {
           this.conversationService.setImagen(message, p).then(() => {
           }).catch((error) => {
           console.log(error);
           });
           });
     }).catch((error) => {
  console.log(error);
     });
  }
  }
  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data) => {
      console.log(data);
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if ( message.type === 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type === 'Zumbido') {
            this.doZumbido();
          } else if (message.type === 'imagen') {
            this.doImagen(message);
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
            this.envio_imagen = false;
            console.log(this.envio_imagen);
          }
        }
      });
    }, (error) => {
      console.log(error);
    });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
}
  getUserNickbyId(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
}
