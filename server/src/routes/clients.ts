const { Router } = require("express");
const router = Router();

import { register, login } from '../controllers/clients';

router.post('/signUp/:businessId', (req: Request, res: Response, next: any) => {
    register(req, res, next);
});

router.get('/signIn/:businessId', (req: Request, res: Response, next: any) => {
    login(req, res, next);
});


export default router;