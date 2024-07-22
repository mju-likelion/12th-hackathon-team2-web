import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { SignupApi } from '../api/Auth/SignupApi';
import Button from "../components/BigButton";
import Container from "../components/Container";
import InputField from "../components/InputField";
import Title from "../components/Title";
import { schemaSignup } from '../hooks/ValidationYup';
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme.js";

const Signup = () => {
    const navigate = useNavigate();
    const [attemptedSubmit] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaSignup),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        SignupApi(data, callbackFunctions);
    };

    const callbackFunctions = {
        navigateSuccess: () => {
            alert('이메일을 확인해주세요. 이메일 인증이 완료되면 회원가입이 완료됩니다!');
            navigate('/');
        },
        navigateError: (error) => {
            if (error.response && error.response.status === 409) {
                alert('이미 사용중인 이메일입니다. 다른 이메일을 입력해주세요.');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        },
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Title>Mutside Out</Title>
                <SignupForm onSubmit={handleSubmit(onSubmit)}>
                    <SignupText>회원가입</SignupText>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="이메일"
                                placeholder="abcd@email.com"
                                error={errors.email?.message}
                                attemptedSubmit={attemptedSubmit}
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
                                attemptedSubmit={attemptedSubmit}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="checkPw"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="비밀번호 확인"
                                placeholder="password"
                                type="password"
                                error={errors.checkPw?.message}
                                attemptedSubmit={attemptedSubmit}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="nickname"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="닉네임"
                                placeholder="nickname"
                                error={errors.nickname?.message}
                                attemptedSubmit={attemptedSubmit}
                                {...field}
                            />
                        )}
                    />
                    <Button type="submit">가입하기</Button>
                </SignupForm>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 40px;
    background: ${(props) => props.theme.colors.pink2};
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SignupText = styled.h2`
    ${Theme.fonts.signupText};
    margin-bottom: 20px;
    ${props => props.theme.fonts.loginText};
    color: ${(props) => props.theme.colors.white};
`;
