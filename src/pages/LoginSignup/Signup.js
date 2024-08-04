import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { SignupApi } from '../../api/Auth/SignupApi';
import AlertModal from '../../components/AlertModal';
import Button from '../../components/BigButton';
import Container from '../../components/Container';
import InputField from '../../components/InputField';
import Title from '../../components/Title';
import { schemaSignup } from '../../hooks/ValidationYup';
import GlobalStyle from '../../styles/GlobalStyle';
import { Theme } from '../../styles/Theme';

const Signup = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(
    () => () => setModalOpen(false)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: 'onChange',
  });

  const callbackFunctions = {
    navigateSuccess: () => {
      setModalMessage(
        '회원가입이 완료되었습니다! \n확인 버튼을 누르면 설문 조사가 시작됩니다. \n설문조사는 회원가입시 1회만 진행됩니다.'
      );
      setConfirmAction(() => () => navigate('/surveys'));
      setModalOpen(true);
    },
    navigateError: (error) => {
      if (error.response && error.response.status === 409) {
        if (error.response.data.message === '이미 사용 중인 이름입니다.') {
          setModalMessage(
            '이미 사용중인 닉네임입니다. \n다른 닉네임을 입력해주세요.'
          );
        } else {
          setModalMessage(
            '이미 사용중인 이메일입니다. \n다른 이메일을 입력해주세요.'
          );
        }
      } else {
        setModalMessage('회원가입에 실패했습니다. \n다시 시도해주세요.');
      }
      setConfirmAction(() => () => setModalOpen(false));
      setModalOpen(true);
    },
  };

  const onSubmit = (data) => {
    SignupApi(data, callbackFunctions);
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        <Title>MUTSIDE OUT</Title>
        <SignupForm onSubmit={handleSubmit(onSubmit)}>
          <SignupText>회원가입</SignupText>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputField
                label='이메일'
                placeholder='이메일을 입력하세요'
                error={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name='pw'
            control={control}
            render={({ field }) => (
              <InputField
                label='비밀번호'
                placeholder='비밀번호를 입력하세요'
                type='password'
                error={errors.pw?.message}
                {...field}
              />
            )}
          />
          <Controller
            name='checkPw'
            control={control}
            render={({ field }) => (
              <InputField
                label='비밀번호 확인'
                placeholder='비밀번호를 확인하세요'
                type='password'
                error={errors.checkPw?.message}
                {...field}
              />
            )}
          />
          <Controller
            name='nickname'
            control={control}
            render={({ field }) => (
              <InputField
                label='닉네임'
                placeholder='닉네임을 입력하세요'
                error={errors.nickname?.message}
                {...field}
              />
            )}
          />
          <Button type='submit'>가입하기</Button>
        </SignupForm>
        {modalOpen && (
          <AlertModal
            isOpen={modalOpen}
            close={() => setModalOpen(false)}
            message={modalMessage}
            handleConfirm={confirmAction}
          />
        )}
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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 20px;
    border-radius: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px;
    border-radius: 10px;
  }
`;

const SignupText = styled.h2`
  ${(props) => props.theme.fonts.loginText};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }

  @media (max-width: 360px) {
    font-size: 1rem;
  }
`;
