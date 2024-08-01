import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { LoginApi } from '../api/Auth/LoginApi';
import AlertModal from '../components/AlertModal';
import BigButton from '../components/BigButton';
import Container from '../components/Container';
import InputField from '../components/InputField';
import SmallButton from '../components/SmallButton';
import Title from '../components/Title';
import { schemaLogin } from '../hooks/ValidationYup';
import GlobalStyle from '../styles/GlobalStyle';
import { Theme } from '../styles/Theme.js';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLoginClick = () => {
    navigate('/main');
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const callbackFunctions = {
      navigateSuccess: handleLoginClick,
      navigateError: (errorMessage) => {
        setModalMessage('로그인에 실패했습니다. \n' + errorMessage);
        setIsModalOpen(true);
      },
    };

    try {
      await LoginApi(data, callbackFunctions);
    } catch (error) {
      console.error(error);
      setModalMessage('로그인에 실패했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleModalClose();
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        <Title>MUTSIDE OUT</Title>
        <LoginWrapper>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginText>로그인</LoginText>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputFieldWrapper>
                  <InputField
                    label='이메일'
                    placeholder='이메일을 입력하세요'
                    error={errors.email?.message}
                    {...field}
                  />
                </InputFieldWrapper>
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <InputFieldWrapper>
                  <InputField
                    label='비밀번호'
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    error={errors.password?.message}
                    {...field}
                  />
                </InputFieldWrapper>
              )}
            />
            <BigButtonWrapper>
              <BigButton type='submit'>로그인</BigButton>
            </BigButtonWrapper>
          </LoginForm>
          <SignupWrapper>
            <NoAccountText>계정이 없으신가요?</NoAccountText>
            <SmallButton onClick={handleSignupClick}>회원가입</SmallButton>
          </SignupWrapper>
        </LoginWrapper>
      </Container>
      <AlertModal
        isOpen={isModalOpen}
        close={handleModalClose}
        message={modalMessage}
        handleConfirm={handleModalConfirm}
      />
    </ThemeProvider>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  justify-content: center;
  max-width: 587px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: ${(props) => props.theme.colors.pink2};
  border-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 30px;
    border-radius: 20px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
    border-radius: 20px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px;
    border-radius: 15px;
    width: 90%;
  }
`;

const LoginText = styled.h2`
  margin-bottom: 20px;
  ${(props) => props.theme.fonts.loginText};
  color: ${(props) => props.theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
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
  width: 514px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 15px;
    margin-right: 40px;
    width: 494px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 15px;
    width: 394px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 10px;
    width: 314px;
  }
`;

const NoAccountText = styled.span`
  color: ${(props) => props.theme.colors.black};
  margin-right: 10px;
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 5px;
    ${(props) => props.theme.fonts.noAccountText};
  }
`;
