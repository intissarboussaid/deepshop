import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
   currentIndex = 0;
   email="";
   errorEmail="";
  constructor(private auth:AuthentificationService, private router: Router){}
    prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? 1 : 0;
  }
  nextSlide() {
    this.currentIndex = this.currentIndex === 1 ? 0 : 1;
  }
  activeAccount(){
    this.auth.activateAccount(localStorage.getItem('id_account')).subscribe({
      next: (res) => {
         console.log('account',res)
         this.router.navigate(['/login']);

      }
     
    })
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
