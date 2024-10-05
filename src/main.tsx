import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	Link,
	RouterProvider,
	createBrowserRouter,
	useParams,
} from "react-router-dom";
import App from "./components/App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/blogs/:id",
		Component: () => {
			const params = useParams<{ id: string }>();
			return (
				<div>
					blogs {params.id}
					<Link to="/">ホームへ</Link>
				</div>
			);
		},
	},
]);
const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
