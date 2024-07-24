import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
    width: 100%;
    padding: 15px;
    ${props => props.theme.fonts.SmallButton};
    color: ${(props) => props.theme.colors.black};
    background: ${(props) => props.theme.colors.pink1};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    

    @media (max-width: 1024px) {
        padding: 14px;
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        padding: 12px;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        padding: 10px;
        font-size: 0.9rem;
    }

`;
