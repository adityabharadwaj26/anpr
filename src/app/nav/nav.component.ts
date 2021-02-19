import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router,) { }

  goToBatches(): void {
    this.router.navigate(['batches']);
  }

  goToPdfEditor(): void {
    this.router.navigate(['pdfeditor']);
  }

  goToTemplates(): void {
    this.router.navigate(['']);
  }

  logout(): void {
    // this.aService.logout().subscribe((res) => {
    //   console.log(res);
    // });
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
