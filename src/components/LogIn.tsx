import { useState } from 'react';
import { useAgent } from '../contexts/AgentContext';
import { useText } from '../contexts/TextContext';

const LogIn = () => {

	const { agent, dialogRef, setIsLoggedIn, setHandle } = useAgent();
	const {t} = useText();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);

	const tryLoggingIn = async (ev : React.FormEvent<HTMLFormElement>) => {

		ev.preventDefault();

		if (!agent) {
			return;
		}

		try {
			const identifier = username.substring(0, 1) === '@' ? username.substring(1) : username;
			const login = await agent.login({
				identifier: identifier,
				password: password,
			});
			console.log(login);
			
			// Session management may be added later
			// const session = await agent.session;
			
			setHandle(login.data.handle);
			dialogRef.current?.close();
			setIsLoggedIn(true);
		} catch (error) {
			setLoginError(true);
		}		
	}


	return (
		<dialog ref={dialogRef}>
			<form onSubmit={tryLoggingIn}>
				<h2>{t.logIn}</h2>
				{loginError ? <p className="error">{t.logInErrorMessage}</p> : null}
				<label htmlFor='username'>{t.username}</label>
				<input id="username" type="text" placeholder={t.exampleIdentifier} value={username} onChange={(ev) => setUsername(ev.target.value)} />
				<label htmlFor='password'>{t.appPassword}</label>
				<input id="password" type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
				<button>{t.logIn}</button>
			</form> 
		</dialog>
	)
}

export default LogIn;