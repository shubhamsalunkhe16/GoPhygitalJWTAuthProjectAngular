import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private login: LoginService, private router: Router) {}

  public userLogin = {
    username: '',
    password: '',
    enabled: '',
    emailVerified: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.userLogin);
    if (
      this.userLogin.username == '' ||
      this.userLogin.username == null ||
      this.userLogin.password == '' ||
      this.userLogin.password == null
    ) {
      Swal.fire('', 'fields are empty', 'warning');
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.userLogin.username
      )
    ) {
      Swal.fire(
        'Invalid email address',
        'Please insert correct email address',
        'warning'
      );
      return;
    }

    this.login.generateToken(this.userLogin).subscribe(
      (data: any) => {
        console.log(data);
        if (data == null) {
          Swal.fire('Invalid User', 'Please try again!!!', 'error');
          return;
        }
        this.login.setToken(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            console.log(user.emailVerified);
            if (!user.emailVerified) {
              Swal.fire(
                'User is not verified',
                'Please confirm your email address!!!',
                'error'
              );
              return;
            }

            let role = this.login.getRole();
            if (role == 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role == 'USER') {
              this.router.navigate(['/user']);
            } else {
              console.log('Error to get role!!!');
              this.login.logout();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        //Swal.fire('Something went wrong', error.message, 'error');
        Swal.fire('Invalid User', 'Please try again!!!', 'error');
      }
    );
  }
}
