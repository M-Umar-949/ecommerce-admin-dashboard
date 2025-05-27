const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;
const multer = require('multer');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Configure multer for file uploads to Vue's public directory
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const vuePublicPath = path.join(__dirname, 'frontend-public', 'products');

    try {
      await fs.mkdir(vuePublicPath, { recursive: true });
      cb(null, vuePublicPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPG, and JPEG files are allowed'));
    }
  }
});

// Path to inventory.json
const inventoryPath = path.join(__dirname, 'data', 'inventory.json');

// Helper function to read inventory data
const readInventory = async () => {
  try {
    const data = await fs.readFile(inventoryPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading inventory:', error);
    // Return empty structure if file doesn't exist
    return { products: [] };
  }
};

// Helper function to write inventory data
const writeInventory = async (data) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(inventoryPath);
    await fs.mkdir(dataDir, { recursive: true });
    
    await fs.writeFile(inventoryPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing inventory:', error);
    throw error;
  }
};

// Get all inventory items
app.get('/inventory', async (req, res) => {
  try {
    const inventory = await readInventory();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read inventory data' });
  }
});

// Add new product to inventory with image upload
app.post('/inventory', upload.single('image'), async (req, res) => {
  try {
    const newProduct = JSON.parse(req.body.productData || '{}');
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'price', 'current_stock', 'min_stock_level', 'reorder_quantity', 'supplier'];
    const missingFields = requiredFields.filter(field => !newProduct[field] && newProduct[field] !== 0);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }
    
    // Read current inventory
    const inventory = await readInventory();
    
    // Generate new product ID
    const newId = inventory.products.length > 0 
      ? Math.max(...inventory.products.map(p => p.id)) + 1 
      : 1;
    
    // Handle image URL - store relative path for Vue's public directory
    let imageUrl = '';
    if (req.file) {
      // Store path relative to Vue's public directory
      imageUrl = `/products/${req.file.filename}`;
    }
    
    // Create complete product object
    const product = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      current_stock: parseInt(newProduct.current_stock),
      min_stock_level: parseInt(newProduct.min_stock_level),
      reorder_quantity: parseInt(newProduct.reorder_quantity),
      supplier: newProduct.supplier,
      sales_velocity: parseFloat(newProduct.sales_velocity) || 1.0,
      image_url: imageUrl,
      status: newProduct.status || 'in_stock',
      last_restock_date: newProduct.last_restock_date || new Date().toISOString().split('T')[0],
      forecast_days_until_restock: newProduct.forecast_days_until_restock || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Add product to inventory
    inventory.products.push(product);
    
    // Write updated inventory
    await writeInventory(inventory);
    
    res.status(201).json({ 
      message: 'Product added successfully', 
      product 
    });
    
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product to inventory' });
  }
});

// Update existing product
app.put('/inventory/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updates = req.body;
    
    const inventory = await readInventory();
    const productIndex = inventory.products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Update product
    inventory.products[productIndex] = {
      ...inventory.products[productIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await writeInventory(inventory);
    
    res.json({ 
      message: 'Product updated successfully', 
      product: inventory.products[productIndex] 
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/inventory/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    const inventory = await readInventory();
    const productIndex = inventory.products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Remove product
    const deletedProduct = inventory.products.splice(productIndex, 1)[0];
    
    await writeInventory(inventory);
    
    res.json({ 
      message: 'Product deleted successfully', 
      product: deletedProduct 
    });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Inventory API endpoints:`);
  console.log(`  GET    /inventory     - Get all products`);
  console.log(`  POST   /inventory     - Add new product (with image upload)`);
  console.log(`  PUT    /inventory/:id - Update product`);
  console.log(`  DELETE /inventory/:id - Delete product`);
  console.log(`  GET    /health        - Health check`);
  console.log(`Images will be saved to Vue's public/products/ directory`);
});