import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  header: string = 'your favorite app that can help you achieve your fitness goals';
  subtitle: string = 'with this app you can add, edit and delete all kinds of trainings and keep track of your goals'
}
