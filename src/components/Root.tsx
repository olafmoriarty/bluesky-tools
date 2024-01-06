import '../css/threader.css';
import { Outlet } from 'react-router-dom';

import LogIn from './LogIn';
import Menu from './Menu';
import Footer from './Footer';

const Root = () => {
	return (
		<>
			<Menu />
			<Outlet />
			<Footer />
			<LogIn />
		</>
	)

}

export default Root