import React, { CSSProperties, useState } from "react";
import { useDatabase } from "../../SQLDatabase";
import "./editor.css";
import { Button } from "react-bootstrap";
import withModalErrorBoundary from "../ErrorBoundary";
import { useError } from "../../hook/useError";
import { Actions, useDispatch, useStore } from "../../store";
import { useTheme } from "../../hook/useTheme";
import { AnswerInput, ButtonContainer, Container } from "./Editor.style";
import { Result } from "../Result";
import { CSVLink } from "react-csv";

const btnStyles: CSSProperties = {
	height: 50,
	minWidth: 200,
	paddingTop: 10,
	paddingBottom: 10,
};


const EditorWithoutErrorBoundary: React.FC = () => {
	const { answer } = useStore();
	const dispatch = useDispatch();
	const { throwError } = useError();
	const { db, updateDatabase, } = useDatabase();
	const [customFile, setCustomFile] = useState("");

	const getQueryResult = (query: string) => {
		const expectedResult = db!.exec(query);
		const { columns, values } = expectedResult.values().next().value;
		const result = [columns, ...values]
			.map((item) => item.join(","))
			.join("\n");
		return {
			values,
			columns,
			result,
		};
	};

	const handleRun = () => {
		try {
			const { columns, values } = getQueryResult(answer.replace(";", ""));
			dispatch({ type: Actions.SET_RESULT, payload: { columns, values } });
		} catch (error) {
			const { message = "" } = error as Error;
			return throwError(message);
		}
	};
	const { colors } = useTheme();

	const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch({ type: Actions.SET_ANSWER, payload: e.target.value });
	};

	const {
		result,
	} = useStore();


	return (
		<Container>
			<AnswerInput
				value={answer}
				onChange={handleAnswer}
				borderColor={`${colors.bg.secondary}`}
				bg={`${colors.bg.secondary?.[100]}`}
				color={`${colors.text.primary?.[100]}`}
				autoFocus
				cols={8}
			/>
			<ButtonContainer>
				<div
					style={{
						height: 50,
						minWidth: 200,
						maxWidth: 210,
						backgroundColor: `#0FBC02`,
						borderColor: `${colors.bg.primary}`,
						width: "100%",
						position: "relative",
						borderRadius: "10px",
						display: "grid",
						placeContent: "center",
						color: "white",
						cursor: "pointer",
						fontSize: 16,
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
							} catch (error) { }
						}}
					/>
					{customFile || "Load Database"}
				</div>
				<Button
					style={{
						...btnStyles,
						borderColor: `#182334`,
						color: `${colors.text.primary?.[200]}`,
						backgroundColor: `transparent`,
						borderWidth: '2px'
					}}
				>
					<CSVLink
						style={{ color: "inherit", textDecoration: "none" }}
						data={[result.columns, ...result.values]}
					>
						Export Results
					</CSVLink>
				</Button>
				<Button
					style={{
						...btnStyles,
						backgroundColor: `#0FBC02`,
						border: "none"
					}}
					onClick={handleRun}
				>
					Run
				</Button>
			</ButtonContainer>
			<Result {...result} />
		</Container>
	);
};

export const Editor = withModalErrorBoundary(EditorWithoutErrorBoundary);
