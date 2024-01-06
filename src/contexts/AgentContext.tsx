import { useState, useEffect, useRef, RefObject, createContext, useContext } from 'react';
import { BskyAgent } from '@atproto/api';
import { ContextProps } from './Context';

const AgentContext = createContext({} as AgentContextType);

export const AgentProvider = (props : ContextProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const dialogRef = useRef(null as null | HTMLDialogElement);

	const [agent, setAgent] = useState(undefined as undefined | BskyAgent);

	const [handle, setHandle] = useState('');

	useEffect(() => {
		const newAgent = new BskyAgent({
			service: 'https://bsky.social',
		});
		setAgent(newAgent);
	}, []);

	return (
		<AgentContext.Provider value={{
			agent: agent,
			dialogRef: dialogRef,
			isLoggedIn: isLoggedIn,
			setIsLoggedIn: setIsLoggedIn,
			handle: handle,
			setHandle: setHandle,
		}}>
			{props.children}
		</AgentContext.Provider>
	)
}

export const useAgent = () => useContext(AgentContext);

export interface AgentContextType {
	agent : BskyAgent | undefined,
	dialogRef : RefObject<HTMLDialogElement>,
	isLoggedIn : boolean,
	setIsLoggedIn: ( isLoggedIn : boolean ) => void,
	handle: string,
	setHandle: ( handle : string ) => void,
}