import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})

  
export class AdminhomeComponent implements OnInit {
  constructor(public userService: UserService) { }
 
  
  users: any;
  usersList = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
        this.usersList = this.users.list;
      },(error) => {
        console.log(error);
      },
    );
  }
}
