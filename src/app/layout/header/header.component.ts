import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {AuthUtils} from "../../core/auth/auth.utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(public router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken') ?? '';
    if (accessToken) {
      this.isLoggedIn = !AuthUtils.isTokenExpired(accessToken);
    }
    this.currentUser = JSON.parse(localStorage.getItem('HEADER_USER') ?? 'null');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
