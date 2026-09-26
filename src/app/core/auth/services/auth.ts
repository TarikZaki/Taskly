import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterFormValue, SupabaseSignUpPayload } from '../models/auth';

@Service()
export class Auth {
    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);

    headers = new HttpHeaders({
        apikey: environment.supabaseKey,
    });

    signUp(formData: RegisterFormValue): Observable<AuthResponse> {
        const payload: SupabaseSignUpPayload = {
            email: formData.email,
            password: formData.password,
            data: {
                name: formData.name,
                jobTitle: formData.jobTitle || undefined,
            },
        };

        return this.httpClient.post<AuthResponse>(
            `${environment.apiUrl}/auth/v1/signup`,
            payload,
            { headers: this.headers }
        );
    }

    login(data: LoginRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(
            environment.apiUrl + '/auth/v1/token?grant_type=password',
            {
                email: data.email,
                password: data.password,
            },
            {
                headers: this.headers,
            }
        );
    }

}
