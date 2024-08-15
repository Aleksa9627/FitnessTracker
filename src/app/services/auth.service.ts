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
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
    this.loggedInIdSubject = new BehaviorSubject<number>(0);
  }

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

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
