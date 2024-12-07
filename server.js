import express from 'express';
import cors from 'cors';
import { createServer } from 'vite';
import { queryEndpoints } from './src/utils/api.js';

const app = express();
app.use(cors());
app.use(express.json());

let currentConfig = { apiEndpoints: [] };

// Endpoint to update the current configuration
app.post('/api/config', (req, res) => {
  currentConfig = req.body;
  res.json({ message: 'Configuration updated successfully' });
});

// Endpoint to get responses from configured endpoints
app.get('/api/gateway', async (req, res) => {
  try {
    const response = await queryEndpoints(currentConfig.apiEndpoints);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Create Vite server in middleware mode
const vite = await createServer({
  server: { middlewareMode: true }
});

// Use Vite's connect instance as middleware
app.use(vite.middlewares);

const port = 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});