import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Button from "../components/BigButton";
import Container from "../components/Container";
import InputField from "../components/InputField";
import Title from "../components/Title";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme.js";

const Join = () => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/');
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Title>멋사이드 아웃</Title>
                <SignupForm>
                    <SignupText>회원가입</SignupText>
                    <InputField label="이메일" placeholder="abcd@email.com" />
                    <InputField label="비밀번호" placeholder="password" type="password" />
                    <InputField label="비밀번호 확인" placeholder="password" type="password" />
                    <InputField label="닉네임" placeholder="nickname" />
                    <Button onClick={handleJoinClick}>가입하기</Button>
                </SignupForm>
            </Container>
        </ThemeProvider>
    );
};

export default Join;

const SignupForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    background: ${(props) => props.theme.colors.pink2};
    border-radius: 30px;
`;

const SignupText = styled.h2`
    ${Theme.fonts.signupText};
    margin-bottom: 20px;
    ${props => props.theme.fonts.loginText};
    color: ${(props) => props.theme.colors.white};
`;