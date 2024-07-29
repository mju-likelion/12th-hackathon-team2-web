import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Inside Out', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 66px;
  color: ${(props) => props.theme.colors.pink3};
  margin-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 30px;
    font-size: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 20px;
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
`;

export default Title;
