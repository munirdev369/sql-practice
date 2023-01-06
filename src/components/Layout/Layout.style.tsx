import styled from "styled-components";

export const Main = styled.div`
	grid-column: 2 / 3;

	@media screen and (max-width: 1300px) {
		grid-column: 1 / -1;
	}
`;


export const Container = styled.div<Record<"bg", string>>`
  position: relative;
  margin: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: 120px calc(100vh - 70px);
  grid-template-columns: 25% 1fr;
  background-color: ${props => props.bg};
`