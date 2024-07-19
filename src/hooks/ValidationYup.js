import * as yup from 'yup';

export const schemaJoin = yup.object().shape({
  email: yup
    .string()
    .required('사용하실 이메일을 입력해주세요.')
    .email('이메일형식에 맞지 않습니다.'),
  pw: yup
    .string()
    .required('문자와 숫자를 조합하여 8~14자 사이로 입력해주세요.')
    .max(14, '비밀번호는 최대 14자리로 입력해주세요.')
    .matches(
      /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      '문자와 숫자를 조합하여 8~14자 사이로 입력해주세요.'
    ),
  checkPw: yup
    .string()
    .oneOf([yup.ref('pw'), null], '비밀번호가 일치하지 않습니다.')
    .required('입력하신 비밀번호를 한번 더 입력해주세요.'),
  nickname: yup
    .string()
    .required('사용하실 닉네임을 입력해주세요.')
    .matches(
      /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
      '영문과 숫자 또는 한글로 조합하여 2~16 글자 이하로 입력해주세요.'
    ),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required('사용하실 이메일을 입력해주세요.')
    .email('이메일형식에 맞지 않습니다.'),
  pw: yup
    .string()
    .required('문자와 숫자를 조합하여 8~14자 사이로 입력해주세요.')
    .max(14, '비밀번호는 최대 14자리로 입력해주세요.')
    .matches(
      /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      '문자와 숫자를 조합하여 8~14자 사이로 입력해주세요.'
    ),
});
