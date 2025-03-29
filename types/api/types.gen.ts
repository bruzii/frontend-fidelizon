// This file is auto-generated by @hey-api/openapi-ts

export type LoginDto = {
    /**
     * Email address
     */
    email: string;
    /**
     * User password
     */
    password: string;
};

export type AuthResponseDto = {
    /**
     * JWT access token
     */
    accessToken: string;
    user: {
        id: string;
        email: string;
        accountType: 'customer' | 'partner';
        firstName?: string;
        lastName?: string;
    };
};

export type CreatePartnerDto = {
    /**
     * The email of the partner
     */
    email: string;
    /**
     * The password of the partner
     */
    password: string;
    /**
     * The first name of the partner
     */
    first_name: string;
    /**
     * The last name of the partner
     */
    last_name: string;
    /**
     * The phone country code of the partner
     */
    phone_country_code: string;
    /**
     * The phone number of the partner
     */
    phone_number: string;
    /**
     * The type of the partner
     */
    type: 'network' | 'subnetwork' | 'franchise';
    /**
     * The default language of the partner
     */
    default_language: string;
    /**
     * The network ID of the partner
     */
    network_id?: string;
};

export type PartnerResponseDto = {
    /**
     * The ID of the partner
     */
    id?: string;
    /**
     * The email of the partner
     */
    email: string;
    /**
     * The first name of the partner
     */
    first_name: string;
    /**
     * The last name of the partner
     */
    last_name: string;
    /**
     * The phone country code of the partner
     */
    phone_country_code: string;
    /**
     * The phone number of the partner
     */
    phone_number: string;
    /**
     * The status of the partner
     */
    status: 'waiting_verification' | 'active' | 'paused' | 'waiting_payment';
    /**
     * The type of the partner
     */
    type: 'network' | 'subnetwork' | 'franchise';
    /**
     * The default language of the partner
     */
    default_language: string;
    /**
     * The network ID of the partner
     */
    network_id?: string;
    /**
     * The access token of the partner
     */
    accessToken?: string;
};

export type DomainUpdatePartnerDto = {
    /**
     * The email of the partner
     */
    email?: string;
    /**
     * The password of the partner
     */
    password?: string;
    /**
     * The first name of the partner
     */
    first_name?: string;
    /**
     * The last name of the partner
     */
    last_name?: string;
    /**
     * The phone country code of the partner
     */
    phone_country_code?: string;
    /**
     * The phone number of the partner
     */
    phone_number?: string;
    /**
     * The status of the partner
     */
    status?: 'waiting_verification' | 'active' | 'paused' | 'waiting_payment';
    /**
     * The type of the partner
     */
    type?: 'network' | 'subnetwork' | 'franchise';
    /**
     * The default language of the partner
     */
    default_language?: string;
};

export type DomainCreateNetworkDto = {
    /**
     * The type of the network
     */
    type: 'independent' | 'franchise';
    name?: string;
    partner_id: string;
};

export type PointDto = {
    type: 'Point';
    coordinates: Array<number>;
};

export type CreateEstablishmentDto = {
    location?: PointDto;
    name: string;
    public_establishment_id: string;
    google_place_id?: string;
    address: string;
    neighborhood?: string;
    city: string;
    cep: string;
};

export type OnboardingPartnerDto = {
    network: DomainCreateNetworkDto;
    establishments: Array<CreateEstablishmentDto>;
};

export type OnboardingPartnerResponseDto = {
    [key: string]: unknown;
};

export type StructuredFormatting = {
    main_text: string;
    secondary_text: string;
};

export type PredictionDto = {
    place_id: string;
    description: string;
    structured_formatting: StructuredFormatting;
};

export type AutocompleteResponseDto = {
    predictions: Array<PredictionDto>;
};

export type AuthControllerLoginData = {
    body: LoginDto;
    path?: never;
    query?: never;
    url: '/auth/login';
};

export type AuthControllerLoginErrors = {
    /**
     * Invalid credentials
     */
    401: unknown;
};

export type AuthControllerLoginResponses = {
    /**
     * Successfully authenticated
     */
    200: AuthResponseDto;
};

export type AuthControllerLoginResponse = AuthControllerLoginResponses[keyof AuthControllerLoginResponses];

export type PartnerControllerRegisterData = {
    body: CreatePartnerDto;
    path?: never;
    query?: never;
    url: '/partners/register';
};

export type PartnerControllerRegisterErrors = {
    /**
     * Bad Request.
     */
    400: unknown;
};

export type PartnerControllerRegisterResponses = {
    /**
     * The partner has been successfully created.
     */
    201: PartnerResponseDto;
};

export type PartnerControllerRegisterResponse = PartnerControllerRegisterResponses[keyof PartnerControllerRegisterResponses];

export type PartnerControllerGetProfileData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/partners/me';
};

export type PartnerControllerGetProfileResponses = {
    /**
     * Return the partner profile.
     */
    200: PartnerResponseDto;
};

export type PartnerControllerGetProfileResponse = PartnerControllerGetProfileResponses[keyof PartnerControllerGetProfileResponses];

export type PartnerControllerUpdateData = {
    body: DomainUpdatePartnerDto;
    path?: never;
    query?: never;
    url: '/partners';
};

export type PartnerControllerUpdateErrors = {
    /**
     * Bad Request.
     */
    400: unknown;
};

export type PartnerControllerUpdateResponses = {
    /**
     * The partner has been successfully updated.
     */
    200: PartnerResponseDto;
};

export type PartnerControllerUpdateResponse = PartnerControllerUpdateResponses[keyof PartnerControllerUpdateResponses];

export type PartnerControllerOnboardingData = {
    body: OnboardingPartnerDto;
    path?: never;
    query?: never;
    url: '/partners/onboarding';
};

export type PartnerControllerOnboardingResponses = {
    /**
     * The partner has been successfully onboarded.
     */
    200: unknown;
    201: Array<OnboardingPartnerResponseDto>;
};

export type PartnerControllerOnboardingResponse = PartnerControllerOnboardingResponses[keyof PartnerControllerOnboardingResponses];

export type PartnerControllerAutocompleteData = {
    body?: never;
    path?: never;
    query: {
        address: string;
    };
    url: '/partners/autocomplete';
};

export type PartnerControllerAutocompleteResponses = {
    /**
     * Returns autocomplete suggestions for an address.
     */
    200: AutocompleteResponseDto;
};

export type PartnerControllerAutocompleteResponse = PartnerControllerAutocompleteResponses[keyof PartnerControllerAutocompleteResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:3000' | (string & {});
};