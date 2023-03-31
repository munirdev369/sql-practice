import React from "react";
import { Navbar, Nav, NavItem, Form } from "react-bootstrap";
import { sizes } from "../../constant/sizes";
import { useTheme } from "../../hook/useTheme";
import styled from "styled-components";
import useMediaQuery from "../../hook/useMediaQuery";

interface Props {
	handleSidebar: () => void;
}

const Header: React.FunctionComponent<Props> = ({ handleSidebar }) => {
	const { colors, toggleMode } = useTheme();
	const media = useMediaQuery(`(min-width: ${sizes.sm})`);

	const handleToggleClick = () => {
		handleSidebar();
	};

	return (
		<AppHeader backgroundColor={`#182334`}>
			<AppNavbar expand="xl" className="navbar-dark d-flex align-items-center">
				<Navbar.Toggle onClick={handleToggleClick} style={{ color: "white", fontSize: media ? undefined : 12 }} />
				<Navbar.Brand style={{ color: "white", fontFamily:'Bebas Neue' }}>
				<a href="https://wsdalearning.ai">
						<img
							src={`${process.env.REACT_APP_PUBLIC_URL}/logo-light.png`}
							style={{ marginRight: '25px' }}
							alt="wsda logo"
							width={media ? 180: 120}
						/>
					</a>
					{media ? "WSDA SQL Practice Dojo" : ""}
				</Navbar.Brand>
				<Nav style={{ gap: "2em", paddingRight: 20, display: 'flex', flexDirection: "row" }}>
					<NavItem className="mode m-auto ms-sm-auto me-sm-0 d-flex">
						{media ? "Mode" : ""}
						<CustomSwitch onChange={toggleMode} style={{ width: media ? 40 : 20}} />
					</NavItem>
					<NavItem
						className="mode m-auto ms-sm-auto me-sm-0 d-flex"
						style={{ color: `${colors.text.primary}` }}
					>
						<a
							style={{ color: "inherit", textDecoration: "none", fontSize: media ? 20 : 15 }}
							href="https://wsdalearning.ai/sqldojohelp"
							target="_blank"
							rel="noreferrer"
						>
							Help
						</a>
					</NavItem>
				</Nav>
			</AppNavbar>
		</AppHeader>
	);
};

const CustomSwitch = styled(Form.Switch)`
	margin-left: 10px;
	& .form-check-input:checked {
		background-color: #0d0d0d;
	}
`;

const AppHeader = styled.div<{ backgroundColor: string }>`
	width: calc(100% - 20px);
	height: calc(100% - 16px);
	grid-column: 2 / -1;
	place-self: center;
	border-radius: 10px;
	background-color: ${(props) => props.backgroundColor};
	@media screen and (max-width: ${sizes.xl}) {
		grid-column: 1 / -1;
	}
`;

const AppNavbar = styled(Navbar)`
	--scale: 62.5%;
	--offset: 2em;
	padding-left: var(--offset);
	padding-right: var(--offset);
	color: white;
	height: 100%;
	width: 100%;
	display: grid !important;
	grid-auto-flow: column;
	grid-template-columns: repeat(2, 1fr);
	font-size: var(--scale);
	place-content: center;
	grid-gap: 2em;

	& .navbar-nav {
		margin-left: auto;
	}

	& span.navbar-brand {
		font-size: 2.4em;
	}

	& .mode {
		font-size: 2.2em;
	}

	@media screen and (max-width: ${sizes.xl}) {
		grid-template-columns: 50px repeat(2, 1fr);
	}

	@media screen and (min-width: ${sizes.xs}) and (max-width: ${sizes.sm}) {
		--scale: 52%;
		grid-gap: 1em;
		& *:first-child {
			grid-row: 1 / -1;
		}
	}

	@media screen and (max-width: ${sizes.xs}) {
		--scale: 45%;

		grid-template-columns: 40px max-content 1fr;
		& .navbar-toggler {
			padding: 2px !important;
		}
	}
`;

export default Header;
