import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured',
  imports: [],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
 constructor(private router:Router){}
  categoris(){
    this.router.navigate(['categoris']);
  }
}