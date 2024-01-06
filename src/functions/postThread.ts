import { BskyAgent } from '@atproto/api';

const postThread = async ( agent : BskyAgent, thread : string[] ) => {
	let rootUri = '';
	let rootCid = '';

	let parentUri = '';
	let parentCid = '';
	
	for (let i = 0; i < thread.length; i++) {
		const postReturn = await agent.post({
			text: thread[i],
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