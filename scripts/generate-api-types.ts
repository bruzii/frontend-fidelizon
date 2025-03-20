import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { createGenerator } from '@hey-api/openapi-ts';
import * as process from 'process';

async function generateApiTypes() {
  try {
    // URL de la spécification OpenAPI de l'API NestJS
    const apiUrl = process.env.API_URL || 'http://localhost:3000/api-docs-json';

    console.log(`Generating types from OpenAPI spec at: ${apiUrl}`);

    // Créer un générateur
    const generator = createGenerator({
      input: {
        from: {
          source: 'url',
          url: apiUrl,
        },
      },
      output: {
        to: 'string',
      },
    });

    // Générer les types
    const { files } = await generator.generate();

    // Créer les répertoires si nécessaire
    const modelsDir = join(process.cwd(), 'src', 'types', 'api', 'models');
    const endpointsDir = join(process.cwd(), 'src', 'types', 'api', 'endpoints');

    await mkdir(modelsDir, { recursive: true });
    await mkdir(endpointsDir, { recursive: true });

    // Extraire le contenu des fichiers générés
    const modelsContent = files.find(f => f.name === 'models.ts')?.content || '';
    const endpointsContent = files.find(f => f.name === 'endpoints.ts')?.content || '';

    // Écrire les types des modèles
    await writeFile(join(modelsDir, 'index.ts'), modelsContent);

    // Écrire les types des endpoints
    await writeFile(join(endpointsDir, 'index.ts'), endpointsContent);

    // Créer un fichier d'index principal pour re-exporter tous les types
    await writeFile(
      join(process.cwd(), 'src', 'types', 'api', 'index.ts'),
      `// Auto-generated types from OpenAPI spec
export * from './models';
export * from './endpoints';
`
    );

    console.log('API types generated successfully');
  } catch (error) {
    console.error('Error generating API types:', error);
    process.exit(1);
  }
}

// Exécuter la fonction
generateApiTypes();
