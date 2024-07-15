import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import BigButton from "../components/BigButton";
import Container from "../components/Container";
import InputField from "../components/InputField";
import SmallButton from "../components/SmallButton";
import Title from "../components/Title";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme.js";

const Login = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/join");
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Title>Mutside Out</Title>
                <LoginForm>
                    <LoginText>로그인</LoginText>
                    <InputFieldWrapper>
                        <InputField label="이메일" placeholder="abcd@email.com" />
                        <InputField label="비밀번호" placeholder="password" type="password" />
                        <BigButton>로그인</BigButton>
                    </InputFieldWrapper>
                </LoginForm>
                <SignupWrapper>
                    <NoAccountText>계정이 없으신가요?</NoAccountText>
                    <SmallButton onClick={handleSignupClick}>회원가입</SmallButton>
                </SignupWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default Login;

const LoginForm = styled.div`
    width: 587px;
    padding: 40px;
    background: ${(props) => props.theme.colors.pink2};
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LoginText = styled.h2`
    margin-bottom: 20px;
    ${props => props.theme.fonts.loginText};
    color: ${(props) => props.theme.colors.white};
`;

const InputFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;


const SignupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 587px;
    margin-top: 20px;
`;


const NoAccountText = styled.span`
    ${props => props.theme.fonts.noAccountText};
    color: ${(props) => props.theme.colors.black};
`;