import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  public userType: string | null = null;
  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    console.log('User Type:', this.userType);
  }

}
