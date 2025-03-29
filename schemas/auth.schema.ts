import * as z from 'zod';

// Schéma pour un établissement
export const establishmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  neighborhood: z.string().optional(),
  cep: z.string().min(1, 'CEP é obrigatório'),
  google_place_id: z.string().optional(),
});

// Schéma complet du formulaire d'inscription
export const registrationSchema = z
  .object({
    // Step 1: Personal Information
    first_name: z.string().min(1, 'Nome é obrigatório'),
    last_name: z.string().min(1, 'Sobrenome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone_country_code: z.string().min(1, 'Código do país é obrigatório'),
    phone_number: z.string().min(1, 'Número de telefone é obrigatório'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
    default_language: z.string().default('pt'),
    type: z.enum(['network', 'subnetwork', 'franchise']).default('network'),

    // Step 2: Brand Information,
    network_name: z.string().optional().nullable(),
    network_type: z.enum(['independent', 'franchise']).default('independent'),
    brand_color: z.string().optional(),
    brand_logo: z.any().optional(),

    // Step 3: Restaurants Information
    establishments: z
      .array(establishmentSchema)
      .min(1, 'Pelo menos um estabelecimento é necessário'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// Type pour les données du formulaire d'inscription
export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Schéma de validation pour la connexion
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
