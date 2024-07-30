import styled, { keyframes } from 'styled-components';

const hoverEffect = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  }
  100% {
    transform: scale(1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const SmallButton = styled.span`
  ${(props) => props.theme.fonts.SmallButton};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.pink2};
  padding: 15px;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 20px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 130px;
  height: 55px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 15px;
    width: 110px;
    height: 45px;
    font-size: 0.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 13px;
    width: 100px;
    height: 40px;
    font-size: 0.7rem;
  }
`;

export default SmallButton;
