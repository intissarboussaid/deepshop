import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommandeService } from '../../Services/CommandeService/commande.service';
import { PhotoService } from '../../Services/photo.service';
import { CommentaireService } from '../../Services/CommentaireService/commentaire.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  order:any;
  allCommenatiresProducts:any
  currentIndexes: { [productId: number]: number } = {};
  constructor(private commandeService:CommandeService, private photoService :PhotoService, private commentaireService:CommentaireService ){}
  ngOnInit(){
     this.commandeService.GetCmdNotConfByAdminAndConfByUser(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {

        console.log('orders', res);
        this.order = res;
        this.order.forEach((cmd: any) => {
          cmd.product.photos.forEach((photo: any) => {
            this.photoService.getPhoto(photo.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                photo.filePath = objectURL;
              }
            )
          })
        })
      }, error: (err) => {
        console.log('error cmds not not by admin', err)
      }
    })
    this.commentaireService.getAllCommentairesToAdmin(localStorage.getItem('id_admin')).subscribe({
      next:(res)=>{
        console.log("all commentaires ", res);
        this.allCommenatiresProducts=res;
      }
    })
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
