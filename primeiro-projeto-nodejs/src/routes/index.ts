import Router from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
	const { name, email } = request.body;

	const user = {
		name,
		email,
	};

	return response.json(user);
});

const a = { name: 'aaa', kk: 'sdfj' };

export default routes;
