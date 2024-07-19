import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import BigButton from "../components/BigButton";
import Container from "../components/Container";
import InputField from "../components/InputField";
import SmallButton from "../components/SmallButton";
import Title from "../components/Title";
import { schemaLogin } from '../hooks/ValidationYup';
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme.js";

const Login = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/main");
    };

    const handleSignupClick = () => {
        navigate("/join");
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log(data);
        handleLoginClick();
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Title>Mutside Out</Title>
                <LoginForm onSubmit={handleSubmit(onSubmit)}>
                    <LoginText>로그인</LoginText>
                    <InputFieldWrapper>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label="이메일"
                                    placeholder="abcd@email.com"
                                    error={errors.email?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="pw"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label="비밀번호"
                                    placeholder="password"
                                    type="password"
                                    error={errors.pw?.message}
                                    {...field}
                                />
                            )}
                        />
                        <BigButton type="submit">로그인</BigButton>
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

const LoginForm = styled.form`
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
    align-items: flex-start;
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
