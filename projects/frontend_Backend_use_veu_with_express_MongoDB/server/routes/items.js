import { Router } from 'express';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { itemSchema } from '../utils/validators.js';

const router = Router();

router.use(protect);

router.route('/').get(getItems).post(validate(itemSchema), createItem);
router.route('/:id').put(validate(itemSchema), updateItem).delete(deleteItem);

export default router;
