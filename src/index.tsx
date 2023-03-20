import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SQLDatabaseProvider } from "./SQLDatabase";
import StoreProvider from "./store";
import { ThemeProvider } from "./hook/useTheme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SQLDatabaseProvider
			dbUrl="DigitalEvidenceDB.db"
			questionsUrl="questions.json"
		>
			<ThemeProvider>
				<StoreProvider>
					<App />
					<ToastContainer autoClose={1000} />
				</StoreProvider>
			</ThemeProvider>
		</SQLDatabaseProvider>
	</React.StrictMode>
);
