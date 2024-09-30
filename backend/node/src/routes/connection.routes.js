import { Router } from 'express';
import {
  createConnection,
  getAllConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
} from '../controllers/connection.controller.js';

const connectionRouter = Router();

// Mentor-Student Connection Routes
connectionRouter.post('/', createConnection); // Create a new connection
connectionRouter.get('/', getAllConnections); // Get all connections
connectionRouter.get('/:id', getConnectionById); // Get connection by ID
connectionRouter.put('/:id', updateConnection); // Update connection by ID
connectionRouter.delete('/:id', deleteConnection); // Delete connection by ID

export default connectionRouter;
