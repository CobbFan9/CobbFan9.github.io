import { Suspense } from "react"
import styled from "styled-components";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import UhOh from "./pages/uhoh";

import GoatCounter from "./components/goatCounter";

import { Pages } from "./pages";

export default function App() {
	const path = window.location.pathname.replace(/\/$/, "") || "/";

	const page = Pages.find((pageDefinition) => {
		const paths = [
			pageDefinition.PageMainPath,
			...pageDefinition.PageAliasPaths,
		];

		return paths.includes(path);
	});

	if (page === undefined) {
		console.error("Somehow didn't find page... path was: " + path);

		return (
			<UhOh />
		)
	}

	return (
		<Layout>
			<GoatCounter />

			<Navbar />

			<Main>
				{
					<Suspense fallback={<h2 style={{ color: "var(--text-dark)" }}>Loading...</h2>}>
						<page.PageElement />
					</Suspense>
				}
			</Main>

			<Footer />
		</Layout>
	)
}

const Layout = styled.div`
	min-height: 100dvh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    flex: 1;
`;