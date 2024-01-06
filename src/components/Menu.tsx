import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useText } from '../contexts/TextContext';

const Menu = () => {
	const {t} = useText();
	const [show, setShow] = useState(false);
	
	return (
		<>
		<button onClick={() => setShow(true)} className={`menu-button ${show ? 'hidden' : 'visible'}`}>{t.showMenu}</button>
		<nav className={`main-menu ${show ? 'visible' : 'hidden'}`}>
			<ul>
				<li><NavLink to="/thread">{t.menuThread}</NavLink></li>
				<li><NavLink to="/find-people">{t.menuPeople}</NavLink></li>
				<li className="hide-menu"><button onClick={() => setShow(false)}>{t.hideMenu}</button></li>
			</ul>
		</nav>
		</>
	)
}

export default Menu;