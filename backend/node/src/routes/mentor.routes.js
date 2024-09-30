import { Router } from 'express';
import {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor
 
} from '../controllers/mentor.controllers.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const mentorRouter = Router();

// Mentor Routes
mentorRouter.post('/', verifyJWT, createMentor);                   // Create a new mentor profile
mentorRouter.get('/', getAllMentors);                              // Get all mentor profiles
mentorRouter.get('/:id', getMentorById);                           // Get a mentor profile by ID
mentorRouter.put('/:id', verifyJWT, updateMentor);                 // Update a mentor profile by ID
mentorRouter.delete('/:id', verifyJWT, deleteMentor); 

export default mentorRouter;