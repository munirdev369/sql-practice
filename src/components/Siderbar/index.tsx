import { useEffect, useState } from "react";
import { useDatabase } from "../../SQLDatabase";
import { MdArrowRight, MdClose } from "react-icons/md";
import { useTheme } from "../../hook/useTheme";
import "./styles.css";
import {
	Aside,
	AsideBody,
	AsideCard,
	AsideContainer,
	AsideHeader,
} from "./Sidebar.style";

type TableData = {
	id: number;
	name: string;
	columns: string[];
	showColumns: boolean;
};

interface Props {
	isSidebar: boolean;
	closeSidebar: () => void;
}

export const Sidebar: React.FunctionComponent<Props> = ({
	closeSidebar,
	isSidebar,
}) => {
	const db = useDatabase();
	const [tables, setTables] = useState<TableData[]>([]);
	const [loading, setLoading] = useState(false);

	const { colors } = useTheme();

	useEffect(() => {
		if (db) {
			setLoading(true);
			const data = [];
			const tables = db.exec(
				"select tbl_name from sqlite_master where type = 'table'"
			);

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

			setTables(data);
			setLoading(false);
		}
	}, [db]);

	const handleTableItemClick = (id: number) => {
		setTables((pt) => {
			return pt.map((t) =>
				t.id === id
					? { ...t, showColumns: !t.showColumns }
					: { ...t, showColumns: false }
			);
		});
	};

	return (
		<Aside backgroundColor={`${colors.bg.secondary?.[100]}`}>
			<AsideContainer
				backgroundColor={`${colors.bg.secondary?.[200]}`}
				boxShadow={`0px 2px 20px 0px ${colors.shadow.secondary}`}
			>
				<AsideHeader>
					{isSidebar && (
						<MdClose
							color={"#11B618"}
							size={25}
							onClick={closeSidebar}
							cursor="pointer"
						/>
					)}
					<h4
						className="aside_title"	
						style={{ backgroundColor: `${colors.bg.secondary?.[200]}` }}
					>
						DataBase Tables
					</h4>
				</AsideHeader>

				{!loading && tables.length > 0 && (
					<AsideBody>
						{tables?.map((table, idx) => (
							<AsideCard>
								<AsideCard.Header
									color={
										!table.showColumns
											? `${colors.text.primary?.[100]}`
											: `${colors.text.tertiary}`
									}
									bg={
										table.showColumns
											? `${colors.bg.primary?.toString()}`
											: "transparent"
									}
									boxShadow={
										table.showColumns
											? "0px 10px 30px 0px #11B61833"
											: "0px 0px 0px #00000000"
									}
									onClick={() => handleTableItemClick(table.id)}
								>
									<p
										className="db__table-name"
										style={{
											color: "inherit",
										}}
									>
										{table.name}
									</p>
									<MdArrowRight
										color="inherit"
										style={{
											fontSize: "35px",
											rotate: `${table.showColumns ? -90 : 90}deg`,
										}}
									/>
								</AsideCard.Header>
								{table.showColumns ? (
									<AsideCard.Body>
										{table.columns.map((c) => (
											<p
												style={{
													fontSize: 16,
													color: `${colors.text.primary?.[100]}`,
												}}
												className="m-2"
												key={c}
											>
												{c}
											</p>
										))}
									</AsideCard.Body>
								) : null}
							</AsideCard>
						))}
					</AsideBody>
				)}
			</AsideContainer>
		</Aside>
	);
};
