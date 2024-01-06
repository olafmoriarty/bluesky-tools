import {useState, useRef} from 'react';
import { useAgent } from "../contexts/AgentContext";
import { useText } from "../contexts/TextContext";

const FindPeople = () => {
	const { agent, isLoggedIn, handle, dialogRef } = useAgent();
	const {t} = useText();
	if (!agent) {
		return;
	}

	const [loaded, setLoaded] = useState(false);
	
	const loadFollowers = () => {
		setLoaded(true);
		getFollowingFollowing(handle);
	}

	const [suggestionBox, setSuggestionBox] = useState({} as {
		[key : string] : number,
	});

	const peopleDataRef = useRef({} as {
		[key : string] : {displayName : string | undefined,
		avatar : string | undefined, handle : string, did : string}
	});

	const getFollowing = async (actor : string) => {
		let cursor;
		let following : {handle : string, displayName : string | undefined, avatar : string | undefined, did : string}[] = [];
		do {
			const result = await agent.getFollows({
				actor: actor,
				cursor: cursor,
			});
			cursor = result.data.cursor;
			const addOn = result.data.follows.map(el => {
				const returnValue = {handle: '', avatar: '' as string | undefined, displayName: '' as string | undefined, did: ''};
				returnValue.handle = el.handle;
				returnValue.avatar = el.avatar;
				returnValue.displayName = el.displayName || el.handle;
				returnValue.did = el.did;
				return returnValue;
			});
			following = following.concat(addOn);

		} while (cursor);
		return following;
	}

	const getFollowingFollowing = async (actor : string) => {
		if (!isLoggedIn) {
			return;	
		}

		const following = await getFollowing(actor);
		let followersFollowing : { [key : string] : number } = {};
		following.forEach(async (el) => {
			const actorFollowing = await getFollowing(el.handle);
			actorFollowing.forEach(person => {
				if (!following.map(el => el.handle).includes(person.handle) && person.handle !== actor) {
					if (followersFollowing[person.handle]) {
						followersFollowing[person.handle]++;
					}
					else {
						followersFollowing[person.handle] = 1;
					}
					const newSuggestionBox = { ...followersFollowing };
					setSuggestionBox(newSuggestionBox);
					if (!peopleDataRef.current[person.handle]) {
						peopleDataRef.current[person.handle] = person;
					}
				}
			});
		});
	}

	let content;

	if (!isLoggedIn) {
		content = <button onClick={() => dialogRef.current?.showModal()} className="post-button">{t.logInToGetSuggestions}</button>;
	}

	else if (!loaded) {
		content = <button onClick={loadFollowers} className="post-button">{t.getSuggestions}</button>;
	}

	else {
		content = <div>{Object.keys(suggestionBox).length === 0 ? <p>{t.loadingSuggestions}</p> : Object.keys(suggestionBox).sort((a, b) => {
			if (suggestionBox[a] < suggestionBox[b]) {
				return 1;
			}
			if (suggestionBox[a] > suggestionBox[b]) {
				return -1;
			}
			return 0;
		}).slice(0, 100).map(el => <article className="person" key={el}>
			{peopleDataRef.current[el].avatar ? <p className="avatar"><img src={peopleDataRef.current[el].avatar} alt={peopleDataRef.current[el].displayName || ''} /></p> : <p className="avatar"></p>}
			<div className="main-part">
				<h2>{peopleDataRef.current[el].displayName || el}</h2>
				<p className="handle"><a href={`https://bsky.app/profile/${el}`} target="_blank" rel="noopener">{el}</a></p>
				<p className="followers">{t.followedByXPeopleYouFollow.replace('{x}', suggestionBox[el].toString() )}</p>
			</div>
			<p className="follow-button"><button onClick={async (event) => {
				event.currentTarget.disabled = true;
				let newSuggestionBox = { ...suggestionBox };
				delete(newSuggestionBox[el]);
				await agent.follow(peopleDataRef.current[el].did);
				setSuggestionBox(newSuggestionBox);
			}}>{t.follow}</button></p>
		</article>)}</div>
	}

	return (
		<main className="find-people">
			<header>
				<h1>{t.findPeople}</h1>
			</header>
			<section className="main-content">
				{content}
			</section>
		</main>
	)
}

export default FindPeople;