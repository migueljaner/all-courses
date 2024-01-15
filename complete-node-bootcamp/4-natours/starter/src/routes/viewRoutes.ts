import express from 'express';
import * as viewsController from '../controllers/viewsController';
import * as authController from '../controllers/authController';
const router = express.Router();

// 3) Routes
router.use(authController.isLoggedIn);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

export default router;
