import styled from "styled-components";

const SmallButton = styled.span`
    ${props => props.theme.fonts.SmallButton};
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.pink2};
    padding: 20px 20px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 10px;
    text-align: center;
    
    width: 198.3px;
    height: 65.29px;
`;

export default SmallButton;
