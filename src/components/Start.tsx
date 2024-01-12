import { useText } from "../contexts/TextContext";
import { Link } from 'react-router-dom';

const Start = () => {
	const {t} = useText();
	return (
		<div className="start-page">
			<header>
				<h1>{t.frontPageTitle}</h1>
			</header>
			<div className="main-content front-page">
				<h2><Link to="/favstar">{t.floffStar}</Link></h2>
				<p>{t.floffStarDesc}</p>
				<h2><Link to="/thread">{t.createThread}</Link></h2>
				<p>{t.createThreadDesc}</p>
				<h2><Link to="/find-people">{t.findPeople}</Link></h2>
				<p>{t.findPeopleDesc}</p>
			</div>
		</div>
	)
} 

export default Start;