import React, { Children, PropsWithChildren } from "react";
import styled, {
	StyledComponent,
	ThemedStyledFunction,
} from "styled-components";

export const Aside = styled.div<Record<"backgroundColor", string>>`
	height: 100%;
	grid-column: 1 / 2;
	grid-row: 1 / -1;
	display: grid;
	place-content: center;
	background-color: ${(props) => props.backgroundColor};
	@media screen and (max-width: 1300px) {
		position: absolute;
		min-width: 400px;
		width: 100%;
	}

	@media screen and (max-width: 400px) {
		min-width: 100vw;
	}
`;

interface AsideContainerProps {
	backgroundColor: string;
	boxShadow: string;
}

export const AsideContainer = styled.div<AsideContainerProps>`
	--aside-width: 25vw;
	--offset: 35px;
	position: fixed;
	top: 0;
	left: 0;
	width: calc(var(--aside-width) - calc(var(--offset) * 2));
	height: calc(100vh - calc(var(--offset) * 2));
	border-radius: 30px;
	margin: var(--offset);
	padding-left: clamp(1.5%, 30px, 7%);
	padding-right: clamp(1.5%, 30px, 7%);
	overflow-y: hidden;
	background-color: ${(props) => props.backgroundColor};
	box-shadow: ${(props) => props.boxShadow};

	@media screen and (max-width: 1300px) {
		--aside-width: 100%;
		position: absolute;
		z-index: 100;
	}
`;

export const AsideHeader = styled.div`
	display: flex;
	align-items: center;
`;

export const AsideBody = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 80vh;
	overflow-y: scroll;
	overflow-wrap: normal;
	position: relative;
	padding-bottom: 70px;

	&::-webkit-scrollbar {
		background-color: rgba(232, 232, 232, 0.192);
		width: 5px;
		border-radius: 50px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 50px;
		background-color: rgb(227, 219, 219) /*or any height and color you want*/;
	}
`;

const AsideCardStyled = styled.div`
	width: 100%;
	padding: 0.7em 0px;
	font-size: 18px;
`;

interface AsideCardHeaderProps {
	showColums: boolean;
}

type HeaderProps = Record<"bg" | "color" | "boxShadow", string>;
type BodyProps = {};

interface AsideCardSubComponents {
	Header: StyledComponent<"div", any, HeaderProps, never>;
	Body: StyledComponent<"div", any, BodyProps, never>;
}

type AsideCardComponent = React.FunctionComponent<PropsWithChildren<{}>> &
	AsideCardSubComponents;

export const AsideCard: AsideCardComponent = ({ children }) => {
	const Childrens = () => {
		return;
	};

	return (
		<AsideCardStyled>
			<>{children}</>
		</AsideCardStyled>
	);
};

AsideCard.Header = styled.div<HeaderProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 10px 0.6em;
	padding-left: 20px;
	border-radius: 8px;
	width: 100%;
	font-size: 18px;
	background-color: ${(props) => props.bg};
	color: ${(props) => props.color};
	box-shadow: ${(props) => props.boxShadow};

	& > p {
		margin-bottom: 0px;
	}
`;

AsideCard.Body = styled.div<BodyProps>`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start !important;
	width: 100%;
	padding-top: 10px;
	margin-left: 20px;
`;
