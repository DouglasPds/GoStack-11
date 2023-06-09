import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Background, Content } from './styles';

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
		try {
			formRef.current?.setErrors({});
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string()
					.required('E-mail obrigatório')
					.email('Insira um email válido'),
				password: Yup.string().min(6, 'No mínimo 6 dígitos'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});
		} catch (err) {
			console.log(err.inner);
			const errors = getValidationErrors(err);
			formRef.current?.setErrors(errors);
		}
	}, []);

	return (
		<Container>
			<Background />

			<Content>
				<img src={logoImg} alt="GoBarber" />

				<Form ref={formRef} onSubmit={handleSubmit}>
					<h1>Faça seu cadastro</h1>

					<Input name="name" icon={FiUser} placeholder="Nome" />
					<Input name="email" icon={FiMail} placeholder="E-mail" />
					<Input
						name="password"
						icon={FiLock}
						type="password"
						placeholder="Senha"
					/>

					<Button type="submit">Cadastrar</Button>
				</Form>

				<a href="/">
					<FiArrowLeft />
					Voltar para logon
				</a>
			</Content>
		</Container>
	);
};

export default SignUp;
