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
			primary: "#0FBC02",
			secondary: {
				"100": "#fff",
				"200": "#fafafa",
			},
		},
		text: {
			primary: {
				"100": "##2F3948",
				"200": "#182334",
			},
			secondary: "#0FBC02",
			tertiary: "#fafafa",
		},
		shadow: {
			secondary: "#0000000A",
		},
	},
	dark: {
		bg: {
			primary: "#0FBC02",
			secondary: {
				"200": "#182334",
				"100": "#2F3948",
			},
		},
		text: { primary: { 100: "#fff", 200: "#f2f2f2" }, tertiary: '#182334' } ,
		shadow: {},
	},
};
