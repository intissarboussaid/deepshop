import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommandeService } from '../../Services/CommandeService/commande.service';
import { PhotoService } from '../../Services/photo.service';
import { FooterComponent } from "../../footer/footer.component";
import { Location } from '@angular/common';
import { CodePromoService } from '../../Services/CodePromoService/code-promo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande',
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {

  currentIndexes: { [photoId: number]: number } = {};
  id_cmd: any;
  commande: any;
  cmdsAdded: any[] = [];
  cmdsAcceptedbyUser: any[] = [];
  isAccepted = false;
  price: any;
  total = 0;
  isModalDeleteOpen = false;
  isModalConfOpen = false;
  allComandes: any[] = [];
  id_cmditem: any;
  cmdsItem: any[] = [];
  ConfirmedCommandeByUser: any[] = [];
  ConfirmedCommandeByAdmin: any[] = [];
  RefusedByAdmin: any[] = [];
  isCmdConf = false;
  promoCode = false;
  yesPromoCode = false;
  noPromoCode = false;
  isModalPromoCodeOpen = false;
  succesCodeMessage: any;
  errorCodeMessage: any;
  newCmd: any;
  name: any;

  succesMessage: any;
  errorMessage: any;
  constructor(private location: Location, private commandeService: CommandeService, private photoService: PhotoService, private promoCodeService: CodePromoService) { }
  ngOnInit() {
    if (this.errorMessage) {
      setTimeout(() => {
        localStorage.removeItem("errorMessage");
        this.errorMessage = null;
      }, 8000);
    }

    //get Commande by user not confirmed
    this.commandeService.GetCommandesNotConfByUser(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        this.commande = res;
        localStorage.setItem("id_cmd", res.id_cmd);
        localStorage.setItem("id_cmd", res.id_cmd);
        if (this.commande != null) {
          this.cmdsItem = this.commande.cmd_item;
          console.log("user's commande not validated ....", res)
          this.commande.cmd_item.forEach((item: any) => {
            item.product.photos.forEach((photo: any) => {
              this.photoService.getPhoto(photo.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  photo.filePath = objectURL;
                }
              )
            })
          })
        }


      }, error: (err) => {
        console.log("error commande", err);
      }
    })
    //get commande confirmed by user only 
    this.commandeService.GetCmdConfirmedByUser(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        this.ConfirmedCommandeByUser = res;
        console.log(' commandes confirmed by user only ', this.ConfirmedCommandeByUser);
        this.ConfirmedCommandeByUser.forEach((commande: any) => {
          commande.cmd_item.forEach((cmdItem: any) => {
            cmdItem.product.photos.forEach((photo: any) => {
              this.photoService.getPhoto(photo.id_photo).subscribe(
                blob => {
                  const objectURL = URL.createObjectURL(blob);
                  photo.filePath = objectURL;
                }
              )
            })
          })

        })
        console.log(' commandes confirmed by user only ', this.ConfirmedCommandeByUser);
      }, error: (err) => {
        console.log(' error commandes confirmed by user only ', err);
      }
    })
    //get commande confirmed by Admin 
    this.commandeService.GetCmdConfirmedByUserAndAdmin(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        console.log(' commandes confirmed by admin ', res);
        this.ConfirmedCommandeByAdmin = res;
        this.ConfirmedCommandeByAdmin.forEach((commande: any) => {
          commande.product.photos.forEach((photo: any) => {
            this.photoService.getPhoto(photo.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                photo.filePath = objectURL;
              }
            )
          })
        })
      }, error: (err) => {
        console.log(' error commandes confirmed by user and admin ', err);
      }
    })
    //get commande confirmed by Admin 
    this.commandeService.GetCmdRefusedByAdmin(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        console.log(' commandes Refused by admin ', res);
        this.RefusedByAdmin = res;
        this.RefusedByAdmin.forEach((commande: any) => {
          commande.product.photos.forEach((photo: any) => {
            this.photoService.getPhoto(photo.id_photo).subscribe(
              blob => {
                const objectURL = URL.createObjectURL(blob);
                photo.filePath = objectURL;
              }
            )
          })
        })
      }, error: (err) => {
        console.log(' error commandes refused admin ', err);
      }
    })
    // if (this.commande.cmd_item.length == 0) {
      this.commandeService.DeleteCommande(localStorage.getItem("id_cmd")).subscribe({
        next: (res) => {
          console.log('delete commande', res);
          // this.commande=null;      
        }, error: (err) => {
          console.log(' error delete commande', err);
        }
      })
    // }

  }
  openModalDelete(id_cmditem: any) {
    this.id_cmditem = id_cmditem;
    this.isModalDeleteOpen = true;
    this.isModalConfOpen = false;
    this.isModalPromoCodeOpen = false;
  }
  closeModal() {
    this.isModalDeleteOpen = false;
    this.isModalConfOpen = false;
    this.isCmdConf = false;
    this.isModalPromoCodeOpen = false;
    this.yesPromoCode = false;
    this.noPromoCode = false;
    this.promoCode = false;
  }
  NoPromoCode() {
    this.yesPromoCode = false;
    this.noPromoCode = true;
    this.promoCode = false;
  }
  YesPromoCode() {
    this.yesPromoCode = true;
    this.noPromoCode = false;
    this.promoCode = false;
  }
  openModalConf(id: any) {
    this.id_cmd = id;
    this.isModalDeleteOpen = false;
    this.isModalConfOpen = true;
    this.isModalPromoCodeOpen = false;

  }
  openModalPromoCode() {
    this.isModalDeleteOpen = false;
    this.isModalConfOpen = false;
    this.isModalPromoCodeOpen = true;
    this.promoCode = true;
  }
  getCurrentIndex(photoId: number): number {
    return this.currentIndexes[photoId] ?? 0;
  }
  nextSlide(photoId: number, max: number): void {
    console.log("max", max)
    const current = this.getCurrentIndex(photoId);
    console.log("current", current)
    if (current < max) {
      this.currentIndexes[photoId] = current + 1;
      console.log("current2", this.currentIndexes[photoId])
    }
  }
  prevSlide(photoId: number): void {
    const current = this.getCurrentIndex(photoId);
    if (current > 0) {
      this.currentIndexes[photoId] = current - 1;
    }
  }
  deleteProductFronCmd(id_cmditem: any, id_cmd: any) {
    this.commandeService.deleteProductFromCmd(id_cmditem, id_cmd, localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        console.log("delete product from commande", res);
        window.location.reload();

      },
      error: (err) => {
        console.log("error delete product from commande", err)
      }
    })
  }
  ConfCommand() {

    this.commandeService.ConfCommandeByUser(localStorage.getItem('id_user')).subscribe({
      next: (res) => {
        console.log("confirmed commande", res);
        window.location.reload();
        this.closeModal();
      },
      error: (err) => {
        console.log("confirmed commande", err)
      }
    })


  }
  goBack() {
    this.location.back();
  }
  submitCodePromo(name: any) {

    this.promoCodeService.submitCode(this.id_cmd, name).subscribe({
      next: (res) => {
        console.log("resultat code Promo", res);
        this.newCmd = res;
        this.YesPromoCode();
      }, error: (err) => {
        console.log("error code Promo", err);
        localStorage.setItem("errorCodeMessage", "Your promo code is invalid!");
        this.errorCodeMessage = localStorage.getItem("errorCodeMessage");
        // this.closeModal();

      }
    }
    )
    if (this.errorCodeMessage) {
      setTimeout(() => {
        localStorage.removeItem("errorCodeMessage");
        this.errorCodeMessage = null;
      }, 8000);
    }
    console.log("error code", this.errorCodeMessage)
    console.log("success code", this.succesCodeMessage)
  }
}
