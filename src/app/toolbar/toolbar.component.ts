import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  isOnLoginPage: boolean = false;

  constructor(
    public _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOnLoginPage = event.url.includes('/login');
      }
    });

    this._authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }
}
