import React, { PropsWithChildren, useLayoutEffect, useState } from "react";
import Header from "./Header";
import { Sidebar } from "../Siderbar";
import { useTheme } from "../../hook/useTheme";
import useMediaQuery from "../../hook/useMediaQuery";
import { Main, Container } from "./Layout.style";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	const { colors } = useTheme();
	const matches = useMediaQuery("(min-width: 1300px)");
	const [isSidebar, setIsSidebar] = useState(false);
	return (
		<Container bg={`${colors.bg.secondary?.[100]}`}>
			<Header handleSidebar={() => setIsSidebar((sidebar) => !sidebar)} />
			{matches || isSidebar ? (
				<Sidebar isSidebar={isSidebar} closeSidebar={() => setIsSidebar(false)} />
			) : (
				<></>
			)}
			<Main>{children}</Main>
		</Container>
	);
};
