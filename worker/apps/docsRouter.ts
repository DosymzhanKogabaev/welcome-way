import { Router } from 'itty-router';
import apiRouter from './apiRouter';

const docsRouter = Router();

// Define available apps and their configurations
const API_APPS = {
  auth: {
    title: 'Welcome May - Auth API',
    description:
      'User authentication, registration, and profile management endpoints',
    icon: '🔐',
    pathPattern: '/api/auth/', // Routes starting with this pattern belong to auth
  },
  post: {
    title: 'Welcome May - Posts API',
    description:
      'Community posts management including creating, reading, and filtering help requests',
    icon: '📝',
    pathPattern: '/api/', // Routes starting with this pattern belong to posts (excluding auth)
  },
  // Add more apps here as needed
  // user: {
  //   title: "Welcome May - User API",
  //   description: "User profile and settings management",
  //   icon: "👤",
  //   pathPattern: "/api/user/",
  // },
};

// Cache for generated schemas
const schemaCache = new Map<string, any>();

// Generate OpenAPI schema for a specific app
async function generateAppSchema(appName: string): Promise<any> {
  if (schemaCache.has(appName)) {
    return schemaCache.get(appName);
  }

  const app = API_APPS[appName as keyof typeof API_APPS];
  if (!app) {
    throw new Error(`App ${appName} not found`);
  }

  try {
    // Get the complete OpenAPI schema from the main router
    const mockRequest = new Request(`http://localhost/openapi.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const schemaResponse = await apiRouter.fetch(
      mockRequest,
      {} as Env,
      {} as ExecutionContext
    );

    if (schemaResponse && schemaResponse.ok) {
      const completeSchema = await schemaResponse.json();

      // Filter the schema to only include routes for this app
      const filteredSchema = {
        ...completeSchema,
        info: {
          title: app.title,
          version: '1.0.0',
          description: app.description,
        },
        paths: filterPathsByApp(completeSchema.paths || {}, appName),
      };

      // Cache the filtered schema
      schemaCache.set(appName, filteredSchema);
      return filteredSchema;
    }
  } catch (error) {
    console.error('Error getting schema from main router:', error);
  }

  // Fallback to manual schema if extraction fails
  const fallbackSchema = {
    openapi: '3.0.0',
    info: {
      title: app.title,
      version: '1.0.0',
      description: app.description,
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT token (format: JWT {token})',
        },
      },
    },
    paths: {},
  };

  schemaCache.set(appName, fallbackSchema);
  return fallbackSchema;
}

// Filter paths based on the app
function filterPathsByApp(paths: any, appName: string): any {
  const app = API_APPS[appName as keyof typeof API_APPS];
  if (!app) return {};

  const filteredPaths: any = {};

  for (const [path, pathItem] of Object.entries(paths)) {
    if (appName === 'auth') {
      // For auth, include only auth-related paths
      if (path.includes('/auth/')) {
        filteredPaths[path] = pathItem;
      }
    } else if (appName === 'post') {
      // For posts, include post-related paths (excluding auth)
      if (
        path.includes('/posts') ||
        path.includes('/post') ||
        path.includes('/create-post')
      ) {
        filteredPaths[path] = pathItem;
      }
    }
    // Add more app-specific filtering logic here as needed
  }

  return filteredPaths;
}

// Main documentation page
docsRouter.get('/docs', (_request: Request) => {
  const html = generateMainDocsPage();
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
});

// Dynamic OpenAPI schema endpoint
docsRouter.get('/docs/:app/openapi.json', async (request: Request) => {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/');
  const appName = pathSegments[2]; // /docs/{app}/openapi.json

  try {
    const schema = await generateAppSchema(appName);

    return new Response(JSON.stringify(schema, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating OpenAPI schema:', error);
    return new Response(
      JSON.stringify({ error: `App '${appName}' not found` }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

// Dynamic Swagger UI endpoint
docsRouter.get('/docs/:app', (request: Request) => {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/');
  const appName = pathSegments[2]; // /docs/{app}

  const app = API_APPS[appName as keyof typeof API_APPS];
  if (!app) {
    return new Response('App not found', { status: 404 });
  }

  const html = generateSwaggerUI(app.title, `/docs/${appName}/openapi.json`);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
});

// Generate main docs page
function generateMainDocsPage(): string {
  const appSections = Object.entries(API_APPS)
    .map(
      ([appName, app]) => `
    <div class="api-section">
      <h2>${app.icon} ${app.title.replace('Welcome May - ', '')}</h2>
      <p class="description">${app.description}</p>
      <a href="/docs/${appName}" class="api-link">View ${
        appName.charAt(0).toUpperCase() + appName.slice(1)
      } Documentation</a>
      <a href="/docs/${appName}/openapi.json" class="api-link">OpenAPI Schema</a>
    </div>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome May - API Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .api-section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #e1e8ed;
            border-radius: 6px;
        }
        .api-section h2 {
            color: #34495e;
            margin-top: 0;
        }
        .api-link {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-right: 10px;
            margin-bottom: 10px;
            transition: background-color 0.2s;
        }
        .api-link:hover {
            background: #0056b3;
        }
        .description {
            margin: 15px 0;
            color: #6c757d;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e1e8ed;
            color: #6c757d;
        }
        .stats {
            text-align: center;
            margin-bottom: 20px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome May - API Documentation</h1>
        <div class="stats">
            <p>Available APIs: ${Object.keys(API_APPS).length}</p>
        </div>
        
        ${appSections}

        <div class="footer">
            <p>Welcome May Community Platform API v1.0.0</p>
        </div>
    </div>
</body>
</html>`;
}

// Generate Swagger UI HTML
function generateSwaggerUI(title: string, specUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .swagger-ui .topbar {
            display: none;
        }
        .back-link {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1000;
            padding: 8px 16px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
        }
        .back-link:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <a href="/docs" class="back-link">← Back to API Docs</a>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            SwaggerUIBundle({
                url: '${specUrl}',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                tryItOutEnabled: true,
                requestInterceptor: (request) => {
                    // Add authorization header if available
                    const token = localStorage.getItem('jwt_token');
                    if (token) {
                        request.headers.Authorization = 'JWT ' + token;
                    }
                    return request;
                }
            });
        }
    </script>
</body>
</html>`;
}

export default docsRouter;
