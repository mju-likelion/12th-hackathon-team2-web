import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { LoginApi } from '../api/Auth/LoginApi';
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
        navigate("/auth/signup");
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        const callbackFunctions = {
            navigateSuccess: handleLoginClick,
            navigateError: (error) => console.error(error)
        };

        try {
            await LoginApi(data, callbackFunctions);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Title>Mutside Out</Title>
                <LoginWrapper>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginText>로그인</LoginText>
                        <Controller name="email" control={control} render={({ field }) => (
                            <InputFieldWrapper>
                                <InputField label="이메일" placeholder="이메일을 입력하세요" error={errors.email?.message} {...field} />
                            </InputFieldWrapper>
                        )}/>
                        <Controller name="password" control={control} render={({ field }) => (
                            <InputFieldWrapper>
                                <InputField label="비밀번호" placeholder="비밀번호를 입력하세요" error={errors.password?.message} {...field} />
                            </InputFieldWrapper>
                        )}/>
                        <BigButtonWrapper>
                            <BigButton type="submit">로그인</BigButton>
                        </BigButtonWrapper>
                    </LoginForm>
                    <SignupWrapper>
                        <NoAccountText>계정이 없으신가요?</NoAccountText>
                        <SmallButton onClick={handleSignupClick}>회원가입</SmallButton>
                    </SignupWrapper>
                </LoginWrapper>
            </Container>
        </ThemeProvider>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    max-width: 587px;
    margin-top: 20px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 40px;
    background: ${props => props.theme.colors.pink2};
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: auto;
    
    @media (max-width: 1024px) {
        padding: 30px;
        border-radius: 20px;
    }
    @media (max-width: 768px) {
        padding: 20px;
        border-radius: 20px;
    }

    @media (max-width: 480px) {
        padding: 10px;
        border-radius: 10px;
    }
`;

const LoginText = styled.h2`
    margin-bottom: 20px;
    ${props => props.theme.fonts.loginText};
    color: ${(props) => props.theme.colors.white};

    @media (max-width: 1024px) {
        font-size: 1.8rem;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 0.7rem;
    }

    @media (max-width: 360px) {
        font-size: 0.6rem;
    }
`;

const InputFieldWrapper = styled.div`
    width: 100%;
`;

const BigButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SignupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 80%;
    margin-top: 20px;
    @media (max-width: 1024px) {
        margin-top: 15px;
        margin-right: 40px;
    }

    @media (max-width: 768px) {
        margin-top: 10px;
        margin-right: 140px;
    }

    @media (max-width: 480px) {
        margin-top: 5px;
    }
`;

const NoAccountText = styled.span`
    ${props => props.theme.fonts.noAccountText};
    color: ${(props) => props.theme.colors.black};
    margin-right: 10px;

    @media (max-width: 1024px) {
        margin-right: 15px;
    }

    @media (max-width: 768px) {
        margin-right: 8px;
    }
`;
