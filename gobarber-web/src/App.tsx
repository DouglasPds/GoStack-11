import React from 'react';

import ToastComponent from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
	return (
		<>
			<AuthProvider>
				<SignIn />
			</AuthProvider>
			<ToastComponent />
			<GlobalStyle />
		</>
	);
};

export default App;
