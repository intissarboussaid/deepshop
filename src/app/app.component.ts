import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    // NavbarComponent,
    // FooterComponent,
    HttpClientModule,
    SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deepshop';
  showLayout = true;
  admin:any;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Adjust this condition to match your activate-account route
        const hiddenRoutes = ['/activate-account'];
        this.showLayout = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit(){
    this.admin=localStorage.getItem("id_admin");
  }
}
