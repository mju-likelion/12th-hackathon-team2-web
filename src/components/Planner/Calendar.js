import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Calendar = () => {
  const [completedCounts, setCompletedCounts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const mockData = {
      '2024-07-01': 0,
      '2024-07-02': 1,
      '2024-07-03': 2,
      '2024-07-04': 3,
      '2024-07-05': 4,
      '2024-07-06': 2,
      '2024-07-07': 1,
      '2024-07-08': 3,
      '2024-07-09': 4,
      '2024-07-10': 0,
      '2024-07-11': 1,
      '2024-07-12': 2,
      '2024-07-13': 3,
      '2024-07-14': 4,
    };

    setCompletedCounts(mockData);
  }, []);

  const getCurrentMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const monthData = [];
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      monthData.push({
        date: dateString,
        day: d.getDate(),
        count: completedCounts[dateString] || 0,
      });
    }

    const firstDayIndex = (startOfMonth.getDay() + 6) % 7;
    for (let i = 0; i < firstDayIndex; i++) {
      monthData.unshift({ date: null, day: null, count: null });
    }

    while (monthData.length % 7 !== 0) {
      monthData.push({ date: null, day: null, count: null });
    }

    return monthData;
  };

  const calendarData = getCurrentMonthData();
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

  const getColor = (count) => {
    if (count === null) return Theme.colors.gray;
    if (count === 0) return Theme.colors.white;
    if (count === 1) return Theme.colors.pink1;
    if (count >= 2 && count <= 3) return Theme.colors.pink2;
    return Theme.colors.pink3;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <OuterContainer>
      <HeaderContainer>
        <Title>캘린더</Title>
      </HeaderContainer>
      <CalendarContainer>
        <MonthTitleContainer>
          <MonthButton onClick={handlePrevMonth}>이전</MonthButton>
          <MonthTitle>
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </MonthTitle>
          <MonthButton onClick={handleNextMonth}>다음</MonthButton>
        </MonthTitleContainer>
        <DaysOfWeek>
          {daysOfWeek.map((day) => (
            <DayOfWeek key={day}>{day}</DayOfWeek>
          ))}
        </DaysOfWeek>
        <CalendarGrid>
          {calendarData.map(({ date, day, count }) => (
            <CalendarCell
              key={date || Math.random()}
              color={getColor(count)}
              title={date ? `${date}: ${count} completed` : ''}
            >
              <DateLabel>{day}</DateLabel>
            </CalendarCell>
          ))}
        </CalendarGrid>
      </CalendarContainer>
    </OuterContainer>
  );
};

export default Calendar;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1082px;
  margin: 2vh;
`;

const HeaderContainer = styled.div`
  margin: 2vh;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.subTitle};
  display: flex;
  align-items: center;
`;

const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.colors.pink1};
  padding: 4vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MonthTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const MonthTitle = styled.h2`
  margin: 0 10px;
`;

const MonthButton = styled.button`
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.pink2};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink2};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const DaysOfWeek = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const DayOfWeek = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const CalendarCell = styled.div`
  height: 3vh;
  border: 1px solid #ddd;
  background-color: ${(props) => props.color};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DateLabel = styled.div`
  font-size: 0.75em;
  color: black;
  position: absolute;
  top: 5px;
  left: 5px;
`;
