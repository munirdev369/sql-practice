import React, { CSSProperties, useRef, useState } from "react";
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
	minWidth: 150,
	paddingTop: 10,
	paddingBottom: 10,
	paddingInline: 30,
};

interface Props {}

const EditorWithoutErrorBoundary: React.FunctionComponent<Props> = ({}) => {
	const { answer } = useStore();
	const dispatch = useDispatch();
	const { throwError } = useError();
	const db = useDatabase();

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

	const handleExportResults = () => {};

	return (
		<Container>
			<AnswerInput
				value={answer}
				onChange={handleAnswer}
				borderColor={`${colors.bg.primary}`}
				bg={`${colors.bg.secondary?.[200]}`}
				color={`${colors.text.primary?.[100]}`}
				autoFocus
				cols={8}
			/>
			<ButtonContainer>
				<Button
					style={{
						...btnStyles,
						borderColor: `${colors.text.secondary}`,
						color: `${colors.text.secondary}`,
						backgroundColor: `${colors.bg.secondary?.[100]}`,
					}}
					onClick={handleExportResults}
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
						backgroundColor: `${colors.bg.primary}`,
						borderColor: `${colors.bg.primary}`,
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
