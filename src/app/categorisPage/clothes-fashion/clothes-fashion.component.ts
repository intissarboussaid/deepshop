import { Component } from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { PhotoService } from '../../Services/photo.service';
import { FavoriteService } from '../../Services/FavoriteService/favorite.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-clothes-fashion',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './clothes-fashion.component.html',
  styleUrl: './clothes-fashion.component.css'
})
export class ClothesFashionComponent {
  isAll = true;
  isWomen = false;
  isMen = false;
  isBaby = false;
  isFootWear = false;
  listAll: any[] = [];
  listWomen: any[] = [];
  listMen: any[] = [];
  listBaby: any[] = [];
  id_product:any;
  isAdmin:any;
  currentIndexes: { [productId: number]: number } = {};

  constructor(private router:Router,private productService: ProductService, private photoService: PhotoService, private favoriteService:FavoriteService) { }
  ngOnInit(): void {
    if(localStorage.getItem('id_admin')){
      this.isAdmin=true;
    }

    this.productService.getProductByType("Clothes & Fashion").subscribe({
      next: (res) => {
        console.log("clothes", res);
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

    this.productService.getProductByType("Baby & Toy").subscribe({
      next: (res) => {
        console.log("baby", res);
        this.listBaby = res;
        this.listAll.join(res)
        this.listBaby.forEach((product: any) => {
          product.photos.forEach((photo: any) => {
            this.photoService.getPhoto(photo.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                photo.filePath = objectURL;

              }
            )
          })                   
        })
        this.listBaby.forEach((product:any)=>{
          const AdminPhoto = product.admin.photo;
          if(AdminPhoto){
            console.log(" product baby", product);
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
console.log("all", this.listAll);
  }
  openWomen() {
    this.isAll = false;
    this.isWomen = true;
    this.isMen = false;
    this.isBaby = false;
    this.isFootWear = false;
  }
  openAll() {
    this.isAll = true;
    this.isWomen = false;
    this.isMen = false;
    this.isBaby = false;
    this.isFootWear = false;
  }
  openMen() {
    this.isAll = false;
    this.isWomen = false;
    this.isMen = true;
    this.isBaby = false;
    this.isFootWear = false;
  }
  openBaby() {
    this.isAll = false;
    this.isWomen = false;
    this.isMen = false;
    this.isBaby = true;
    this.isFootWear = false;
  }
  openFootWear() {
    this.isAll = false;
    this.isWomen = false;
    this.isMen = false;
    this.isBaby = false;
    this.isFootWear = true;
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
