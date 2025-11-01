import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HistoriqueComponent } from '../Profils/historique/historique.component';
import { AdminService } from '../Services/adminService/admin.service';
import { UserService } from '../Services/useServicer/user.service';
import { ProductManagerService } from '../Services/productMangerService/product-manager.service';
import { CommandeService } from '../Services/CommandeService/commande.service';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownOpen = false;
  isDropdownProfilOpen = false;
 isModalOpen = false;
  isUser=false;
  isAdmin=false;
  commandes:any;
  categoryList: String[] = ["All Categories","Phone & Electronique", "Clothes & Fashion", "Gaming & Digitals", "Sprots & Entertainement", "SelfCare & Product", "Kitchen & Home essentials", "Baby & Toy", "Books & Education", "Car & Accessoires", "Animals", "Magasin"];
isOpenCateogy=false;
  
  openModal() {
    this.isModalOpen = true;
  }
openCateogiry(){
  this.isOpenCateogy=!this.isOpenCateogy;
}
  closeModal() {
    this.isModalOpen = false;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleDropdownProfil() {
    this.isDropdownProfilOpen = !this.isDropdownProfilOpen;
  }
  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isButton = target.closest('.bar');
    const isInsideDropdown = target.closest('.dropdown-content');
    const isButtonProfil = target.closest('.profil');
    const isInsideDropdownProfil = target.closest('.dropdown_content');

    if (!isButton && !isInsideDropdown) {
      this.isDropdownOpen = false;
    }
    if (!isButtonProfil && !isInsideDropdownProfil) {
      this.isDropdownProfilOpen = false;
    }
  }
  img: any;
  src: any;
  exist = false;
  isRotated = false;

  toggleRotation() {
    this.isRotated = !this.isRotated;
    console.log('isRoteted', this.isRotated);
  }
  constructor(private auth: AuthentificationService, private router: Router, private dialog: MatDialog,private adminService:AdminService,private userService:UserService,private ProductManagerService: ProductManagerService,private commandeService:CommandeService) { }
  ngOnInit(): void {
    const id_account = localStorage.getItem('id_account');
    if (id_account != null) {
      this.exist = !this.exist;
      this.auth.getById(id_account).subscribe({
        next: (res) => {
          const account = res;
          if (account.admin) {
            this.isAdmin=true;
            this.img = account.admin.photo;

            if (this.img != null) {
              this.adminService.getPhotoAdmin(localStorage.getItem('id_admin')).subscribe(
                blob=>{
                  const objectURL = URL.createObjectURL(blob);
                  this.src = objectURL;
                }
              )
            } else {
              this.src = '../../assets/img/photo_profil.jpg';
            }
          } else if (account.user) {
            this.isUser=true;
            this.img = account.user.photo;
            if (this.img != null) {
              this.userService.getPhotoUser(localStorage.getItem('id_user')).subscribe(
                blob=>{
                  const objectURL=URL.createObjectURL(blob);
                  this.src=objectURL;
                }
              )
            } else {
              this.src = '../../assets/img/photo_profil.jpg';
            }

          } else {
            this.img = account.product_manager.photo;
            if (this.img != null) {
              this.ProductManagerService.getPhotoPm(localStorage.getItem('id_pm')).subscribe(
                blob=>{
                  const objectURL=URL.createObjectURL(blob);
                  this.src=objectURL;
                }
              )
            } else {
              this.src = '../../assets/img/photo_profil.jpg';
            }
          }

        },
      })
    }
    
    const admin = localStorage.getItem('id_admin');
    const user = localStorage.getItem('id_user');
    const PM = localStorage.getItem('id_pm');
    if(user!=null){
    this.commandeService.GetCommandesNotConfByUser(user).subscribe({
      next:(res)=>{
        this.commandes=res;
      }, error:(err)=>{
        console.log('error not conf commandes by user', err)
      }
    })
    }
  

  }
  profil() {
    const token = localStorage.getItem('token');
    this.router.navigate([`/profil/${token}`]);
  }
  // openLogoutDialog() {
  //   const dialogRef = this.dialog.open(HistoriqueComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.logout();
  //     }
  //   });
  // }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
    console.log("Logged out");
  }
  gotToCommandes(){
    this.router.navigate(['/commande/', localStorage.getItem('token')])
  }
  setting(){
    this.router.navigate(['/setting/', localStorage.getItem('id_account')])
  }

}
