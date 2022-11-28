import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const loginController = new UserController();

router.get('/validate', (req, res) => loginController.loginValidate(req, res));
router.post('/', (req, res) => loginController.login(req, res));

export default router;
