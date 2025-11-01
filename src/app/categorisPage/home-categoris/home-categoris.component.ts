import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategorisComponent } from "../categoris/categoris.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-home-categoris',
  imports: [HeaderComponent, CategorisComponent, NavbarComponent, FooterComponent],
  templateUrl: './home-categoris.component.html',
  styleUrl: './home-categoris.component.css'
})
export class HomeCategorisComponent {
  admin = '';
  user = '';
  pm = '';
  isAdmin=false;
  constructor() {

  }
  ngOnInit(){
    const admin = localStorage.getItem('id_admin');
    const user = localStorage.getItem('id_user');
    const PM = localStorage.getItem('id_pm');
    if (admin!=null) {
      this.admin = 'this is admin account';
      this.isAdmin=true;
      console.log("isAdmin",this.isAdmin);
    } else if (user) {
      this.user = 'this is user account';
    } else if (PM) {
      this.pm = 'this is Product manager account';
    }
  console.log("isAdmin",this.isAdmin);

  }

}
