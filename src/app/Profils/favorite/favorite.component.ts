import { Component } from '@angular/core';
import { FavoriteService } from '../../Services/FavoriteService/favorite.service';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { PhotoService } from '../../Services/photo.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './favorite.component.html',
  styleUrl: '../../categorisPage/categoris/categoris.component.css'
})
export class FavoriteComponent {
  isFav = false;
  listFav: any[] = [];
  adminImages: (string | null)[] = [];
  currentIndexes: { [productId: number]: number } = {};
  nomAdmin: any;
  prenom: any;
  constructor(private favoriteService: FavoriteService, private photoService: PhotoService, private router: Router,private location:Location) { }
  ngOnInit() {
    if(localStorage.getItem('id_user')!=null){
      this.favoriteService.getFavByUser(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        if (res.length != 0) {
          this.isFav = true;
          this.listFav = res;
          this.listFav.forEach((fav: any,index: number) => {
            console.log('admin', fav.product.admin.photo);
            this.nomAdmin = fav.product.admin.nom;
            this.prenom = fav.product.admin.prenom;
            const AdminPhoto = fav?.product?.admin?.photo;
            if (AdminPhoto) {
              this.photoService.getPhoto(AdminPhoto.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  AdminPhoto.filePath = objectURL;
                }
              );
            } else {
              this.adminImages[index] = null;
            }
            fav.product.photos.forEach((photo: any) => {
              this.photoService.getPhoto(photo.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  photo.filePath = objectURL;
                }
              )
            })
          })
        }
        console.log('all favorites by user', res);
      }, error: (err) => {
        console.log(' error all favorites by user', err);
      }
    })
    }
    if(localStorage.getItem('id_admin')!=null){
      this.favoriteService.getFavByAdmin(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {
        if (res.length != 0) {
          this.isFav = true;
          this.listFav = res;
          this.listFav.forEach((fav: any,index: number) => {
            console.log('admin', fav.product.admin.photo);
            this.nomAdmin = fav.product.admin.nom;
            this.prenom = fav.product.admin.prenom;
            const AdminPhoto = fav?.product?.admin?.photo;
            if (AdminPhoto) {
              this.photoService.getPhoto(AdminPhoto.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  AdminPhoto.filePath = objectURL;
                }
              );
            } else {
              this.adminImages[index] = null;
            }
            fav.product.photos.forEach((photo: any) => {
              this.photoService.getPhoto(photo.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  photo.filePath = objectURL;
                }
              )
            })
          })
        }
        console.log('all favorites by admin', res);
      }, error: (err) => {
        console.log(' error all favorites by admin', err);
      }
    })
    }
    
  }
  getCurrentIndex(productId: number): number {
    return this.currentIndexes[productId] ?? 0;
  }
  nextSlide(productId: number, max: number): void {
    console.log("max", max)
    const current = this.getCurrentIndex(productId);
    console.log("current", current)
    if (current < max) {
      this.currentIndexes[productId] = current + 1;
      console.log("current2", this.currentIndexes[productId])
    }
  }

  prevSlide(productId: number): void {
    const current = this.getCurrentIndex(productId);
    if (current > 0) {
      this.currentIndexes[productId] = current - 1;
    }
  }

  onSaveProduct(id: any) {
    localStorage.setItem('id_product', id);
    if (localStorage.getItem('id_product')) {
      this.router.navigate(['/details?product/', localStorage.getItem('id_product')])
    }
  }
  goBack() {
    this.location.back();
  }

}

//   <main>

// <h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
// 	        <p>Total: {{ amount | currency }}</p>
//     </main>