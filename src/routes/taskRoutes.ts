import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

// All task routes require authentication
router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;