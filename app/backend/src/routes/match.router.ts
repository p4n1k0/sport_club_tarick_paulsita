import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenValidate from '../utils/decodeToken';

const router = Router();

const matcheController = new MatchController();

router.get('/', (req, res) => matcheController.getInProgress(req, res));
router.post('/', tokenValidate, matcheController.create.bind(matcheController));
router.patch('/:id/finish', (req, res) => matcheController.update(req, res));
router.patch('/:id', (req, res) => matcheController.updateMatch(req, res));

export default router;
