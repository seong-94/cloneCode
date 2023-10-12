import { styled } from "styled-components";

type Props = {};
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  font-size: 24px;
`;

export default function LoadingScreen({}: Props) {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
