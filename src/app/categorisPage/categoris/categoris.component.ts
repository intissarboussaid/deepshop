import { NgFor } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { PhotoService } from '../../Services/photo.service';
import { forkJoin } from 'rxjs';
import { AdminService } from '../../Services/adminService/admin.service';
import { Router } from '@angular/router';
import { FavoriteService } from '../../Services/FavoriteService/favorite.service';

@Component({
  selector: 'app-categoris',
  imports: [],
  templateUrl: './categoris.component.html',
  styleUrl: './categoris.component.css'
})
export class CategorisComponent {

  @ViewChild('viewport') viewport!: ElementRef;
  allProduct: any;
  src: any;
  photos: any;
  product: any;
  currentIndexes: { [productId: number]: number } = {};
  exist = false;
  adminImg: any
  nomAdmin: any;
  prenom: any
  categoryList: String[] = ["Phone & Electronique", "Clothes & Fashion", "Gaming & Digitals", "Sprots & Entertainement", "SelfCare & Product", "Kitchen & Home essentials", "Baby & Toy", "Books & Education", "Car & Accessoires", "Animals", "Magasin"];
  listElec: any[] = [];
  listClothes: any[] = [];
  listGame: any[] = [];
  listSprots: any[] = [];
  listSelfCare: any[] = [];
  listKitchen: any[] = [];
  listBaby: any[] = [];
  listBooks: any[] = [];
  listCar: any[] = [];
  listAnimals: any[] = [];
  listMagasin: any[] = [];
  listEmptyType: any[] = [];

  adminImages: (string | null)[] = [];



  constructor(private productService: ProductService, private photoService: PhotoService, private adminService: AdminService, private router:Router,private favoriteService:FavoriteService) { }
  @Input() items_categoris = ['Women', 'Men', 'Kids', 'Footerwear', 'Bags & Accessories', 'Eyewear', 'Sportswear', 'Brands'];

  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  fav:any;
  id_product:any
  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.viewport.nativeElement.offsetLeft;
    console.log('start draggin :start x:', this.startX);
    console.log('start draggin :event page  x:', event.pageX);
    console.log('start draggin :this.viewport.nativeElement.offsetLeft', this.viewport.nativeElement.offsetLeft);
    this.scrollLeft = this.viewport.nativeElement.scrollLeft;
  }
  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.viewport.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1; // Adjust scroll speed with multiplier
    console.log('this.scrollLeft - walk', this.scrollLeft - walk);

    this.viewport.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
  endDrag() {
    this.isDragging = false;
  }
  ngOnInit() {
    this.productService.GetAllProduct().subscribe({
      next: (res) => {
        this.allProduct = res;
        this.allProduct.forEach((product: any,index: number) => {
          this.product = product;
          if(localStorage.getItem('id_user')!=null){
            this.favoriteService.getFavByUserAndProduct(localStorage.getItem('id_user'),product.id_product).subscribe(
              fav => {
          product.fav = fav;    
    })
          }
          if(localStorage.getItem('id_admin')!=null){
            this.favoriteService.getFavByAdminAndProduct(localStorage.getItem('id_admin'),product.id_product).subscribe(
              fav => {
          product.fav = fav;      
    })
          }
          this.nomAdmin = product.admin.nom;
          this.prenom = product.admin.prenom;
          const AdminPhoto=product?.admin?.photo;
        if (AdminPhoto) {
          this.photoService.getPhoto(AdminPhoto.id_photo).subscribe(
            (blob) => {
              const objectURL = URL.createObjectURL(blob);
              this.adminImages[index] = objectURL;
            },
            (error) => {
              this.adminImages[index] = null;
            }
          );
        } else {
          this.adminImages[index] = null;
        }

          if (product.type == "Phone & Electronique") {
            this.listElec.push(product);
          }
          if (product.type == "Clothes & Fashion") {
            this.listClothes.push(product)
          }
          if (product.type == "Gaming & Digitals") {
            this.listGame.push(product)
          }
          if (product.type == "Sprots & Entertainement") {
            this.listSprots.push(product)
          }
          if (product.type == "SelfCare & Product") {
            this.listSelfCare.push(product)
          }
          if (product.type == "Kitchen & Home essentials") {
            this.listKitchen.push(product)
          }
          if (product.type == "Baby & Toy") {
            this.listBaby.push(product)
          }
          if (product.type == "Books & Education") {
            this.listBooks.push(product)
          }
          if (product.type == "Car & Accessoires") {
            this.listCar.push(product)
          }
          if (product.type == "Animals") {
            this.listAnimals.push(product)
          }
          if (product.type == "Magasin") {
            this.listMagasin.push(product)
          }
          if (product.type == "") {
            this.listEmptyType.push(product)
          }
          const photoObservables = this.product.photos.map((photo: any) =>
            this.photoService.getPhoto(photo.id_photo)
          );
          forkJoin(photoObservables).subscribe((blobs: any) => {
            blobs.forEach((blob: any, index: any) => {
              const objectURL = URL.createObjectURL(blob);
              product.photos[index].src = objectURL;
            });
            // console.log('Updated photos for product:', product);
          });

        })
      },
    })
    


  }
  getPhoto(id: any) {
    this.photoService.getPhoto(id).subscribe(
      blob => {
        const objectURL = URL.createObjectURL(blob);
        console.log("content blob", blob)
        this.src = objectURL;
        console.log("image", this.src)
      }
    )
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

}

