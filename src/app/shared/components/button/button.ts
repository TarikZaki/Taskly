import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);
}
