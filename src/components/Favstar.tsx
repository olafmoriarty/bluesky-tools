import {useState } from 'react';
import { useAgent } from "../contexts/AgentContext";
import { useText } from "../contexts/TextContext";
import Floff, { BskyPost } from './Floff';

const Favstar = () => {
	const { agent, isLoggedIn, handle, dialogRef } = useAgent();
	const {t} = useText();
	const [postList, setPostList] = useState([] as BskyPost[]);
	const [userHandle, setUserHandle] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [loadingError, setLoadingError] = useState(false);
	const [loaded, setLoaded] = useState(0);
	if (!agent) {
		return;
	}

	const getAuthorPosts = async (ev : React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		setIsLoading(true);
		setLoadingError(false);
		setLoaded(0);

		try {

			let cursor;
			let posts = [] as BskyPost[];

			do {
				const timeline = await agent.getAuthorFeed({actor: userHandle.trim(), cursor: cursor });
				posts = posts.concat(timeline.data.feed.filter(el => !el.reason && el.post.likeCount));
				cursor = timeline.data.cursor;
				setLoaded(posts.length);
			} while (cursor);
			const postList = posts
				.sort( (a, b) => (a.post.likeCount || 0) < (b.post.likeCount || 0) ? 1 : -1)
				.slice(0, 20);
			setPostList(postList);
			setIsLoading(false);
		}
		catch {
			setLoadingError(true);
			setIsLoading(false);
		}
	}

	if (!isLoggedIn) {
		return (
			<main className="find-people">
				<header>
					<h1>{t.floffStar}</h1>
				</header>
				<section className="main-content">
					<button onClick={() => dialogRef.current?.showModal()} className="post-button">{t.logInToGetSuggestions}</button>
				</section>
			</main>
		)
		}

	return (
		<main className="favstar">
			<header>
				<h1>{t.floffStar}</h1>
			</header>
			<div className="wrapper">
			<section className="favstar-input">
				<form onSubmit={ev => getAuthorPosts(ev)}>
					<label>Vis dei tjue beste floffane til ...</label>
					<input type="text" name="handle-input" placeholder={handle} value={userHandle} onChange={(ev) => setUserHandle(ev.target.value)} />
					<button type="submit">Generer toppliste</button>

				</form>
			</section>
			{loadingError ? <p className="error">{t.loadErrorMessage}</p> : null}
			{isLoading 
			? 
			<p className="load-posts">{t.postsLoaded.replace('{n}', loaded.toString())}</p>
			: 
			null}
			<section>
				{postList.map(el => <Floff feedPost={el} key={el.post.cid} />)}
			</section>
			</div>
		</main>
	)
}

export default Favstar;