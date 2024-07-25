import React from "react";
import styled from "styled-components";

const InputField = React.forwardRef(({ label, placeholder, type = "text", error, attemptedSubmit, ...props }, ref) => {
    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <InputContainer>
                <StyledInputField ref={ref} type={type} placeholder={placeholder} hasError={!!error} {...props} />
                <ErrorText showError={!!error}>
                    {error || ' '}
                </ErrorText>
            </InputContainer>
        </InputWrapper>
    );
});

InputField.displayName = "InputField";

export default InputField;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 34px;

    @media (max-width: 1024px) {
        margin-bottom: 30px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 25px;
    }

    @media (max-width: 480px) {
        margin-bottom: 20px;
    }
`;

const InputLabel = styled.label`
    ${props => props.theme.fonts.inputLabel};
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    margin-right: 10px;
    text-align: center;
    @media (max-width: 1024px) {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        text-align: left;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const StyledInputField = styled.input`
    box-sizing: border-box;
    width: 330px;
    height: 50px;
    border: 1px solid #C2C2C2;
    border-radius: 20px;
    padding: 20px;
    ${props => props.theme.fonts.inputField};
    color: ${(props) => props.theme.colors.black};
    border: 1px solid ${(props) => props.theme.colors.borderGray};
    border-radius: 20px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: ${(props) => (props.hasError ? '10px' : '0')};

    @media (max-width: 1024px) {
        width: 300px;
        height: 48px;
    }

    @media (max-width: 768px) {
        width: 300px;
        height: 45px;
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 15px;
    }

    @media (max-width: 360px) {
        height: 35px;
        padding: 10px;
    }
`;

const ErrorText = styled(({ showError, ...rest }) => <span {...rest} />)`
    ${props => props.theme.fonts.helperText};
    color: ${(props) => (props.showError ? props.theme.colors.blue : props.theme.colors.black)};
    margin-left: 10px;
    width: 300px;
    height: 0px;
    font-size: 0.7rem;
`;
