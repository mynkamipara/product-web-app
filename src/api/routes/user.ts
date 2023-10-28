import { Router, Request, Response } from 'express';
import { UserController } from '../../controller/user.controller';

import { validateRequest } from '../../middleware/validation';
import { createUser } from '../../schema/user';
import { isAuth } from '../../middleware/auth'

const route = Router();

export default (app: Router) => {
	app.use('/user', route);

	route.post('/signup', validateRequest(createUser), createUserAPI);
	route.post('/login', loginUserAPI);
	route.get('/protected', isAuth, protectedAPI);
};

async function createUserAPI(req: Request, res: Response) {
	const data = req.body;
	UserController.SignUpUser(data)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

async function loginUserAPI(req: Request, res: Response) {
	const data = req.body;
	UserController.logInUser(data)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

async function protectedAPI(req: Request, res: Response) {
	UserController.protectedRoute()
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}