import { AbstractControl, ValidationErrors } from '@angular/forms';

export function getFormValidationErrors(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !control.touched) return null;
    const errors: ValidationErrors = control.errors;
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Enter a valid email address';
    if (errors['minlength']) return `At least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `At most ${errors['maxlength'].requiredLength} characters`;
    if (errors['pattern']) return 'Invalid format';
    if (errors['weakPassword']) return 'Password does not meet the requirements';
    return null;
}