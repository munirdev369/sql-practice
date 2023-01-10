import styled from "styled-components";
import { sizes } from "../../constant/sizes";

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
	font-size: 0.625rem;

	@media screen and (max-width: ${sizes.sm}) {
		font-size: 0.5rem;
	}

	& th {
		text-align: center;
		max-width: 120px;
		word-break: "break-word";
		line-height: 50px;
		vertical-align: middle;
		color: white;
		font-size: 1.6em;
	}
`;

export const TableBody = styled.tbody<{
	rowsBgs: { even: string; odd: string };
	hoverColor: string;
}>`
	& tr {
		height: 40px;
		line-height: 40px;
		color: ${(props) => props.color};
		font-size: 1.6em;
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
		line-height: 40px;
		vertical-align: middle;
		color: inherit;
	}

	& td:hover,
	& td:active,
	& td:focus {
		color: ${props => props.hoverColor};
	}
`;

export const Title = styled.h3`
	padding: 10px 0px;
	color: ${(props) => props.color};
`;
