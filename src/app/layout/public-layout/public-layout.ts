import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicNavbar } from '../public-navbar/public-navbar';
@Component({
  imports: [RouterOutlet, PublicNavbar],
  selector: 'app-public-layout',
  styleUrl: './public-layout.css',
  templateUrl: './public-layout.html',
})
export class PublicLayout { }
