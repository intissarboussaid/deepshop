import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule, Location } from '@angular/common';
import { DiscountService } from '../../Services/discount.service';
import { ProductService } from '../../Services/Product/product.service';
import { CommentaireService } from '../../Services/CommentaireService/commentaire.service';
import { PhotoService } from '../../Services/photo.service';




@Component({
  selector: 'app-historique',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  constructor(private commentaireService: CommentaireService,private photoService: PhotoService, private location: Location, private discountService: DiscountService, private productService: ProductService, private commentService: CommentaireService) { }
  isAll = true;
  isProduct = false;
  isDiscount = false;
  iscommantiare = false;
  AllList: any[] = [];
  ProductList: any[] = [];
  CommainterList: any[] = [];
  CommentByProduct: any[] = [];
  CommentaireList:any[]=[]
  currentIndexes: { [productId: number]: number } = {};
   isAdmin = localStorage.getItem('id_admin');
   isUser = localStorage.getItem('id_user');

  ngOnInit() { 
    if (this.isAdmin != null) {      
      this.productService.GetProductsByAdmin(this.isAdmin).subscribe({
        next: (res) => {
          this.ProductList = res;
          this.ProductList.forEach((product: any) => {
            this.AllList.push(product);
            this.AllList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());    
             product.photos.forEach((image: any) => {
              this.photoService.getPhoto(image.id_photo).subscribe(                
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  image.filePath = objectURL;
                })
              this.commentaireService.getCommentaireByProduct(product.id_product).subscribe({
      next: (res) => {
        this.CommentaireList = res;
        // console.log('commainter: ',res)
        // this.CommentaireList.forEach((commentaire: any) => {
        //   loaded++;
        //   if(commentaire.user!=null){
        //     this.photoService.getPhoto(commentaire.user.photo.id_photo).subscribe(blob => {
        //     const objectURL = URL.createObjectURL(blob);
        //     commentaire.user.filePath = objectURL;
        //   });
        //   }
        //   if(commentaire.admin!=null){
        //      this.photoService.getPhoto(commentaire.admin.photo.id_photo).subscribe(blob => {
        //     const objectURL = URL.createObjectURL(blob);
        //     commentaire.admin.filePath = objectURL;
        //   });                       
        //   }
        // })
      }
    })
            }
            )
          })
          this.AllList.forEach((product:any)=>{
            product.discount.sort((c:any, d:any) => new Date(c.date).getTime() - new Date(d.date).getTime());
          })
        }, error: (err => {
          console.log("error get Products by admin : ", err);
        })
      })
    }

    console.log('final version history', this.AllList)
  }
  goBack() {
    this.location.back();
  }
  all() {
    this.isAll = true;
    this.isProduct = false;
    this.isDiscount = false;
    this.iscommantiare = false;

  }
  product() {
    this.isAll = false;
    this.isProduct = true;
    this.isDiscount = false;
    this.iscommantiare = false;
  }
  comment() {
    this.isAll = false;
    this.isProduct = false;
    this.isDiscount = false;
    this.iscommantiare = true;
  }
  discount() {
    this.isAll = false;
    this.isProduct = false;
    this.isDiscount = true;
    this.iscommantiare = false;
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

}