import styled from "styled-components";

const SmallButton = styled.span`
    ${props => props.theme.fonts.SmallButton};
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.pink2};
    padding: 20px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 20px;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 198.3px;
    height: 65.29px;

    @media (max-width: 1024px) {
        padding: 18px;
        width: 180px;
        height: 60px;
    }

    @media (max-width: 768px) {
        padding: 3px;
        width: 110px;
        height: 35px;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        padding: 3px;
        width: 110px;
        height: 35px;
        font-size: 0.9rem;
    }

    @media (max-width: 360px) {
        padding: 12px;
        width: 120px;
        height: 45px;
        margin-left: 5px;

    }
`;

export default SmallButton;
