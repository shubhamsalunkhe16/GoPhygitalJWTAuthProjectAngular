import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';



@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  
  constructor(public login: LoginService) { }
  
  
  

  ngOnInit(): void {
  }

  

}
