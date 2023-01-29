import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Loader } from "./components/shared/Loader";
import { useQuestions } from "./SQLDatabase";

function App() {
	const { loading } = useQuestions();
	return (
		<Layout>
			{!loading ? <Editor /> : <Loader color="blue" loading={loading} />}
		</Layout>
	);
}

export default App;
