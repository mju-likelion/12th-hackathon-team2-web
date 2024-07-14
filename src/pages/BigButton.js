import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width: 100%;
    padding: 15px;
    ${props => props.theme.fonts.BigButton};
    color: ${(props) => props.theme.colors.black};
    background: ${(props) => props.theme.colors.pink1};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 62px;
`;

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
