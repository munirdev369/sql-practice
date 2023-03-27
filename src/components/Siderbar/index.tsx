import { CSSProperties, useState } from "react";
import { useDatabase } from "../../SQLDatabase";
import { MdArrowRight, MdClose } from "react-icons/md";
import { useTheme } from "../../hook/useTheme";
import "./styles.css";
import {
	Aside,
	AsideBody,
	AsideCard,
	AsideContainer,
	AsideFooter,
	AsideHeader,
} from "./Sidebar.style";

interface Props {
	isSidebar: boolean;
	closeSidebar: () => void;
}

const btnStyles: CSSProperties = {
	height: 50,
	minWidth: 220,
};

export const Sidebar: React.FunctionComponent<Props> = ({
	closeSidebar,
	isSidebar,
}) => {
	const { loading, tables, updateDatabase, setTables } = useDatabase();
	const { colors } = useTheme();
	const [customFile, setCustomFile] = useState("");

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
				<AsideHeader bg={`${colors.bg.primary}`}>
					{isSidebar && (
						<MdClose
							size={25}
							onClick={closeSidebar}
							cursor="pointer"
						/>
					)}
					<h4
						className="aside_title"
						style={{
							fontFamily: "Bebas Neue",
							padding: '0px 50px'
						}}
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

				<AsideFooter>
					<div
						style={{
							...btnStyles,
							backgroundColor: `#0FBC02`,
							borderColor: `${colors.bg.primary}`,
							width: "100%",
							position: "relative",
							borderRadius: "10px",
							display: "grid",
							placeContent: "center",
							color: "white",
							cursor: "pointer",
						}}
					>
						<input
							type="file"
							style={{
								position: "absolute",
								top: "0",
								left: 0,
								height: "100%",
								opacity: 0,
								width: "100%",
							}}
							onChange={async (e) => {
								try {
									const files = e.target.files;
									if (!files || files?.length === 0) return;
									const file = files[0];
									const fileBuffer = await file.arrayBuffer();
									const updated = await updateDatabase(fileBuffer);
									if (updated) {
										setCustomFile(`${file.name} Loaded`);
									} else {
										setCustomFile("");
									}
								} catch (error) {}
							}}
						/>
						{customFile || "Load Database"}
					</div>
				</AsideFooter>
			</AsideContainer>
		</Aside>
	);
};
