import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-form-field',
  styleUrl: './form-field.css',
  templateUrl: './form-field.html',
})
export class FormField {
  label = input.required<string>();
  forId = input<string>();
  required = input(false);
  hint = input<string>();
  error = input<string | null>(null);
}
