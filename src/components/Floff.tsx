import { useState } from 'react';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { useAgent } from '../contexts/AgentContext';
import { useText } from '../contexts/TextContext';

const formatDate = (date : string) => `${date.substring(8, 10)}.${date.substring(5,7)}.${date.substring(0, 4)}, ${date.substring(11, 13)}:${date.substring(14, 16)}`;

const Floff = (props : { feedPost : BskyPost }) => {
	const el = props.feedPost;
	const {agent, handle} = useAgent();
	const {t} = useText();
	const [liked, setLiked] = useState(false);
	const [reposted, setReposted] = useState(false);

	const likePost = async () => {
		try {
			await agent?.like(el.post.uri, el.post.cid);
		}
		catch {

		}
		finally {
			setLiked(true);
		}

	}

	const repostPost = async () => {
		try {
			await agent?.repost(el.post.uri, el.post.cid);
		}
		catch {

		}
		finally {
			setReposted(true);
		}

	}


	const text = el.post.record && el.post.record.text ? el.post.record.text : (el.post.value && typeof el.post.value === 'object' && 'text' in el.post.value && typeof el.post.value.text === 'string' ? el.post.value.text : 'Klarte ikkje å laste innlegg.')
	return (
		<article className="floff">
			{el.reply && el.reply.parent.author && typeof el.reply.parent.author === 'object' && "displayName" in el.reply.parent.author ? <p className="reply-to">Reply to {typeof el.reply.parent.author.displayName === "string" ? el.reply.parent.author.displayName : ""}</p> : null}

			{el.post.author && el.post.author.handle ? <div className="floff-header">
			<p className="floff-date"><a href={`https://bsky.app/profile/${el.post.author.handle}/post/${el.post.uri.substring(5).split('/')[2]}`} target="_blank">{formatDate(el.post.indexedAt)}</a></p>
			<p className="floff-author">{el.post.author.displayName || el.post.author.handle} <span className="floff-handle">@{el.post.author.handle}</span></p>
			</div> : null}

			<div className="text">{text}</div>
			
			{el.post.embed && el.post.embed.images && Array.isArray(el.post.embed.images) ? <div className="floff-images">{el.post.embed.images.map((el, index) => <a href={el.fullsize} target="_blank" key={index}><img src={el.thumb} alt={el.alt} /></a>)}</div> : null}

			{el.post.embed && el.post.embed.external && el.post.embed.external && typeof el.post.embed.external === 'object' && 'uri' in el.post.embed.external && typeof el.post.embed.external.uri === 'string' ? <div className="floff-linkcard">
				{'thumb' in el.post.embed.external ? <img src={typeof el.post.embed.external.thumb === 'string' ? el.post.embed.external.thumb : ""} className="thumb" /> : null}
				<div className="linkcard-main-part">
					<p className="linkcard-title"><a href={el.post.embed.external.uri} target="_blank">{'title' in el.post.embed.external && typeof el.post.embed.external.title === 'string' ? el.post.embed.external.title : el.post.embed.external.uri}</a></p>
					{'description' in el.post.embed.external && typeof el.post.embed.external.description === 'string' ? <p className="linkcard-desc">{el.post.embed.external.description}</p> : null}
				</div>
			</div> : null}

			{el.post.embed && el.post.embed.record ? <div className="quoted-post">
				<Floff feedPost={{ post: el.post.embed.record } as BskyPost} />
			</div> : null}

			<div className="meta-buttons">
				<div>
					<p>{el.post.replyCount || 0} {t.replies}</p>
				</div>
				<div>
					<p>{el.post.likeCount || 0} {t.likes}</p>
					{!liked && el.post.author?.handle !== handle ? <button onClick={() => likePost()}>{t.likePost}</button> : null}
				</div>
				<div>
					<p>{el.post.repostCount || 0} {t.reposts}</p>
					{!reposted ? <button onClick={() => repostPost()}>{t.repostPost}</button> : null}
				</div>
			</div>
		</article>
	)
} 

export type BskyPost = FeedViewPost & {
	post : {
		record : {
			text? : string,
		}
	}
}

export default Floff;