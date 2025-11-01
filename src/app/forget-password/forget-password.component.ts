import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  currentIndex = 0;
  email = '';
  code = '';
  error = '';
  passwordError = '';
  psw = '';
  confirmationpsw = '';
  errorEmail="";
  constructor(private auth: AuthentificationService, private router: Router) { }
  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
  nextSlide() {
    this.currentIndex = this.currentIndex === 1 ? 0 : 1;
  }
  next3rdSlide() {
    this.currentIndex = this.currentIndex === 2 ? 0 : 2;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const credentials = {
        code: this.code
      };

      this.auth.verificationCode(localStorage.getItem('email'), credentials).subscribe({
        next: (res) => {
          console.log('request response:', res);

          // setTimeout(() => {
          //   this.loginMessage = null;
          // }, 10000);
          this.currentIndex = this.currentIndex === 2 ? 0 : 2;

        },
        error: (err) => {
          this.error = "Invalid verification code"
          console.log('request failed:', err);

          setTimeout(() => {
            this.error = '';
          }, 8000);
        }
      });
    } else {
      console.log(" form invalid!");
      this.error = "The code should contain 6 characters."
    }
  }


  resetPassword(form: NgForm) {
    if (form.valid) {
      const credentials = {
        psw: this.psw,
        confirmationpsw: this.confirmationpsw
      };

      this.auth.restPassword(localStorage.getItem('email'), credentials.psw,credentials.confirmationpsw).subscribe({
        next: (res) => {
          console.log('rest password: ', res);
          localStorage.setItem('email',res.email);
          localStorage.setItem('id_account',res.id_account);
          localStorage.setItem('token',res.token);
          this.router.navigate(['/login']);
          this.currentIndex = this.currentIndex === 2 ? 0 : 1;
          
        },
        error: (err) => {
          console.log('reset password failed:', err);
          this.passwordError = "Those passwords didn't match. try again."
          setTimeout(() => {
            this.passwordError = '';
          }, 8000);

        }
      });
    } else {
      console.log(" form invalid!");
      console.log(" password", this.psw);
      console.log(" confirmation password", this.confirmationpsw);
      this.passwordError = "Both password fields must match!."
    }
  }
  GeTAccountByEmail(){
    this.auth.getEmail(this.email).subscribe({
      next:(res)=>{
        console.log("account", res);
        this.currentIndex = this.currentIndex === 1 ? 0 : 1;
      },error:(err)=>{
        console.log("error Email", err);
        this.errorEmail="No account found with this email address."
      }
    })

  }
}
