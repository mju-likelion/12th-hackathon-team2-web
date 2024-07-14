import styled from "styled-components";

const Title = styled.h1`
    ${props => props.theme.fonts.title};
    color: ${(props) => props.theme.colors.pink3};
    margin-bottom: 40px;
`;

export default Title;
