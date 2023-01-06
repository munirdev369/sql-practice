import styled from "styled-components";
import { Container as BsContainer } from "react-bootstrap";

export const Container = styled(BsContainer)`
	margin-top: 50px;
	flex: 1;
	margin-bottom: 50px;
	display: grid;
	grid-template-rows: max-content auto 1fr;
	grid-template-columns: 1fr;
	height: 100%;
	gap: 1em;
`;

export const AnswerInput = styled.textarea<{ borderColor: string; bg: string; color: string; }>`
	font-size: 20px;
	padding-left: 20px;
	padding-top: 20px;
	min-height: 300px;
	height: 100%;
	border-color: ${(props) => props.borderColor};
	background-color: ${props => props.bg};
	color: ${props => props.color};
	&:hover, &:focus, &:focus-within {
		border-color: ${(props) => props.borderColor};
		outline: none;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
	gap: 2em;
	height: 70px;
`