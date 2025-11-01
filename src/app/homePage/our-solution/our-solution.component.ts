import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-solution',
  imports: [],
  templateUrl: './our-solution.component.html',
  styleUrl: './our-solution.component.css'
})
export class OurSolutionComponent {
 constructor(private router:Router){}
fashion() {
this.router.navigate(['fashion']);
}
}
