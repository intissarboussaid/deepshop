import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../../Services/FavoriteService/favorite.service';
import { PhotoService } from '../../Services/photo.service';
import { ProductService } from '../../Services/Product/product.service';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-magasin',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './magasin.component.html',
  styleUrl: '../clothes-fashion/clothes-fashion.component.css'
})
export class MagasinComponent {


isAll = true;
  listAll: any[] = [];
  id_product:any;
  isAdmin:any;
  currentIndexes: { [productId: number]: number } = {};

  constructor(private router:Router,private productService: ProductService, private photoService: PhotoService, private favoriteService:FavoriteService ){}
    ngOnInit(): void {
    if(localStorage.getItem('id_admin')){
      this.isAdmin=true;
    }

    this.productService.getProductByType("Magasin").subscribe({
      next: (res) => {
        console.log("Magasin", res);
        this.listAll = res
        this.listAll.forEach((product: any) => {
          product.photos.forEach((photo: any) => {
            this.photoService.getPhoto(photo.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                photo.filePath = objectURL;

              }
            )
          })                   
        })
        this.listAll.forEach((product:any)=>{
          const AdminPhoto = product.admin.photo;
          if(AdminPhoto){
            console.log(" AdminPhoto", AdminPhoto);
          this.photoService.getPhoto(AdminPhoto.id_photo).subscribe(
            blob => {
              const objectURL = URL.createObjectURL(blob);
              AdminPhoto.filePath = objectURL;
              
            }
          );
          }
          
        })
      }
    })
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
  getCurrentIndex(productId: number): number {
    return this.currentIndexes[productId] ?? 0;
  }
  addFav(id_product:any){
  this.id_product=id_product;
 
    const favBody={
      id_product:this.id_product,
      id_user:localStorage.getItem('id_user'),
      id_admin:localStorage.getItem('id_admin')
    }
    if(localStorage.getItem('id_user')!=null){
      this.favoriteService.AddFavByUser(this.id_product, localStorage.getItem('id_user'),{favBody}).subscribe({
      next:(res)=>{
        console.log('resultat add favorite',res);
        window.location.reload();
      }
    })
    }
    if(localStorage.getItem('id_admin')!=null){
      this.favoriteService.AddFavByAdmin(this.id_product, localStorage.getItem('id_admin'),{favBody}).subscribe({
      next:(res)=>{
        console.log('resultat add favorite',res);
        window.location.reload();
      }
    })
    
    
  }
  }
  onSaveProduct(id:any){
  localStorage.setItem('id_product',id);
  if(localStorage.getItem('id_product')){
  this.router.navigate(['/details?product/', localStorage.getItem('id_product')])
  }
  const isAdmin=localStorage.getItem('id_admin');
  const isProduct=localStorage.getItem('id_product');
  const isUser=localStorage.getItem('id_user');
  if(!isAdmin){
    this.productService.AddView(isProduct,isUser).subscribe({
      next:(res)=>{
        console.log('View Product', res);
      },error:(err)=>{
        console.log(' error! View Product', err);
      }    })
  }
}

}




