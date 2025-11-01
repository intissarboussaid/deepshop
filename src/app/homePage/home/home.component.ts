import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FeaturedComponent } from "../featured/featured.component";
import { OurSolutionComponent } from "../our-solution/our-solution.component";
import { InformationComponent } from "../information/information.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FeaturedComponent, OurSolutionComponent, InformationComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
