import Table from "react-bootstrap/Table";
import { useMemo } from "react";
import "./result.css";
import { Container, TableBody, TableHead, Title } from "./Result.style";
import { useTheme } from "../../hook/useTheme";

export const Result: React.FunctionComponent<{
	columns: string[];
	values: any[];
}> = ({ columns, values }) => {
	const idColumnName = useMemo(() => {
		return columns.find((c) => c.toLowerCase().includes("id"));
	}, [columns]);

	const { colors } = useTheme();

	if (values.length === 0) {
		return <></>;
	}

	return (
		<Container>
			<Title color={`${colors.text.primary?.[200]}`}>Your results are</Title>
			<Table
				border={1}
				cellSpacing={20}
				cellPadding={10}
				bordered
				size="sm"
				style={{ overflowY: "scroll" }}
			>
				<TableHead bg={`${colors.bg.primary}`}>
					<tr>
						{columns.map((r) => (
							<th scope="col" key={r}>
								{r}
							</th>
						))}
					</tr>
				</TableHead>
				<TableBody
					rowsBgs={{
						even: `${colors.bg.secondary?.[100]}`,
						odd: `${colors.bg.secondary?.[200]}`,
					}}
					hoverColor={`${colors.text.primary?.[200]}`}
					color={`${colors.text.primary?.[200]}`}
				>
					{values.map((item, idx) => {
						const id =
							idColumnName !== undefined && idColumnName in item
								? item[idColumnName]
								: JSON.stringify(item) + Date.now();

						return (
							<tr key={id}>
								{Object.keys(item).map((k) => (
									<td key={`${id}-${k}`}>{item[k]}</td>
								))}
							</tr>
						);
					})}
				</TableBody>
			</Table>
		</Container>
	);
};
