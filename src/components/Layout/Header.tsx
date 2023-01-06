import React, { useRef, useState } from "react";
import {
	Container,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Form,
	Col,
} from "react-bootstrap";
import { useTheme } from "../../hook/useTheme";
import styled from "styled-components";

const navItems = [{ id: 1, title: "Editor", link: "/" }];

interface Props {
	handleSidebar: () => void;
}

const Header: React.FunctionComponent<Props> = ({ handleSidebar }) => {
	const { colors, toggleMode } = useTheme();

	const handleToggleClick = () => {
		handleSidebar();
	};

	return (
		<AppHeader backgroundColor={`${colors.bg.primary}`}>
			<AppNavbar expand="xl">
				<Container fluid>
					<Col sm={6} xs={12}>
						<Navbar.Toggle onClick={handleToggleClick} className="me-4" />
						<Navbar.Brand style={{ color: "white" }}>
							WSDA SQL Editor
						</Navbar.Brand>
					</Col>
					<Col sm={6} xs={12}>
						<Nav className="mb-2 ms-sm-auto m-auto mb-lg-0 me-2">
							<NavItem className="m-auto ms-sm-auto me-sm-0 d-flex fs-5">
								Mode
								<CustomSwitch onChange={toggleMode} />
							</NavItem>
						</Nav>
					</Col>
				</Container>
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
	@media screen and (max-width: 1300px) {
		grid-column: 1 / -1;
	}
`;

const AppNavbar = styled(Navbar)`
	padding-left: 30px;
	padding-right: 30px;
	color: white;
	height: 100%;
	width: 100%;

	& span.navbar-brand {
		font-size: clamp(6px, 1.8em, 24px);
	}
`;

export default Header;
