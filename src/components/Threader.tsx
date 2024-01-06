import { useState } from 'react';
import parseText from '../functions/parseText';
import postThread from '../functions/postThread';
import { useAgent } from '../contexts/AgentContext';
import { useText } from '../contexts/TextContext';

const Threader = () => {
	const { agent, isLoggedIn, dialogRef } = useAgent();
	const {t} = useText();
	const [fullText, setFullText] = useState('');
	const [parsedText, setParsedText] = useState([] as string[]);

	if (!agent) {
		return;
	}

	const changeFullText = (ev : React.FormEvent<HTMLTextAreaElement>) => {
		const text = ev.currentTarget.value;
		setFullText(text);
		setParsedText(parseText(text));
	}

	const buttonClick = () => {
		if (!agent) {
			return;
		}
		postThread( agent, parsedText )
		.then(() => {
			setFullText("");
			setParsedText([]);
		});
	}

	return(
		<main className="threader">
			<header>
				<h1>{t.createThread}</h1>
			</header>
			<div className="wrapper">
				<section className="editor-box">
					<h2>{t.writeTextHere}</h2>
					<textarea value={fullText} onChange={changeFullText} />
					{
						!isLoggedIn 
						? 
						<button onClick={() => dialogRef.current?.showModal()} className="post-button">{t.logInToPostThread}</button> 
						: 
						(
							parsedText.length 
							? 
							<button onClick={buttonClick} className="post-button">{t.postThread}</button>
							: 
							null
						)
					}
				</section>
				<section className="result-box">
					<h2>{t.preview}</h2>
					{parsedText.length 
					? 
					parsedText.map((el, index) => <div className="article-wrapper" key={index + 1}><article>{el}</article><p className="article-meta">{el.length} {t.characters}</p>
					</div>)
					: 
					(fullText.length > 99 ? <p>{t.max99Posts}</p> : <p>{t.previewIsShownHere}</p>)}
				</section>
			</div>

		</main>		
	)
}

export default Threader;