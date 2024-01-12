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
		"floffStar": "Floffstar",
		"floffStarDesc": "Skriv inn handlen til ein person, og få opp ei liste over dei tjue mest populære floffane dei har skrive. Du kan klikke deg til floffen, eller like og refloffe direkte frå trefflista.",
		"follow": "Følg",
		"followedByXPeopleYouFollow": "Følgjast av minst {x} folk du følger",
		"frontPageTitle": "Diverse Bluesky-verktøy",

		"getSuggestions": "Generer liste med forslag til folk å følge",
		"github": "Sjå koden på GitHub",

		"hideMenu": "Skjul meny",

		"likePost": "Lik",
		"likes": "likerklikk",
		"loadErrorMessage": "Det oppstod ein feil under lasting, prøv igjen",
		"loadingSuggestions": "Laster forslag ...",
		"logIn": "Logg inn",
		"logInErrorMessage": "Det oppstod ein feil under innlogging, prøv igjen",
		"logInToGetSuggestions": "Logg inn for å vise forslag",
		"logInToPostThread": "Logg inn på Bluesky for å publisere tråden",

		"max99Posts": "Beklager! Tråden kan ikkje inneholde meir enn 99 innlegg.",
		"menuPeople": "Finn folk",
		"menuThread": "Skriv tråd",

		"postsLoaded": "{n} floffar lasta ...",
		"postThread": "Publiser tråd",
		"preview": "Førehandsvisning",
		"previewIsShownHere": "Når du skriver inn ein tekst i tekstboksen, vil tråden din bli førehandsvist her.",

		"replies": "svar",
		"repostPost": "Refloff",
		"reposts": "refloffar",

		"showMenu": "Vis meny",
		
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