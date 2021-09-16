import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

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
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
        this.usersList = this.users.list;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  enableUser(user: any) {
    if (!user.enabled) {
      Swal.fire({
        title: 'Do you want to enable user?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.enableUser(user).subscribe(
            (data) => {
              Swal.fire('Enabled!', 'User is enabled', 'success');
              console.log(data);
              this.getAllUsers();
            },
            (error) => {
              console.log(error);
              Swal.fire('Error!', 'Something went wrong', 'error');
            }
          );
        } else if (result.isDenied) {
          Swal.fire('User is not enabled', '', 'info');
        }
      });
    } else {
      Swal.fire('User is already Enabled', '', 'info');
    }
  }

  disableUser(user: any) {
    if (user.enabled) {
    
      Swal.fire({
        title: 'Do you want to disable user?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.disableUser(user).subscribe(
            (data) => {
              Swal.fire('Disabled!', 'User is disabled', 'success');
              console.log(data);
              this.getAllUsers();
            },
            (error) => {
              console.log(error);
              Swal.fire('Error!', 'Something went wrong', 'error');
            }
          );
        } else if (result.isDenied) {
          Swal.fire('User is not disabled', '', 'info');
        }
      });
    } else {
      Swal.fire('User is already Disabled', '', 'info');
    }
  }
}
