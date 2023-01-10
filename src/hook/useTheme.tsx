import React, {
	PropsWithChildren,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import { colors } from "../constant/colors";
import { Themes } from "../constant/theme";
import { sizes } from "../constant/sizes";

const initialState = {
	colors: colors[Themes.LIGHT],
	theme: Themes.LIGHT,
	toggleMode: () => {},
	screenSizes: sizes,
};

const ThemeContext = createContext(initialState);

export const ThemeProvider: React.FunctionComponent<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [theme, setTheme] = useState(initialState.theme);

	const toggleMode = () => {
		setTheme((prevTheme) =>
			prevTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
		);
	};

	const themeColors = useMemo(() => {
		return colors[theme];
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{ screenSizes: sizes, theme, colors: themeColors, toggleMode }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
