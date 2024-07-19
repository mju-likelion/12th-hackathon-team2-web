import React from "react";
import styled from "styled-components";

const InputField = ({ label, placeholder, type = "text", error, attemptedSubmit, ...props }) => {
    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <InputContainer>
                <StyledInputField type={type} placeholder={placeholder} {...props} />
                <ErrorText hasError={!!error}>
                    {error || ' '}
                </ErrorText>
            </InputContainer>
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
    width: 140px;
    text-align: center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const StyledInputField = styled.input`
    box-sizing: border-box;
    width: 379px;
    height: 58px;
    border: 1px solid #C2C2C2;
    border-radius: 20px;
    padding: 20px;
    ${props => props.theme.fonts.inputField};
    color: ${(props) => props.theme.colors.black};
    border: 1px solid ${(props) => props.theme.colors.borderGray};
    border-radius: 20px;
    background: ${(props) => props.theme.colors.white};
`;

const ErrorText = styled.span`
    ${props => props.theme.fonts.helperText};
    color: ${(props) => (props.hasError ? props.theme.colors.blue : props.theme.colors.black)};
    position: absolute;
    top: 100%;
    left: 5%;
    transform: translateY(10px);
`;
