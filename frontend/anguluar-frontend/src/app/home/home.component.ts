import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

import { User } from '../interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user?:User;
  email:String = ''
  password: String = ''
  confirmPassword:String = ''


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkSignIn()
  }

  signInWithGoogle(): void{
    window.open(environment.SIGN_IN_URL,"_self")
    this.checkSignIn()
  }

  checkSignIn(){
    let results = this.authService.checkSignIn().subscribe(response => {
      this.user = response
    }) 
  }

  signInLocal(){
    console.log("sing in local called")
    this.authService.signInLocal(this.email, this.password).subscribe(()=>{
      this.checkSignIn()
    })
  
  }

  register(){
    this.authService.register(this.email, this.password, this.confirmPassword).subscribe(()=>{
      this.checkSignIn()
    })
  }


}
