import { AgentProvider } from "./AgentContext"
import { TextProvider } from "./TextContext"

export const ContextProvider = (props : ContextProps) => {
	return (
		<AgentProvider>
			<TextProvider>
				{props.children}
			</TextProvider>
		</AgentProvider>
	)
}

export interface ContextProps {
	children : JSX.Element | JSX.Element[],
}