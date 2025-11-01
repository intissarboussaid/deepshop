import { Component } from '@angular/core';
import { CommandeService } from '../../Services/CommandeService/commande.service';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { PhotoService } from '../../Services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [ FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: '../all-products/all-products.component.css',

})
export class OrderComponent {

  currentIndexes: { [productId: number]: number } = {};
  isModalOpen = false;
  id_cmdItem: any;
  isCancelOpen = false;
  isValidOpen = false;
  order: any[] = [];
  validOrder: any[] = [];
  refusedOrder: any[] = [];
  message: any;
  constructor(private commandeService: CommandeService, private photoService: PhotoService) { }
  ngOnInit() {
    // get orders not conf
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
    // get orders valid by admin
    this.commandeService.GetCmdsValidedByAdmin(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {

        console.log('valid orders', res);
        this.validOrder = res;
        this.validOrder.forEach((cmd: any) => {
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
    // get orders refused by admin
    this.commandeService.GetCmdsRefusedByAdmin(localStorage.getItem('id_admin')).subscribe({
      next: (res) => {

        console.log('refused orders', res);
        this.refusedOrder = res;
        this.refusedOrder.forEach((cmd: any) => {
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
  validercmd() {
    this.commandeService.ValiderCmdByAdmin(this.id_cmdItem).subscribe({
      next: (res) => {
        console.log('cmd valider', res);
        this.isModalOpen = false;
         window.location.reload();
      },
      error: (err) => {
        localStorage.setItem("message","This command is invalid because it doesn't include a color.")
        this.message = localStorage.getItem("message");
        if (this.message) {
          setTimeout(() => {
            localStorage.removeItem("message");
            this.message = null;
          }, 8000);
        }
        this.isModalOpen = false;
      }
    })
  }
  Cancelcmd() {
    this.commandeService.CancelCmdByAdmin(this.id_cmdItem).subscribe({
      next: (res) => {
        console.log('cmd valider', res);
        this.isModalOpen = false;
        window.location.reload();
      }
    })
  }
  OpenValidModal(id: any) {
    this.isModalOpen = true;
    this.id_cmdItem = id;
    this.isValidOpen = true;
    this.isCancelOpen = false;
  }
  OpenCancelModal(id: any) {
    this.isModalOpen = true;
    this.id_cmdItem = id;
    this.isValidOpen = false;
    this.isCancelOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
