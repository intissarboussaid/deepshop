import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../Services/CommandeService/commande.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  order:any[]=[]
  constructor(private router:Router, private commandeService:CommandeService){}
  ngOnInit(){
     this.commandeService.GetCmdNotConfByAdminAndConfByUser(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {
        
        console.log('orders', res);
        this.order = res;
        
      }, error: (err) => {
        console.log('error cmds not not by admin', err)
      }
    })
  }
dashboard(){
this.router.navigate(['/dashboard?admin/', localStorage.getItem('id_admin')])
}
AddProduct(){
this.router.navigate(['/addProduct/', localStorage.getItem('token')])
}
AllProducts(){
this.router.navigate(['/allProducts/', localStorage.getItem('token')])
}
orders(){
  if(localStorage.getItem('id_admin')!=null){
this.router.navigate(['/order?product/', localStorage.getItem('id_admin')])
  }
}

customers(){
  if(localStorage.getItem('id_admin')!=null){
this.router.navigate(['/customers?product/', localStorage.getItem('id_admin')])
  }
}
 profil() {
    const token = localStorage.getItem('token');
    this.router.navigate([`/profil/${token}`]);
  }
setting(){
    this.router.navigate(['/setting/', localStorage.getItem('id_account')])
  }

}
