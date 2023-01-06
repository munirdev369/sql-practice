import React, { PropsWithChildren } from "react";
import { ModalBody } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import Modal, { Styles } from "react-modal";
import styled from "styled-components";
import { useTheme } from "../../hook/useTheme";
const customStyles: Styles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		background: "#fefefe",
		width: "500px",
	},
	overlay: {
		backgroundColor: "#5c78905c",
	},
};

const buttonStyle: React.CSSProperties = {
	position: "absolute",
	top: 0,
	right: 0,
	border: "none",
	background: "none",
	cursor: "pointer",
	margin: "0 auto",
	display: "grid",
};

const titleStyles: React.CSSProperties = {
	fontSize: 18,
	padding: 30,
	color: "black",
	width: "350px",
	textAlign: "center",
	margin: "0 auto",
};

Modal.setAppElement("#root");

export interface AppModalProps extends PropsWithChildren {
	open: boolean;
	text: string;
	handleClose: () => void;
}

const CustomModal: React.FunctionComponent<AppModalProps> = ({
	open,
	text,
	handleClose,
	children,
}) => {
	const { colors, theme } = useTheme();

	return (
		<Modal
			isOpen={true}
			onRequestClose={handleClose}
			style={{
				...customStyles,
				content: {
					...customStyles.content,
					backgroundColor: `${colors.bg.secondary?.[100]}`,
				},
			}}
		>
			<AppModalBody style={{}} color={`${colors.text.primary?.[200]}`}>
				<img src={`/cross-icon-${theme}.svg`} />
				<h4>Error Occured</h4>
				<p>{text}</p>
				<button onClick={handleClose} style={buttonStyle}>
					<MdClose
						fontSize={20}
						color={`${colors.bg.primary}`}
						style={{ cursor: "pointer" }}
					/>
				</button>
				{children}
			</AppModalBody>
		</Modal>
	);
};

const AppModalBody = styled(ModalBody)`
	padding-top: 50px;
	width: 100%;
	margin: 0 auto;
	color: ${(props) => props.color};
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	& * {
		color: "inherit";
	}
	& p {
		font-size: 18px;
	}
`;

export default CustomModal;
