import styled from "styled-components";
import { Container as BsContainer } from "react-bootstrap";
import { sizes } from "../../constant/sizes";

export const Container = styled(BsContainer)`
	margin-top: 2.5em;
	margin-bottom: 2.5em;
	flex: 1;
	display: grid;
	grid-template-rows: max-content auto 1fr;
	grid-template-columns: 1fr;
	height: 100%;
	gap: 1em;
	max-width: 100%;
	font-size: 62.5%;

	@media screen and (max-width: ${sizes.lg}) {
		font-size: 56%;

		& textarea {}
	}
	@media screen and (max-width: ${sizes.md}) {
		font-size: 50%;
	}
	@media screen and (max-width: ${sizes.sm}) {
		font-size: 46%;
		& textarea {
			height: 10em;
		}
	}
`;

export const AnswerInput = styled.textarea<{ borderColor: string; bg: string; color: string; }>`
	font-size: 2em;
	min-height: 15em;
	padding: 1.2em;
	height: 100%;
	display: inline-block;
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

	& button {
		font-size: 1.8em;
		padding-left: 2em !important;
		padding-right: 2em !important; 
		height: 'max-content';
	}
`