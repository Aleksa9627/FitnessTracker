import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../interfaces/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  }, {
  })

  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  data: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  registerMember() {
    const postMember = { ...this.registerForm.value };
    this.authService.registerUser(postMember as Member).subscribe(
      response => {
        alert('Registration successful! ');
        this.router.navigate(['login']);
      }
    )
  }

}
