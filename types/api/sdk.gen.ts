// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from '@hey-api/client-fetch';
import type { AuthControllerLoginData, AuthControllerLoginResponse, PartnerControllerRegisterData, PartnerControllerRegisterResponse, PartnerControllerGetProfileData, PartnerControllerGetProfileResponse, PartnerControllerUpdateData, PartnerControllerUpdateResponse } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Login with email and password
 */
export const authControllerLogin = <ThrowOnError extends boolean = false>(options: Options<AuthControllerLoginData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<AuthControllerLoginResponse, unknown, ThrowOnError>({
        url: '/auth/login',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Create a new partner
 */
export const partnerControllerRegister = <ThrowOnError extends boolean = false>(options: Options<PartnerControllerRegisterData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).post<PartnerControllerRegisterResponse, unknown, ThrowOnError>({
        url: '/partners/register',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get partner profile
 */
export const partnerControllerGetProfile = <ThrowOnError extends boolean = false>(options?: Options<PartnerControllerGetProfileData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<PartnerControllerGetProfileResponse, unknown, ThrowOnError>({
        url: '/partners/me',
        ...options
    });
};

/**
 * Update a partner
 */
export const partnerControllerUpdate = <ThrowOnError extends boolean = false>(options: Options<PartnerControllerUpdateData, ThrowOnError>) => {
    return (options.client ?? _heyApiClient).put<PartnerControllerUpdateResponse, unknown, ThrowOnError>({
        url: '/partners',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};