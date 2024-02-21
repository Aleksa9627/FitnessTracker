import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
    // Subscribe to changes in login status
    this._authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    // Subscribe to router events to detect navigation to the login page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOnLoginPage = event.url.includes('/login'); // Adjust the URL based on your actual login page URL
      }
    });

    // Subscribe to authentication status changes
    this._authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    // Call your authentication service's login method
    this._authService.login();
  }

  logout() {
    // Call your authentication service's logout method
    this._authService.logout();
  }


}
