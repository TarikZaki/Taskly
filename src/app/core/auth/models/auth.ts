export interface RegisterFormValue {
    name: string;
    email: string;
    jobTitle?: string;
    password: string;
}

export interface SupabaseSignUpPayload {
    email: string;
    password: string;
    data: {
        name: string;
        jobTitle?: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Response Models
export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: AuthUser;
    weak_password?: {
        reasons?: string[];
        message?: string;
    } | null;
}

export interface AuthUser {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at?: string | null;
    confirmed_at?: string | null;
    phone?: string;
    last_sign_in_at?: string;
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    identities?: UserIdentity[];
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

export interface UserMetadata {
    name?: string;
    department?: string;
    email?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    sub?: string;
}

export interface UserIdentity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: UserMetadata;
    provider: string;
    last_sign_in_at?: string;
    created_at?: string;
    updated_at?: string;
    email?: string;
}