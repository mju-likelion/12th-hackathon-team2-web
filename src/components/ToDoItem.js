import React, { useState } from 'react';
import styled from 'styled-components';
import CheckButtonOff from '../img/CheckButtonOff.png';
import CheckButtonOn from '../img/CheckButtonOn.png';

const ToDoItem = ({ item, onCheck, onUpdate, editable }) => {
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(item.text);

    const handleTextClick = () => {
        if (editable) {
            setEditMode(true);
            if (text === '할 일을 입력하세요') {
                setText('');
            }
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        if (text === '') {
            setText('할 일을 입력하세요');
        }
        setEditMode(false);
        onUpdate(item.id, text);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <Item completed={item.completed}>
            <CheckButton 
                src={item.completed ? CheckButtonOn : CheckButtonOff} 
                alt="Check Button" 
                onClick={() => !item.completed && onCheck(item.id)}
                completed={item.completed}
            />
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
`;

const CheckButton = styled.img`
    width: 20px;
    height: 20px;
    opacity: ${({ completed }) => (completed ? 0.5 : 1)};
    margin-right: 10px;
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
