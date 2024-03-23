import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Member } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private loggedInIdSubject: BehaviorSubject<number>;
  private baseUrl = 'http://localhost:3000';
  
  isLoggedIn: Observable<boolean>;

  constructor(private _http: HttpClient, private router: Router) { 
    // Initialize isLoggedInSubject with the initial value of false
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
    this.loggedInIdSubject = new BehaviorSubject<number>(0);
  }

  login() {
    // Perform your authentication logic here
    // For example, you might authenticate with a server and set a token in local storage
    // For demonstration purposes, we're just setting isLoggedIn to true
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // Perform your logout logic here
    // For example, clear the authentication token from local storage
    // For demonstration purposes, we're just setting isLoggedIn to false
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Method to get the current login status
  // This can be used by components to determine if the user is logged in or not
  public getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  registerUser(memberDetails: Member) {
    return this._http.post(`${this.baseUrl}/members`, memberDetails);
  }

  getUserByEmail(email: string): Observable<Member[]> {
    return this._http.get<Member[]>(`${this.baseUrl}/members?email=${email}`);
  }
}
