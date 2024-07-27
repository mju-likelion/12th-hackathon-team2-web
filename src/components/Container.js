import styled from 'styled-components';
import LoginJoinbackground from '../img/LoginJoinbackground.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url(${LoginJoinbackground}) no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 20px;
`;

export default Container;
