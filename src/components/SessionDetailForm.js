import React from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

const SessionDetailForm = ({ children }) => {
    return (
        <SessionForm>
            <Input placeholder="title" />
            <Input placeholder="Link" />
            <TextArea placeholder="content" />
            {children}
        </SessionForm>
    );
};

export default SessionDetailForm;

const SessionForm = styled.form`
    align-items: center;
    margin-top: 58px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 741px;
`;

const Input = styled.input`
    ${Theme.fonts.inputLabel};
    padding: 10px;
    margin-bottom: 12px;
    border: 3px solid ${Theme.colors.pink2};
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
    width: 997px;
    height: 72px;
    background: ${Theme.colors.white};

    &::placeholder {
        color: ${Theme.colors.gray};
    }
`;

const TextArea = styled.textarea`
    ${Theme.fonts.inputLabel};
    padding: 10px;
    margin-bottom: 32px;
    border: 3px solid ${Theme.colors.pink2};
    border-radius: 10px;
    outline: none;
    height: 150px;
    resize: none;
    box-sizing: border-box;
    width: 997px;
    height: 368px;
    background: ${Theme.colors.white};

    &::placeholder {
        color: ${Theme.colors.gray};
    }
`;
