import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SmallButton from '../components/SmallButton';
import BackgroundImage from '../img/NotFound.svg';

const NotFound = () => {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/main');
    };

    return (
        <BackgroundImg>
            <StyledSmallButton onClick={goToMain}>메인으로</StyledSmallButton>
        </BackgroundImg>
    );
}

export default NotFound;

const BackgroundImg = styled.div`
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100vh;
    min-height: 851px;
`;

const StyledSmallButton = styled(SmallButton)`
    margin-bottom: 150px;
`;
