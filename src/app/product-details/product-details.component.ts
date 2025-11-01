import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductService } from '../Services/Product/product.service';
import { PhotoService } from '../Services/photo.service';
import { forkJoin } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { CommentaireService } from '../Services/CommentaireService/commentaire.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingService } from '../Services/RatingService/rating.service';
import { CommandeService } from '../Services/CommandeService/commande.service';
import { FavoriteService } from '../Services/FavoriteService/favorite.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,NavbarComponent, FooterComponent, FormsModule, HttpClientModule,],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any;
  photos: any
  src: any;
  id_product: any;
  isClick = false;
  currentIndexes: { [productId: number]: number } = {};
  allPhotos: any[] = [];
  isMore = false;
  commentaire: any;
  isUser = false;
  starts: any;
  StartList: any[] = [1, 2, 3, 4, 5];
  isCommentaire = false;
  isStarts = false;
  listStartUser: any[] = [];
  error = "";
  listOf1: any[] = [];
  listOf2: any[] = [];
  listOf3: any[] = [];
  listOf4: any[] = [];
  listOf5: any[] = [];
  CommentaireList: any[] = [];
  ReviewList: any[] = [];
  color: any;
  size: any;
  quantity: any;
  commandeMessage:any;
  isLoading = true;
  isFav=false;
  isAdmin=false;
  errorMessage:any;
  constructor(private commentaireService: CommentaireService, private productService: ProductService, private photoService: PhotoService, private ratingService: RatingService, private location: Location, private commandeService: CommandeService, private favoriteService:FavoriteService) { }
  ngOnInit(): void {
    this.id_product = localStorage.getItem('id_product');
    if(localStorage.getItem('id_user')!=null){
      this.favoriteService.getFavByUserAndProduct(localStorage.getItem('id_user'), localStorage.getItem('id_product')).subscribe({
      next:(res)=>{
        if(res!=null){
          this.isFav=true;          
        }
      },error:(err)=>{
      }
    })
    }
    if(localStorage.getItem('id_admin')!=null){
      this.favoriteService.getFavByAdminAndProduct(localStorage.getItem('id_admin'), localStorage.getItem('id_product')).subscribe({
      next:(res)=>{
        if(res!=null){
          this.isFav=true;          
        }
      },error:(err)=>{
      }
    })
    }
    
    this.productService.getProductById(this.id_product).subscribe({
      next: res => {
        this.product = res;
        this.photos = this.product.photos;
        console.log("product",res)
        const photoObservables = this.product.photos.map((photo: any) =>
          this.photoService.getPhoto(photo.id_photo)
        );
        forkJoin(photoObservables).subscribe((blobs: any) => {
          blobs.forEach((blob: any, index: any) => {
            const objectURL = URL.createObjectURL(blob);
            this.product.photos[index].src = objectURL;
            this.allPhotos.push(objectURL);

          });

        });
      },
      error: err => {
      }
    })
    if (localStorage.getItem('id_user')) {
      this.isUser = true;
    }
     if (localStorage.getItem('id_admin')) {
      this.isAdmin = true;
    }

    this.commentaireService.getCommentaireByProduct(localStorage.getItem('id_product')).subscribe({
      next: (res) => {
        if (res.length != 0) {
          this.isCommentaire = true;
        }
        this.CommentaireList = res;
        let loaded = 0;
        this.CommentaireList.forEach((commentaire: any) => {
          loaded++;
          if(commentaire.user!=null){
            this.photoService.getPhoto(commentaire.user.photo.id_photo).subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            commentaire.user.filePath = objectURL;
          });
          }
          if(commentaire.admin!=null){
             this.photoService.getPhoto(commentaire.admin.photo.id_photo).subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            commentaire.admin.filePath = objectURL;
          });                       
          }
          

          if (loaded === this.CommentaireList.length) {
            this.isLoading = false;
          }
        })
      }
    })
    this.ratingService.getRatingByProduct(localStorage.getItem('id_product')).subscribe({
      next: (res) => {
        this.isStarts = true;
        this.ReviewList=res;
         console.log("starts this product", res)
        for (let i of res) {
          if (i.starts == 1) {
            this.listOf1.push(i.starts);
          }
          if (i.starts == 2) {
            this.listOf2.push(i.starts);
          }
          if (i.starts == 3) {
            this.listOf3.push(i.starts);
          }
          if (i.starts == 4) {
            this.listOf4.push(i.starts);
          }
          if (i.starts == 5) {
            this.listOf5.push(i.starts);
          }


        }
        console.log('all lists ', this.listOf1,this.listOf2,this.listOf3,this.listOf4,this.listOf5)
      }, error: (err) => {
       

      }
    })
    if(localStorage.getItem('id_user')!=null){
       this.ratingService.getRatingByUserAndProduct(localStorage.getItem('id_user'), localStorage.getItem('id_product')).subscribe({
      next: (res) => {
        let i = 1;
        if (res) {
          while (i <= res.starts) {
            this.listStartUser.push(i);
            i++;
          }
        }

      }, error: (err) => {
        console.log("starts this user", err)
      }
    })
    }
    if(localStorage.getItem('id_admin')!=null){
       this.ratingService.getRatingByAdminAndProduct(localStorage.getItem('id_admin'), localStorage.getItem('id_product')).subscribe({
      next: (res) => {
        console.log("rating : ", res)
        let i = 1;
        if (res) {
          while (i <= res.starts) {
            this.listStartUser.push(i);
            i++;
          }
        }

      }, error: (err) => {
        console.log("starts this user", err)
      }
    })
    } 
    this.commandeMessage=localStorage.getItem('commandeMessage');
    if (this.commandeMessage) {
      setTimeout(() => {
        localStorage.removeItem('commandeMessage')
        this.commandeMessage = null;

      }, 2000);
    }
    this.errorMessage=localStorage.getItem('errorMessage');
    if (this.errorMessage) {
      setTimeout(() => {
        localStorage.removeItem('errorMessage')
        this.errorMessage = null;

      }, 2000);
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

  photo(id: any) {
    this.isClick = true;
    if (id != null) {
      this.src = this.allPhotos[id];
    }

  }

  readMore() {
    this.isMore = !this.isMore;
  }

  goBack() {
    this.location.back();
  }

  OnsubmitCommantaire() {
    const CommentaireBody = {
      commentaire: this.commentaire
    }
    const id_product = localStorage.getItem("id_product")
    const id_user = localStorage.getItem("id_user")
    const id_admin = localStorage.getItem("id_admin")
if(id_user!=null){
  this.commentaireService.AddCommentaireByUser(id_product, id_user, CommentaireBody).subscribe({
      next: (res) => {
        console.log("commentaire content By user ", res)
        window.location.reload();
      }, error: (err) => {
        console.log("user content By user", err)
      }
    })
}
if(id_admin!=null){
  this.commentaireService.AddCommentaireByAdmin(id_product, id_admin, CommentaireBody).subscribe({
      next: (res) => {
        console.log("commentaire content ByAdmin", res)
        window.location.reload();
      }, error: (err) => {
        console.log("user content ByAdmin", err)
      }
    })
}
    
  }
  selectStarts(starts: any) {
    this.starts = starts;
    console.log("selected start", this.starts)
  }
  onsubmitStarts() {
    const RatingBody = {
      starts: this.starts
    }
    const isUser= localStorage.getItem('id_user');
    const isAdmin= localStorage.getItem('id_admin');
    if(isUser!=null){
      this.ratingService.AddRating(localStorage.getItem('id_product'), isUser, RatingBody).subscribe({
      next: (res) => {
        console.log("Rating Body", res);
        window.location.reload();
      }, 
    })
    }
    else if(isAdmin!=null){
      this.ratingService.AddRatingByAdmin(localStorage.getItem('id_product'), isAdmin, RatingBody).subscribe({
      next: (res) => {
        console.log("Rating Body", res);
        window.location.reload();
      }, 
    })
    }else{
      window.location.href='/login';
    }
    
  }
  OnSelectColor(color: any) {
    this.color = color;
    console.log("color selected: " ,this.color )
  }
  OnSelectSize(size: any) {
    this.size = size;
    console.log("size selected: " ,this.size )
  }
  addCommande() {

    const CommandeBody = {
      color: this.color,
      size: this.size,
      quantity: this.quantity

    }
    if(this.color!=null){
   this.commandeService.AddCommande(localStorage.getItem('id_product'), localStorage.getItem('id_user'), CommandeBody).subscribe({
      next: (res) => {
        console.log('commande', res);
        localStorage.setItem('commandeMessage',"Command successfully added to cart");
        window.location.reload();
      }, error: (err) => {
        console.log('commande', err);
      }
    });
    }else{
     localStorage.setItem("errorMessage","Command error: missing color.")
     this.errorMessage=localStorage.getItem("errorMessage");
    }
 


    this.commandeService.GetCommandesByProduct(localStorage.getItem('id_product')).subscribe({
      next: (res) => {
        console.log('commande product', res);
      }, error: (err) => {
        console.log('commande product', err);
      }
    })
  }

  addFav(){
    const favBody={
      id_product:localStorage.getItem('id_product'),
      id_user:localStorage.getItem('id_user')
    }
    if(localStorage.getItem('id_user')!=null){
      this.favoriteService.AddFavByUser(localStorage.getItem('id_product'), localStorage.getItem('id_user'),{favBody}).subscribe({
      next:(res)=>{
        console.log('resultat add favorite',res);
        window.location.reload();
      }
    })
    }
    if(localStorage.getItem('id_admin')!=null){
      this.favoriteService.AddFavByAdmin(localStorage.getItem('id_product'), localStorage.getItem('id_admin'),{favBody}).subscribe({
      next:(res)=>{
        console.log('resultat add favorite',res);
        window.location.reload();
      }
    })
    }
    
  }

}
