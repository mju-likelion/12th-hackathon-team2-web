import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlannersCalendarGetApi } from '../api/Planners/PlannersCalendarGetApi.js';
import Header from '../components/Header';
import PlannerHeader from '../components/Planner/PlannerHeader';
import PlannerTabs from '../components/Planner/PlannerTabs';
import PlannerTopBar from '../components/Planner/PlannerTopBar';
import { Theme } from '../styles/Theme';

const CalendarView = ({ totalDone }) => {
  const [completedCounts, setCompletedCounts] = useState({});
  const { month } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('calendar');

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const data = await PlannersCalendarGetApi(month);
        const dailyList = data.dailyList.reduce((acc, { date, statsGrade }) => {
          acc[date] =
            statsGrade === 'LEVEL1' ? 1 : statsGrade === 'LEVEL2' ? 2 : 3;
          return acc;
        }, {});
        setCompletedCounts(dailyList);
      } catch (error) {
        console.error('Failed to fetch calendar data:', error);
      }
    };

    fetchCalendarData();
  }, [month]);

  const getCurrentMonthData = () => {
    const year = new Date(month).getFullYear();
    const currentMonth = new Date(month).getMonth();
    const startOfMonth = new Date(year, currentMonth, 1);
    const endOfMonth = new Date(year, currentMonth + 1, 0);

    const monthData = [];
    for (
      let d = new Date(startOfMonth);
      d <= endOfMonth;
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = d.toISOString().split('T')[0];
      monthData.push({
        date: dateString,
        day: d.getDate(),
        count: completedCounts[dateString] || 0,
      });
    }

    const firstDayIndex = startOfMonth.getDay();
    for (let i = 0; i < firstDayIndex; i++) {
      monthData.unshift({ date: null, day: null, count: null });
    }

    while (monthData.length % 7 !== 0) {
      monthData.push({ date: null, day: null, count: null });
    }

    return monthData;
  };

  const calendarData = getCurrentMonthData();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const getColor = (count) => {
    if (count === null) return Theme.colors.gray;
    if (count === 0) return Theme.colors.white;
    if (count === 1) return Theme.colors.pink1;
    if (count === 2) return Theme.colors.pink2;
    return Theme.colors.pink3;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      new Date(month).setMonth(new Date(month).getMonth() - 1)
    );
    navigate(`/planners/calendar/${prevMonth.toISOString().slice(0, 7)}`);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      new Date(month).setMonth(new Date(month).getMonth() + 1)
    );
    navigate(`/planners/calendar/${nextMonth.toISOString().slice(0, 7)}`);
  };

  return (
    <Div>
      <Header />
      <PageContainer>
        <PlannerHeader />
        <PlannerContainer>
          <PlannerTopBar totalDone={totalDone} />
          <Content>
            <PlannerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <InnerContent>
              <CalendarContainer>
                <MonthTitleContainer>
                  <MonthButton onClick={handlePrevMonth}>이전</MonthButton>
                  <MonthTitle>
                    {new Date(month).toLocaleString('default', {
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
            </InnerContent>
          </Content>
        </PlannerContainer>
      </PageContainer>
    </Div>
  );
};

export default CalendarView;

const CalendarContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 4vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
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
const Div = styled.div`
  width: 100vw;
  padding: 2vh;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh;
  position: relative;
`;

const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.pink1};
  border-radius: 20px;
  width: 100%;
  max-width: 1082px;
  min-height: 453px;
  margin-top: 2vh;
  padding: 4vh;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 462px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 300px;
    padding: 2vh;
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const InnerContent = styled.div`
  width: 100%;
  height: 60vh;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 50vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 40vh;
  }
`;
