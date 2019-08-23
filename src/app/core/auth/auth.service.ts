import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuthentication: AngularFireAuth
  ) { }

  get(): Observable<any> {
    return this.fireAuthentication.user;
  }

  guestSignin(): Observable<any> {
    return from(this.fireAuthentication.auth.signInAnonymously());
  }
}
