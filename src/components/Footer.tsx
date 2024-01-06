import { useText } from "../contexts/TextContext";

const Footer = () => {
	const {t} = useText();

	return (
		<footer>
			<a href="https://bsky.app/profile/olafmoriarty.bsky.social" target="_blank">@olafmoriarty.bsky.social</a>
			<a href="https://github.com/olafmoriarty/bluesky-tools" target="_blank">{t.github}</a>
		</footer>
	)
}

export default Footer;