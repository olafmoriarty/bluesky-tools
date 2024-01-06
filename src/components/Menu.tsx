import { NavLink } from 'react-router-dom';
import { useText } from '../contexts/TextContext';

const Menu = () => {
	const {t} = useText();
	return (
		<nav className="main-menu">
			<ul>
				<li><NavLink to="/thread">{t.menuThread}</NavLink></li>
				<li><NavLink to="/find-people">{t.menuPeople}</NavLink></li>
			</ul>
		</nav>
	)
}

export default Menu;