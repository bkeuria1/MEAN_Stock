import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {  User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignInServiceService {

  constructor(private http: HttpClient) { }

 

  signIn(){
    return this.http.get(environment.SIGN_IN_URL, {withCredentials:true})
  }
  checkSignIn():Observable<User>{
    return this.http.get<User>(environment.USER_URL,{withCredentials:true})
  }

}
