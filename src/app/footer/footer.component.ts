import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
constructor(private router:Router){ }
category() {
this.router.navigate(['/categoris']);
}
home() {
this.router.navigate(['/home_p']);
}
signIn() {
  if(localStorage.getItem("id_admin")!=null){
this.router.navigate(['/dashboard?admin/', localStorage.getItem('id_admin')])
  }else{
this.router.navigate(['/home_p']);
  }
}
sell() {
  if(localStorage.getItem("id_admin")!=null){
this.router.navigate(['/addProduct/', localStorage.getItem('token')])
  }else{
this.router.navigate(['/home_p']);
  }
}
contact() {
this.router.navigate(['/contact']);
}
}
