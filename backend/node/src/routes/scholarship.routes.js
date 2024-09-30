import { Router } from 'express';
import {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} from '../controllers/scholarship.controller.js';

const scholarshipRouter = Router();

// Scholarship Routes
scholarshipRouter.post('/', createScholarship); // Create a new scholarship
scholarshipRouter.get('/', getAllScholarships); // Get all scholarships
scholarshipRouter.get('/:id', getScholarshipById); // Get scholarship by ID
scholarshipRouter.put('/:id', updateScholarship); // Update scholarship by ID
scholarshipRouter.delete('/:id', deleteScholarship); // Delete scholarship by ID

export default scholarshipRouter;
