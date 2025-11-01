import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CategorisComponent } from "../categoris/categoris.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CategorisComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
