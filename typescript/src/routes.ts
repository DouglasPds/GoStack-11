import { Request, Response } from 'express';
import CreateUser from './createUser';

export default function hello(request: Request, response: Response) {
  const user = CreateUser({
    name: 'Nome', 
    email: 'douglas17dd', 
    password: '12345',
    techs: ['React', 'React-Native', { title: 'JavaScript', experience: 100 }]
  });

  return response.json({ message: 'Hello World!' });
}