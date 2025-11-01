import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CustomersService } from '../Services/CustomersService/customers.service';
import { PhotoService } from '../Services/photo.service';
import { CodePromoService } from '../Services/CodePromoService/code-promo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [FooterComponent, NavbarComponent, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  allCustomers: any[] = [];
  admin: any;
  isFidele = false;
  perecent: any;
  successMessage: any;
  errorMessage: any;
  isModalOpen = false;
  id_user: any;
  edit = false;
  content = false;
  codePromo:any;
  constructor(private customersService: CustomersService, private photoService: PhotoService, private codePromoService: CodePromoService) { }

  ngOnInit() {
    console.log("id_user:", this.id_user);
    this.admin = localStorage.getItem("id_admin");
    if (localStorage.getItem('id_admin') != null) {
      this.customersService.GetCustomersByAdmin(localStorage.getItem('id_admin')).subscribe({
        next: (res) => {
          console.log('all customers of this admin: ', res);
          this.allCustomers = res.user_customer;
          console.log('all customers of this admin: ', this.allCustomers);
          this.allCustomers.forEach((user: any) => {

            if (user.user.photo) {
              this.photoService.getPhoto(user.user.photo.id_photo).subscribe(blob => {
                const objectURL = URL.createObjectURL(blob);
                user.user.photo.filePath = objectURL;
              });
            }

          })
        }, error: (err) => {
          console.log('error get customers: ', err);
        }
      }

      )
    }
    this.successMessage = localStorage.getItem("successMessage")
    if (this.successMessage) {
      setTimeout(() => {
        localStorage.removeItem("successMessage");
        this.successMessage = null;
      }, 2000);
    }
    this.errorMessage = localStorage.getItem("errorMessage")
    if (this.errorMessage) {
      setTimeout(() => {
        localStorage.removeItem("errorMessage");
        this.errorMessage = null;
      }, 2000);
    }
  }
  makeItFidele(id: any) {
    this.customersService.MakeItFidele(id).subscribe({
      next: (res) => {
        console.log("client fidele" + res);
        window.location.reload();
      },
      error: (err) => {
        console.log("error " + err)
      }
    })
  }
  makeItNotFidele(id: any) {
    this.customersService.MakeItNotFidele(id).subscribe({
      next: (res) => {
        console.log("client not fidele" + res);
        window.location.reload();
      },
      error: (err) => {
        console.log("error " + err)
      }
    })
  }
  addCodePromo() {
    const bodyCodePromo = {
      percent: this.perecent
    }
    this.codePromoService.addCodePromo(localStorage.getItem("id_admin"), this.id_user, bodyCodePromo).subscribe({
      next: (res) => {
        console.log("resultat code promo: ", res);
        localStorage.setItem("successMessage", "Promo code added successfully.")
        this.successMessage = localStorage.getItem("successMessage");
        this.isModalOpen = false;
        setTimeout(() => {
          localStorage.removeItem("successMessage");
          this.successMessage = null;
        }, 2000);


      }, error: (err) => {
        localStorage.setItem("errorMessage", "Your promo code is invalid.")
        this.errorMessage = localStorage.getItem("errorMessage");

        setTimeout(() => {
          localStorage.removeItem("errorMessage");
          this.errorMessage = null;
        }, 2000);

      }
    })

  }
  openModalEdit(id: any) {
    this.id_user = id;
    this.isModalOpen = true;
    this.edit = true;
    this.content = false;
    console.log("id_user:", this.id_user);
  }
  openModalContent(id: any) {
    this.id_user = id;
    this.isModalOpen = true;
    this.edit = false;
    this.content = true;
    this.getCodePromo(this.id_user);
    console.log("id_user:", this.id_user);
  }
  closeModal() {
    this.isModalOpen = false;
  }
  NotFifele() {
    localStorage.setItem("errorMessage", "Your customer is not loyal.")
    this.errorMessage = localStorage.getItem("errorMessage");
    setTimeout(() => {
      localStorage.removeItem("errorMessage");
      this.errorMessage = null;
    }, 2000);

  }
  getCodePromo(id_user: any) {
    if (localStorage.getItem('id_admin')) {
      this.codePromoService.GetPromoByAdminAndUser(localStorage.getItem('id_admin'), id_user).subscribe({
        next: (res) => {
          console.log("resultat code promo", res);
          this.codePromo=res;
        }, error: (err) => {
          console.log("error code promo", err);
        }
      })
    }
  }
}
