import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	overflow: auto;
	margin: 0 auto;
	padding: 12px 15px;
	height: calc(100% - 50px);
`;

export const TableHead = styled.thead<{ bg: string }>`
	background-color: ${(props) => props.bg};
	height: 50px;
	width: 100%;

	& th {
		text-align: center;
		max-width: 120px;
		overflow-wrap: "break-word";
		line-height: 50px;
		vertical-align: middle;
		color: white;
	}
`;

export const TableBody = styled.tbody<{
	rowsBgs: { even: string; odd: string };
}>`
	& tr {
		height: 40px;
		line-height: 40px;
		color: ${(props) => props.color};
	}

	& tr:nth-child(2n) {
		background-color: ${(props) => props.rowsBgs.even};
	}

	& tr:nth-child(2n + 1) {
		background-color: ${(props) => props.rowsBgs.odd};
	}

	& td {
		text-align: center;
		max-width: 120px;
		overflow-wrap: x "break-word";
		line-height: 4 0px;
		vertical-align: middle;
		color: inherit;
	}
`;

export const Title = styled.h3`
	padding: 10px 0px;
	color: ${(props) => props.color};
`;
