import { createContext, useContext } from 'react';
import { ContextProps } from './Context';

const TextContext = createContext({} as TextContextType);

export const TextProvider = (props : ContextProps) => {

	// Add localizing here later
	const strings = {
		"appPassword": "App-passord",

		"characters": "teikn",
		"createThread": "Opprett Bluesky-tråd",
		"createThreadDesc": "Tar ein lengre tekst, deler den inn i Bluesky-postar på maks 300 teikn, nummererer dei, og poster dei som ein tråd til Bluesky-kontoen din.",
		
		"exampleIdentifier": "eittelleranna.bsky.social",

		"findPeople": "Finn folk å følge",
		"findPeopleDesc": "Skannar gjennom lista over folk du følger på Bluesky, finner ut kven dei folka følger, og gir deg ei liste over dei mest populære kontoane i din venekrets.",
		"follow": "Følg",
		"followedByXPeopleYouFollow": "Følgjast av minst {x} folk du følger",
		"frontPageTitle": "Diverse Bluesky-verktøy",

		"getSuggestions": "Generer liste med forslag til folk å følge",

		"loadingSuggestions": "Laster forslag ...",
		"logIn": "Logg inn",
		"logInErrorMessage": "Det oppstod ein feil under innlogging, prøv igjen",
		"logInToGetSuggestions": "Logg inn for å vise forslag",
		"logInToPostThread": "Logg inn på Bluesky for å publisere tråden",

		"max99Posts": "Beklager! Tråden kan ikkje inneholde meir enn 99 innlegg.",
		"menuPeople": "Finn folk",
		"menuThread": "Skriv tråd",

		"postThread": "Publiser tråd",
		"preview": "Førehandsvisning",
		"previewIsShownHere": "Når du skriver inn ein tekst i tekstboksen, vil tråden din bli førehandsvist her.",
		
		"username": "Brukarnamn",

		"writeTextHere": "Skriv innlegget ditt her",
	};

	return (
		<TextContext.Provider value={{
			t: strings,
		}}>
			{props.children}
		</TextContext.Provider>
	)
}

export const useText = () => useContext(TextContext);

export interface TextContextType {
	t: {
		[key : string] : string,
	},
}