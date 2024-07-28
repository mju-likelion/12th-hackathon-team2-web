import styled from 'styled-components';

const SmallButton = styled.span`
  ${(props) => props.theme.fonts.SmallButton};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.pink2};
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 20px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 110px;
  height: 55px;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding: 18px;
    width: 100px;
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 13px;
    width: 90px;
    height: 45px;
    font-size: 0.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px;
    width: 80px;
    height: 40px;
    font-size: 0.7rem;
  }
`;

export default SmallButton;
