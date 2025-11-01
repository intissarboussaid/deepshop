import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  imports: [],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
constructor(private router:Router){}
signUp() {
this.router.navigate(['signUp']);
}
}
