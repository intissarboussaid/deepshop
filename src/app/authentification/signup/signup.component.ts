import { NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgStyle, NgIf, FormsModule, HttpClientModule, NgFor],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  selectedRole = '';
  roles: string[] = ['Admin', 'User'];
  isDropdownOpen = false;
  isRotated = false;
  role = '';

  toggleRotation() {
    this.isRotated = !this.isRotated;
    console.log('isRoteted', this.isRotated);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('isDropdownOpen (true)', this.isDropdownOpen);
  }

  loginMessage: string | null = null;
  email = '';
  psw = '';
  errorMessage = '';
  confirmationpsw = '';
  isLoading = false;
  loginError: string | null = null;
  roleError: string | null = null;
  loginForm!: FormGroup;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isButton = target.closest('.title_dropdown');
    const isInsideDropdown = target.closest('.dropdown');

    if (!isButton && !isInsideDropdown) {
      this.isDropdownOpen = false;
      this.isRotated = true;
      console.log('isRoteted', this.isRotated);
      console.log('isDropdownOpen (false)', this.isDropdownOpen);
      console.log("role: ", this.selectedRole)
      if (this.selectedRole === '') {
        console.log("role is required")
        this.roleError = "role is required";
        console.log("role: ", this.selectedRole)
      } else {
        this.roleError = '';
        console.log("this.roleError: ", this.roleError)
      }
    }
  }
  constructor(private router: Router, private authentification: AuthentificationService) {

  }
  toSignIn() {
    console.log("categoris page called");
    this.router.navigate(['login']);
  }
  selectRole(role: string) {

    this.selectedRole = role;


    if (role === 'Admin') {
      role = "ADMIN";
    } else if (role === 'Product manager') {
      role = "PRODUCTMANAGER";
    } else {
      role = "USER";
    }
    this.selectedRole = role;
    console.log('role', role);
    this.isDropdownOpen = false;
    this.isRotated = false;


  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      const credentials = {
        email: this.email,
        psw: this.psw,
        confirmationpsw: this.confirmationpsw,
        role: this.selectedRole
      };

      this.authentification.register(credentials).subscribe({
        next: (res) => {
          console.log('Login response:', res);
          if (res.FORBIDDEN === null) {
            this.loginError = "Those passwords didn't match. try again.";
          }
          localStorage.setItem('id_account', res.body.account.id_account);
          console.log('token:', res.body.token);
          localStorage.setItem('token', res.body.token);
          this.loginMessage = "You're almost there! Please check your email to activate your account.";
          if (res.body.account.admin!=null) {
            // console.log('id_admin', res.body.account.admin.id_admin);
            localStorage.setItem('id_admin', res.body.account.admin.id_admin);
          } else if (res.body.account.product_manager!=null) {
            localStorage.setItem('id_pm', res.body.account.product_manager.id_pm);
          } else {
            localStorage.setItem('id_user', res.body.account.user.id_user);
          }
          setTimeout(() => {
            this.loginMessage = null;
          }, 10000);

        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loginError = "Email is already registred.";
          setTimeout(() => {
            this.loginError = null;
          }, 8000);
        }
      });
    } else {
      console.log(" form invalid!");
    }
  }
}


