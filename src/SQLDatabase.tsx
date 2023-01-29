import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import initSqlJs from "sql.js";
import { Buffer } from "buffer";
import { Loader } from "./components/shared/Loader";
import { config } from "./constant/config";
interface SQLDatabaseState {
	questions: {
		data: Array<QuestionType>;
		loading: boolean;
	};
	db: initSqlJs.Database | null;
}

const initialState: SQLDatabaseState = {
	db: null,
	questions: {
		data: [],
		loading: false,
	},
};

const SQLDatabaseContext = createContext(initialState);

interface Props {
	dbUrl: string;
	questionsUrl: string;
}

export type QuestionType = {
	level: number;
	answerQuery: string;
	question: string;
	tableName: string;
	bindParams: null | Record<string, any>;
};

export const SQLDatabaseProvider: React.FunctionComponent<
	PropsWithChildren<Props>
> = ({ children, dbUrl, questionsUrl }) => {
	const [db, setDb] = useState<initSqlJs.Database | null>(null);
	const [questions, setQuestions] = useState<Array<QuestionType>>([]);
	const [loading, setLoading] = useState(false);
	const [, setError] = useState<any | null>(null);
	const fetchSqlJs = async () => {
		setLoading(true);
		try {
			const [database, questions] = await Promise.all([
				fetch(`${config.SERVER_URL}/${dbUrl}`),
				fetch(questionsUrl).then((res) => res.json()),
			]);
			const [dataBuffer, SQL] = await Promise.all([
				database.arrayBuffer(),
				initSqlJs({
					locateFile: (url: string) => {
						return `${config.SERVER_URL}/${url}`;
					},
				}),
			]);
			const dbSql = new SQL.Database(Buffer.from(dataBuffer));
			setDb(dbSql);
			setQuestions(questions);
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSqlJs();
	}, []);

	return (
		<SQLDatabaseContext.Provider
			value={{ db, questions: { data: questions, loading } }}
		>
			{children}
		</SQLDatabaseContext.Provider>
	);
};

export const useDatabase = () => {
	const { db } = useContext(SQLDatabaseContext);
	return db;
};

export const useQuestions = () => {
	const { questions } = useContext(SQLDatabaseContext);
	return questions;
};
