import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  //to use userService here ->
  constructor(private userService: UserService) {}

  public user = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    language: '',
    mobileNo: '',
  };

  

  ngOnInit(): void {}

  formSubmit() {
    
    let registerUser = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      language: this.user.language,
      mobileNo: this.user.mobileNo,
    };
    //Validations
    if (
      this.user.name == '' ||
      this.user.name == null ||
      this.user.username == '' ||
      this.user.username == null ||
      this.user.password == '' ||
      this.user.password == null ||
      this.user.confirmPassword == '' ||
      this.user.confirmPassword == null
    ) {
      Swal.fire('', 'fields are empty...Please try again', 'warning');
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.username)
    ) {
      Swal.fire('', 'Invalid email address...Please try again', 'warning');
      return;
    }
    if (!/^[A-Za-z0-9]\w{7,14}$/.test(this.user.password)) {
      Swal.fire(
        '',
        'Try Strong password...minimum 8 characters alphanumeric',
        'warning'
      );
      return;
    }
    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire('', 'Passwords are not matching...Please try again', 'warning');
      return;
    }

    if (this.user.language == '' || this.user.language == null) {
      Swal.fire('', 'Select valid language', 'warning');
      return;
    }

    //register user from userservice
    this.userService.registerUser(registerUser).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('', `Verification mail is sent to email address : ${this.user.username}`, 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('', 'Something went wrong', 'error');
      }
    );
  }
}
