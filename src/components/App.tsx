import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { createClient } from "microcms-js-sdk";
import { Helmet } from "react-helmet";

const client = createClient({
	serviceDomain: "1zu8tyo4pl",
	apiKey: import.meta.env.VITE_MICROCMS_KEY as string,
});
function App() {
	const [count, setCount] = useState(0);
	const [title, setTitle] = useState("");
	useEffect(() => {
		client
			.getList<{ "ogp-title": string }>({ endpoint: "blogs" })
			.then((response) => {
				setTitle(response.contents[0]["ogp-title"]);
			});
	}, []);

	return (
		<>
			<div>
				<Helmet>
					<meta property="og:title" content={title} />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content="https://ogp-with-microcms.vercel.app"
					/>
					<meta
						property="og:image"
						content="https://ogp-with-microcms.vercel.app/onepiece01_luffy.png"
					/>
					<meta property="og:site_name" content="hoge" />
					<meta property="og:description" content="desc" />
					<meta property="og:locale" content="ja_JP" />
				</Helmet>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
