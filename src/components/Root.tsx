import '../css/threader.css';
import { Outlet } from 'react-router-dom';

import LogIn from './LogIn';
import Menu from './Menu';

const Root = () => {
	return (
		<>
			<Menu />
			<Outlet />
			<LogIn />
		</>
	)

}

export default Root