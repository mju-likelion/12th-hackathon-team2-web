import styled from 'styled-components';

const Title = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    margin-bottom: 30px;
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  @media (max-width: 360px) {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

export default Title;
