import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background } from './styles';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useAuth();

	const handleSubmit = useCallback(
		async (data: SignInFormData) => {
			try {
				const schema = Yup.object().shape({
					email: Yup.string()
						.required('E-mail obrigatório')
						.email('Insira um email válido'),
					password: Yup.string().required('Senha obrigatória'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				signIn({
					email: data.email,
					password: data.password,
				});
			} catch (err) {
				console.log(err);
				const errors = getValidationErrors(err);
				formRef.current?.setErrors(errors);
			}
		},
		[signIn],
	);

	return (
		<Container>
			<Content>
				<img src={logoImg} alt="Gobarber" />

				<Form ref={formRef} onSubmit={handleSubmit}>
					<h1>Faça seu logon</h1>
					<Input name="email" icon={FiMail} placeholder="E-mail" />
					<Input
						name="password"
						icon={FiLock}
						type="password"
						placeholder="Senha"
					/>
					<Button type="submit">Entrar</Button>
					<a href="forgot">Esqueci minha senha</a>
				</Form>

				<a href="/">
					<FiLogIn />
					Criar conta
				</a>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
