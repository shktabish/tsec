import { Router } from 'express';
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from '../controllers/tutoringSession.controller.js';

const tutoringSessionRouter = Router();

// Tutoring Session Routes
tutoringSessionRouter.post('/', createSession); // Create a new tutoring session
tutoringSessionRouter.get('/', getAllSessions); // Get all tutoring sessions
tutoringSessionRouter.get('/:id', getSessionById); // Get tutoring session by ID
tutoringSessionRouter.put('/:id', updateSession); // Update tutoring session by ID
tutoringSessionRouter.delete('/:id', deleteSession); // Delete tutoring session by ID

export default tutoringSessionRouter;
