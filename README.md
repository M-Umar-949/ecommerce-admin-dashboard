# Forsit Task - Ecommerce Admin Dashboard

This is a containerized Vue.js-based Ecommerce Admin Dashboard project with a Node.js backend for handling API requests and image uploads.

## 🚀 Project Features

- **Frontend**: Built with **Vue.js 3** with modern UI components
- **Backend**: **Node.js/Express** API server with file upload capabilities
- **Image Management**: Supports **image uploads** with file storage
- **Dockerized**: Complete **Docker Compose** setup for easy deployment
- **Environment Configuration**: Configurable **API base URLs** via environment variables
- **Production Ready**: Optimized for both development and production environments

---

## 📋 Prerequisites

### For Docker Setup (Recommended):
- Docker (version 20.10+)
- Docker Compose (version 2.0+)

### For Manual Setup:
- Node.js (version 16+ recommended)
- npm (comes with Node.js)

---

## 🐳 Quick Start with Docker (Recommended)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ecommerce-admin-dashboard
```

### 2. Run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### 4. Stop the Application
```bash
docker-compose down
```

---

## 🔧 Manual Setup (Without Docker)

If you prefer to run the application manually without containers:

### Prerequisites Check
```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version
```

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ecommerce-admin-dashboard
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create uploads directory (if not exists)
mkdir -p uploads
mkdir -p ../public/products

# Start the backend server
node server.js

# Backend will be running on http://localhost:5000
```

**Backend Environment Variables** (optional):
```bash
# Create .env file in backend directory
PORT=5000
NODE_ENV=development
UPLOAD_DIR=../public/products
```

### 3. Frontend Setup (New Terminal)
```bash
# Navigate to project root (where package.json is)
cd /path/to/ecommerce-admin-dashboard

# Install frontend dependencies
npm install

# Start the development server
npm run serve

# Frontend will be running on http://localhost:3000
```

**Frontend Environment Variables** (optional):
```bash
# Create .env file in project root
VUE_APP_API_URL=http://localhost:5000
```

### 4. Verify Setup
Open these URLs in your browser:
- **Frontend**: http://localhost:3000
- **Backend Health**: http://localhost:5000/health
- **API Endpoints**: http://localhost:5000/inventory

---

## 📚 API Endpoints

### Backend API Routes:
```
GET    /health                    - Health check
GET    /inventory                 - Get all products
POST   /inventory                 - Add new product (with image upload)
PUT    /inventory/:id             - Update existing product
DELETE /inventory/:id             - Delete product
```

### Example API Usage:
```bash
# Health check
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/inventory

# Add new product (with image)
curl -X POST http://localhost:5000/inventory \
  -F "name=Sample Product" \
  -F "price=99.99" \
  -F "stock=10" \
  -F "image=@/path/to/image.jpg"
```

---

## 🗂 Project Structure

```
ecommerce-admin-dashboard/
├── backend/                    # Node.js backend
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── uploads/               # Uploaded files storage
│   └── Dockerfile             # Backend Docker config
├── src/                       # Vue.js frontend source
│   ├── components/            # Vue components
│   ├── views/                 # Vue pages/views
│   └── main.js               # Frontend entry point
├── public/                    # Static files
│   └── products/             # Product images
├── package.json              # Frontend dependencies
├── Dockerfile                # Frontend Docker config
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

---

## 🔧 Development Commands

### Docker Commands:
```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs
docker-compose logs backend
docker-compose logs frontend

# Stop containers
docker-compose down

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

### Manual Development Commands:

**Backend:**
```bash
cd backend
npm install              # Install dependencies
npm start               # Start server (if script exists)
node server.js          # Start server directly
npm run dev             # Start with nodemon (if configured)
```

**Frontend:**
```bash
npm install             # Install dependencies
npm run serve           # Start development server
npm run build           # Build for production
npm run lint            # Run linter
```

---

## 🌍 Production Deployment

### Docker Production:
```bash
# Use production docker-compose file (if exists)
docker-compose -f docker-compose.prod.yml up -d

# Or modify environment variables
export NODE_ENV=production
export VUE_APP_API_URL=http://your-domain.com:5000
docker-compose up -d
```

### Manual Production:
```bash
# Backend
cd backend
npm install --production
NODE_ENV=production node server.js

# Frontend
npm run build
# Serve the dist/ folder with nginx or Apache
```

---

## 🛠 Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill processes on ports 3000/5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Permission issues with uploads:**
```bash
# Fix upload directory permissions
chmod 755 backend/uploads
chmod 755 public/products
```

**CORS issues:**
- Ensure backend CORS is configured for frontend URL
- Check if API_URL environment variable is set correctly

**Docker issues:**
```bash
# Clean up Docker
docker system prune
docker-compose down --volumes

# Rebuild from scratch
docker-compose build --no-cache
```

### Debug Commands:
```bash
# Check if services are running
curl http://localhost:5000/health
curl http://localhost:3000

# Check processes
ps aux | grep node
netstat -tlnp | grep -E ':3000|:5000'
```

---

## 🔐 Environment Variables

### Backend (.env in backend/):
```env
PORT=5000
NODE_ENV=development
UPLOAD_DIR=../public/products
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env in root/):
```env
VUE_APP_API_URL=http://localhost:5000
VUE_APP_UPLOAD_URL=http://localhost:5000/uploads
```

---

## 📦 Dependencies

### Backend Dependencies:
- express - Web framework
- multer - File upload handling
- cors - Cross-origin resource sharing
- path - File path utilities

### Frontend Dependencies:
- vue - Vue.js framework
- axios - HTTP client
- vue-router - Routing (if used)
- Additional UI libraries as needed

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -m 'Add some feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the logs: `docker-compose logs` or check console output
3. Ensure all prerequisites are installed
4. Verify ports 3000 and 5000 are available