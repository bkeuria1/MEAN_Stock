import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignInServiceService } from '../services/sign-in-service.service';

import { User } from '../interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user?:User;

  constructor(private sign_in: SignInServiceService) { }

  ngOnInit(): void {
    this.checkSignIn()
  }

  signIn(): void{
    window.open(environment.SIGN_IN_URL,"_self")
    this.checkSignIn()
  }

  checkSignIn(){
    let results = this.sign_in.checkSignIn().subscribe(response => {
      this.user = response
    })
      
  
    
  }

}
