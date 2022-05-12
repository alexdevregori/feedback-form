import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Insights from "./pages/Insights";
import Drafts from "./pages/Drafts";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import Layout from "./components/Layout";
import Edit from "./pages/Edit";

const theme = createTheme({
	palette: {
		// primary: ,
	},
	typography: {
		fontFamily: "Lato",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/">
							<Insights />
						</Route>
						<Route exact path="/drafts">
							<Drafts />
						</Route>
						<Route exact path="/edit/:id">
							<Edit />
						</Route>
						<Route path="/create">
							<Create />
						</Route>
					</Switch>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
