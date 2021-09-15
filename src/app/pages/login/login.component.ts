import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private login: LoginService) {}

  public userLogin = {
    username: '',
    password: '',
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
      Swal.fire('', 'Invalid email address', 'warning');
      return;
    }

    this.login.generateToken(this.userLogin).subscribe(
      (data: any) => {
        console.log(data);
        this.login.setToken(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            let role = this.login.getRole();
            if (role == 'ADMIN') {
              window.location.href = '/admin';
            } else if (role == 'USER') {
              window.location.href = '/user';
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
        Swal.fire('', 'Invalid User...Try again!!!', 'error');
      }
    );
  }
}
