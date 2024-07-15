import React from "react";
import styled from "styled-components";

const InputField = ({ label, placeholder, type = "text" }) => {
    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <StyledInputField type={type} placeholder={placeholder} />
        </InputWrapper>
    );
};

export default InputField;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 34px;
`;

const InputLabel = styled.label`
    ${props => props.theme.fonts.inputLabel};
    color: ${(props) => props.theme.colors.white};
    width: 150px;
    text-align: center;
`;

const StyledInputField = styled.input`
    box-sizing: border-box;
    width: 397px;
    height: 58px;
    border: 1px solid #C2C2C2;
    border-radius: 20px;
    padding: 20px;
    ${props => props.theme.fonts.inputField};
    color: ${(props) => props.theme.colors.gray};
    border: 1px solid ${(props) => props.theme.colors.borderGray};
    border-radius: 20px;
    background: ${(props) => props.theme.colors.white};
    flex: 1;
`;