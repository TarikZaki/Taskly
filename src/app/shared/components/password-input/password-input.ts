import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-password-input',
  styleUrl: './password-input.css',
  templateUrl: './password-input.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PasswordInput), multi: true }],
})
export class PasswordInput implements ControlValueAccessor {
  inputId = input<string>();
  placeholder = input('Password');
  errorText = input<string | null>(null);
  value = signal('');
  disabled = signal(false);
  visible = signal(false);

  private onChange: (v: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(v: string | null) { this.value.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled.set(d); }

  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }
}
