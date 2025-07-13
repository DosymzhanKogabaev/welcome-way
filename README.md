# WelcomeWay

A community platform connecting newcomers and locals to facilitate smooth
integration and mutual support. WelcomeWay enables users to ask for help, offer
assistance, and build meaningful connections within their communities.

## 🌟 Features

### User Management

- **Authentication System**: Secure JWT-based authentication with access/refresh
  tokens
- **User Profiles**: Customizable profiles with avatars, location, and
  reputation system
- **Role-based Access**: Support for newcomers and locals with different
  capabilities
- **Multi-language Support**: Available in English, German, and Russian

### Community Features

- **Help Requests**: Users can post requests for assistance
- **Offer Help**: Community members can offer support and services
- **Post Management**: Create, edit, and delete community posts
- **User Discovery**: View other users' profiles and contributions
- **Reputation System**: Track user contributions and build trust

### Technical Features

- **Real-time Updates**: Dynamic content loading and updates
- **File Upload**: Avatar and document upload capabilities
- **Responsive Design**: Mobile-first responsive interface
- **Protected Routes**: Secure access control for authenticated users
- **API Documentation**: Comprehensive Swagger documentation

## 🏗️ Architecture

### Frontend

- **React 19** with TypeScript for type safety
- **Redux Toolkit** for state management
- **React Router** for navigation and protected routes
- **CSS Modules** for component styling
- **Vite** for fast development and building
- **i18next** for internationalization

### Backend

- **Cloudflare Workers** for serverless API endpoints
- **D1 Database** (SQLite) for data persistence
- **R2 Storage** for file uploads and static assets
- **Drizzle ORM** for database operations
- **JWT Authentication** with token refresh mechanism
- **OpenAPI/Swagger** for API documentation

### Infrastructure

- **Cloudflare Pages** for frontend deployment
- **Cloudflare Workers** for backend API
- **CI/CD Pipeline** with automated deployments
- **Edge Network** for global performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/welcome-way.git
   cd welcome-way
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** Create a `.env` file in the root directory:

   ```env
   JWT_SECRET_TOKEN=your-secret-key
   ACCESS_TOKEN_EXPIRES_IN=3600
   REFRESH_TOKEN_EXPIRES_IN=604800
   ```

4. **Set up Cloudflare Workers**

   ```bash
   npx wrangler login
   npx wrangler d1 create welcome-way-db
   npx wrangler r2 bucket create avatars-bucket
   ```

5. **Run database migrations**

   ```bash
   npx wrangler d1 migrations apply welcome-way-db
   ```

6. **Start development server**
   ```bash
   npm run fdev  # Frontend only
   npm run dev   # Full stack with Workers
   ```

## 📝 Scripts

- `npm run fdev` - Start frontend development server
- `npm run dev` - Start Cloudflare Workers development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare
- `npm run lint` - Run ESLint

## 🔧 API Documentation

The API documentation is available at `/docs` when running the development
server. Key endpoints include:

### Authentication

- `POST /api/private/auth/register` - User registration
- `POST /api/private/auth/login` - User login
- `POST /api/private/auth/refresh` - Refresh access token
- `GET /api/private/auth/me` - Get current user info

### Users

- `GET /api/public/users/:id` - Get public user information
- `POST /api/private/auth/upload-avatar` - Upload user avatar

### Posts

- `GET /api/public/posts` - Get all posts
- `POST /api/private/create-post` - Create new post
- `PUT /api/private/posts/:id` - Update post
- `DELETE /api/private/posts/:id` - Delete post

## 🗄️ Database Schema

The project uses Drizzle ORM with the following main tables:

- `users` - User profiles and authentication
- `posts` - Community posts and help requests

## 🎨 UI Components

### Pages

- **HomePage**: Landing page with features and testimonials
- **ProfilePage**: User profiles with posts and information
- **SignIn/SignUp**: Authentication pages
- **AskingForHelp/OfferingHelp**: Community interaction pages

### Components

- **ProtectedRoute**: Authentication guard for protected pages
- **AppHeader**: Navigation header for authenticated users
- **PostsList**: Display and manage community posts
- **ProfileSidebar**: User profile navigation

## 🌍 Internationalization

The project supports multiple languages:

- English (default)
- German
- Russian

Language files are located in `src/i18n/locales/`.

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Client-side route protection
- **Input Validation**: Zod schema validation
- **Error Handling**: Comprehensive error handling and logging
- **CORS Configuration**: Proper cross-origin resource sharing

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Production Deployment

```bash
npm run build
npm run deploy
```

### Environment Setup

Configure the following in Cloudflare Workers:

- D1 Database binding
- R2 Storage binding
- Environment variables for JWT secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Backend & Infrastructure**: Full-stack architecture, API development, and
  deployment pipeline
- **Frontend Design**: UI/UX design and component layouts

---

**WelcomeWay** - Building bridges, not walls. 🌉
