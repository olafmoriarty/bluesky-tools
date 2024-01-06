import { BskyAgent, RichText } from '@atproto/api';

const postThread = async ( agent : BskyAgent, thread : string[] ) => {
	let rootUri = '';
	let rootCid = '';

	let parentUri = '';
	let parentCid = '';
	
	for (let i = 0; i < thread.length; i++) {
		const rt = new RichText({
			text: thread[i],
		});
		await rt.detectFacets(agent);

		const postReturn = await agent.post({
			$type: 'app.bsky.feed.post',
			text: rt.text,
			facets: rt.facets,
			createdAt: new Date().toISOString(),

			reply: i === 0 ? undefined : {
				root: {
					uri: rootUri,
					cid: rootCid,
				},
				parent: {
					uri: parentUri,
					cid: parentCid,
				},
			},
		});
		if (!postReturn) {
			break;
		}
		parentUri = postReturn.uri;
		parentCid = postReturn.cid;

		if (i === 0) {
			rootUri = postReturn.uri;
			rootCid = postReturn.cid;
		}
	}

	return true;
}

export default postThread;