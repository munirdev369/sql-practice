import { Themes } from "./theme";

type ColorVariants = Partial<
	Record<100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>
>;

// type Colors =  {
//   primary?: string | ColorVariants,
//   secondary?: string | ColorVariants,
//   text?: string | ColorVariants
// }

type Colors = Partial<
	Record<"primary" | "secondary" | "tertiary", string | ColorVariants>
>;

export const colors: Record<
	Themes,
	Record<"bg" | "text" | "shadow", Colors>
> = {
	light: {
		bg: {
			primary: "#11B618",
			secondary: {
				"100": "#fff",
				"200": "#fafafa",
			},
		},
		text: {
			primary: {
				"100": "#8D8D8D",
				"200": "#333333",
			},
			secondary: "#11B618",
			tertiary: "#fafafa",
		},
		shadow: {
			secondary: "#0000000A",
		},
	},
	dark: {
		bg: {
			primary: "#11B618",
			secondary: {
				"100": "#0F0F10",
				"200": "#212121",
			},
		},
		text: { primary: { 100: "#fff", 200: "#f2f2f2" } },
		shadow: {},
	},
};
