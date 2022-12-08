import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {  User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(){
    return this.http.get(environment.SIGN_IN_URL, {withCredentials:true})
  }

  checkSignIn():Observable<User>{
    return this.http.get<User>(environment.USER_URL,{withCredentials:true})
  }

  register(email:String, password:String, confirmPassword:String):Observable<any>{
    return this.http.post<any>(environment.REGISTER_URL, {email,password,confirmPassword}, {withCredentials:true})
  }

  signInLocal(email:String, password:String){
    return this.http.post<any>(environment.SIGN_IN_LOCAL_URL, {email,password}, {withCredentials:true})
  }

}
