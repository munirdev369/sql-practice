import { useTheme } from "../../hook/useTheme";

interface DefaultErrorProps {
	handleClose: () => void;
}

export const DefaultError: React.FunctionComponent<DefaultErrorProps> = ({
	handleClose,
}) => {
	const { colors } = useTheme();
	return (
		<button
			className="btn"
			style={{
				display: "grid",
				margin: "0 auto",
				padding: "10px 25px",
				minWidth: "130px",
				backgroundColor: `${colors.bg.primary}`,
				color: `${colors.text.primary?.[200]}`
			}}
			onClick={handleClose}
		>
			Try again
		</button>
	);
};
