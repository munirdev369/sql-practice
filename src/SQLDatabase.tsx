import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import initSqlJs from "sql.js";
import { Buffer } from "buffer";
import { config } from "./constant/config";
import { ErrorToast } from "./components/Toast/error";
import { SuccessToast } from "./components/Toast/success";
interface SQLDatabaseState {
	loading: boolean;
	db: initSqlJs.Database | null;
	updateDatabase: (dataBuffer: ArrayBuffer) => Promise<boolean>;
	tables: TableData[];
	setTables: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const initialState: SQLDatabaseState = {
	db: null,
	updateDatabase: async (dbuffer) => false,
	tables: [],
	loading: true,
	setTables: () => {},
};

type TableData = {
	id: number;
	name: string;
	columns: string[];
	showColumns: boolean;
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
> = ({ children, dbUrl }) => {
	const [db, setDb] = useState<initSqlJs.Database | null>(null);
	const [SQL, setSQL] = useState<initSqlJs.SqlJsStatic | null>(null);
	const [tables, setTables] = useState<TableData[]>([]);
	const [loading, setLoading] = useState(false);
	const [, setError] = useState<any | null>(null);
	const [defaultDbBuffer, setDefaultDbBuffer] = useState<ArrayBuffer | null>(
		null
	);


	const getTables = async (db: initSqlJs.Database) => {
		const data = [];
		let tables = null;
		try {
			tables = db.exec(
				"select tbl_name from sqlite_master where type = 'table'"
			);
		} catch (error) {
			let message = "Error Occured. Please try again";
			if (
				typeof error === "object" &&
				error &&
				"message" in error &&
				typeof error.message === "string"
			) {
				message = error.message;
			}
			throw new Error(message);
		}

		const tableNames = tables
			.values()
			.next()
			.value.values.flatMap((e: any) => e);
		for (let i = 0; i < tableNames.length; i++) {
			const colQuery = db.exec(
				`SELECT name FROM PRAGMA_TABLE_INFO('${tableNames[i]}');`
			);
			const columns = colQuery
				.map((v) => v.values)[0]
				.flatMap((c) => c) as string[];
			data.push({
				id: i + 1,
				name: tableNames[i],
				columns,
				showColumns: false,
			});
		}
		return data;
	};

	const updateDbAndTables = async (dataBuffer: ArrayBuffer) => {
		if (!SQL) return;
		const dbSql = new SQL.Database(Buffer.from(dataBuffer));
		const tables = await getTables(dbSql);
		setDb(dbSql);
		setTables(tables);
	};

	const updateDatabase = async (dataBuffer: ArrayBuffer) => {
		if (!SQL) return false;
		try {
			await updateDbAndTables(dataBuffer)
			SuccessToast('Database Loaded Successfully!')
			return true
		} catch (error) {
			if (error instanceof Error) {
				debugger;
				ErrorToast(error.message);
			}
			if (defaultDbBuffer) {
				await updateDbAndTables(defaultDbBuffer)
			}
			return false;
		}
	};

	const fetchDatabase = async () => {
		const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/${dbUrl}`);
		return await res.arrayBuffer();
	};

	const sqlJsInit = async () => {
		return initSqlJs({
			locateFile: (file: string) => {
				return `https://sql.js.org/dist/${file}`;
			},
		});
	};

	const init = async () => {
		setLoading(true);
		try {
			const results = await Promise.allSettled([fetchDatabase(), sqlJsInit()]);
			const errors = results.filter((result) => result.status === "rejected");
			if (errors.length > 0) throw errors[0];
			const [dataBuffer, SQL] = results.map((result) =>
				result.status === "fulfilled" ? result.value : result.reason
			);
			const dbSql = new SQL.Database(Buffer.from(dataBuffer));
			const tables = await getTables(dbSql);

			setSQL(SQL);
			setDefaultDbBuffer(Buffer.from(dataBuffer));
			setTables(tables);
			setDb(dbSql);
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<SQLDatabaseContext.Provider
			value={{
				db,
				loading,
				updateDatabase,
				tables,
				setTables,
			}}
		>
			{children}
		</SQLDatabaseContext.Provider>
	);
};

export const useDatabase = () => {
	return useContext(SQLDatabaseContext);
};
export const useUpdateDatabase = () => {
	const { updateDatabase } = useContext(SQLDatabaseContext);
	return updateDatabase;
};
