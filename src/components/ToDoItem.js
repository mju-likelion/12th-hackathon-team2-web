// components/ToDoItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { schemaPlanner } from '../hooks/ValidationYup';
import CheckButtonOff from '../img/CheckButtonOff.png';
import CheckButtonOn from '../img/CheckButtonOn.png';

const ToDoItem = ({ item, onCheck, onUpdate, editable }) => {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(item.text);
    const [error, setError] = useState('');

    const handleTextClick = () => {
        if (editable) {
            setEditMode(true);
            if (text === '할 일을 입력하세요') {
                setText('');
            }
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= 29) {
            setText(value);
            setError(''); // Clear error message when user starts typing
        } else {
            setError('할 일은 최대 29자까지 입력할 수 있습니다.'); // Set error message
        }
    };

    const handleBlur = async () => {
        if (text.trim() === '') {
            setError('할 일 입력은 필수입니다.');
            return;
        }

        try {
            await schemaPlanner.validate({ text });
            setError('');
            if (text === '') {
                setText('할 일을 입력하세요');
            }
            setEditMode(false);
            onUpdate(item.id, text);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <Item>
            <CheckButton 
                src={item.completed ? CheckButtonOn : CheckButtonOff} 
                alt="Check Button" 
                onClick={() => !item.completed && onCheck(item.id)}
                completed={item.completed.toString()}
            />
            <Content>
                {editMode ? (
                    <EditTextarea 
                        value={text} 
                        onChange={handleTextChange} 
                        onBlur={handleBlur} 
                        onKeyPress={handleKeyPress}
                        autoFocus 
                        rows={1}
                    />
                ) : (
                    <Text onClick={handleTextClick}>{text}</Text>
                )}
            </Content>
            {error && <Error>{error}</Error>}
        </Item>
    );
};

export default ToDoItem;

const Item = styled.div`
    width: 687px;
    min-height: 41px;
    display: flex;
    align-items: center;
    margin: 40px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.pink3};
    position: relative;
`;

const CheckButton = styled.img`
    width: 20px;
    height: 20px;
    opacity: ${({ completed }) => (completed === 'true' ? 0.5 : 1)};
    margin-right: 10px;
`;

const Content = styled.div`
    width: 100%;
`;

const Text = styled.span`
    ${({ theme }) => theme.fonts.semiText};
    cursor: pointer;
`;

const EditTextarea = styled.textarea`
    ${({ theme }) => theme.fonts.semiText};
    border: none;
    outline: none;
    width: 100%;
    resize: none;
    overflow: hidden;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    background: none;
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    position: absolute;
    bottom: -20px;
    left: 10px;
`;
