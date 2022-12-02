import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

router.get('/validate', (req, res) => userController.loginValidate(req, res));
router.post('/', (req, res) => userController.login(req, res));

export default router;
