import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from './contexts/Context';
import Root from "./components/Root";
import Threader from "./components/Threader";
import Start from "./components/Start";
import FindPeople from "./components/FindPeople";
import Favstar from "./components/Favstar";

function App() {

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			children: [
				{
					path: '',
					element: <Start />,
				},
				{
					path: 'thread/',
					element: <Threader />,
				},
				{
					path: 'find-people/',
					element: <FindPeople />,
				},
				{
					path: 'favstar/',
					element: <Favstar />,
				},
			]
		},
	]);

	return (
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	)

}

export default App;