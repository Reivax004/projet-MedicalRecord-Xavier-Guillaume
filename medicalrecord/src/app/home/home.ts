import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  userType: string | null = null;
  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    console.log('User Type:', this.userType);
  }
 
}
