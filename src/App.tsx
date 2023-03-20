import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Loader } from "./components/shared/Loader";
import { useDatabase } from "./SQLDatabase";

function App() {
	const { loading } = useDatabase();
	return (
		<Layout>
			{!loading ? <Editor /> : <Loader color="blue" loading={loading} />}
		</Layout>
	);
}

export default App;
