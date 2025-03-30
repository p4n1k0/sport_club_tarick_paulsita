import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/teams', (req, res) => teamController.getAll(req, res));
router.get('/teams/:id', (req, res) => teamController.getById(req, res));

export default router;
