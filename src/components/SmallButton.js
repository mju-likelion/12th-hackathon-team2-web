import styled from "styled-components";

const SmallButton = styled.span`
    ${props => props.theme.fonts.SmallButton};
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.pink2};
    padding: 20px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 20px;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 198.3px;
    height: 65.29px;
`;

export default SmallButton;
