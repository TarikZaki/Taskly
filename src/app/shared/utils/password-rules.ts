import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordRules(p: string) {
    return [
        { label: 'At least 8 characters', ok: p.length >= 8 },
        { label: 'One uppercase, lowercase, and digit', ok: /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) },
        { label: 'One special character', ok: /[^A-Za-z0-9]/.test(p) },
    ];
}

export function strongPassword(c: AbstractControl): ValidationErrors | null {
    if (!c.value) return null;
    return passwordRules(c.value).every((r) => r.ok) ? null : { weakPassword: true };
}

export function passwordsMatch(g: AbstractControl): ValidationErrors | null {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
}