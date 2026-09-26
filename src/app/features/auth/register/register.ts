import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordRules, passwordsMatch, strongPassword } from '../../../shared/utils/password-rules';
import { toSignal } from '@angular/core/rxjs-interop';
import { PasswordInput } from '../../../shared/components/password-input/password-input';
import { getFormValidationErrors } from '../../../shared/utils/form-errors';
import { RouterLink, Router } from '@angular/router';
import { FormField } from '../../../shared/components/form-field/form-field';
import { Button } from '../../../shared/components/button/button';
import { Auth } from '../../../core/auth/services/auth';

@Component({
  imports: [PasswordInput, ReactiveFormsModule, FormField, Button, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private readonly auth = inject(Auth)
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[\p{L} ]+$/u)]],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: [''],
      password: ['', [Validators.required, strongPassword]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatch },
  );

  private password = toSignal(this.registerForm.controls.password.valueChanges, { initialValue: this.registerForm.controls.password.value, });
  rules = computed(() => passwordRules(this.password()));

  err = getFormValidationErrors;

  get confirmError() {
    const c = this.registerForm.controls.confirmPassword;
    if (!c.touched) return null;
    if (c.errors?.['required']) return 'Please confirm your password';
    return this.registerForm.errors?.['mismatch'] ? 'Passwords do not match' : null;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.registerAccount();
  }

  private registerAccount() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { name, email, jobTitle, password } = this.registerForm.getRawValue();
    this.auth.signUp({ name, email, jobTitle, password }).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);

      },
    });
  }
}
