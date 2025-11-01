import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactService } from '../Services/ContactService/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule,NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  email: any;
  firstName: any;
  lastName: any;
  message: any;
  subject: any;
  successMessage:any;
  errorMessage:any;
  constructor(private contactService: ContactService) { }
  ngOnInit(){
        this.successMessage = localStorage.getItem('successMessage');
    // console.log('successMessage : ', this.successMessage)

    if (this.successMessage) {
      setTimeout(() => {
        localStorage.removeItem('successMessage');
        this.successMessage = null;
      }, 8000);
    }
    this.errorMessage = localStorage.getItem('errorMessage');
    if (this.errorMessage) {
      setTimeout(() => {
        localStorage.removeItem('errorMessage')
        this.errorMessage = null;

      }, 8000);
    }
  }
  onSubmit() {
    const contactBody = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      message: this.message,
      subject: this.subject,
    }
    this.contactService.sendMessage(contactBody).subscribe({
      next: (res) => {
        console.log('conatc section  ', res);
        localStorage.setItem('successMessage',"✅ Your message has been sent successfully. Thank you for contacting us.");
        window.location.reload();
      },error:(err)=>{
        localStorage.setItem('errorMessage',"❌ Failed to send your message. Please try again later.");
        window.location.reload();

      }
    })
    console.log(' contact body', contactBody)

  }
}
