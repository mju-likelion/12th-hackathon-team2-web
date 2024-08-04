import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlannersCalendarGetApi } from '../../api/Planners/PlannersCalendarGetApi.js';
import Header from '../../components/Header.js';
import PlannerHeader from '../../components/Planner/PlannerHeader.js';
import PlannerTabs from '../../components/Planner/PlannerTabs.js';
import PlannerTopBar from '../../components/Planner/PlannerTopBar.js';
import { Theme } from '../../styles/Theme.js';

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
          const adjustedDate = new Date(date);
          adjustedDate.setDate(adjustedDate.getDate() - 1);
          const dateString = adjustedDate.toISOString().split('T')[0];
          acc[dateString] =
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
    if (count === null) return '#ddd';
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
                  <MonthButton onClick={handlePrevMonth}>
                    <FaChevronLeft />
                  </MonthButton>
                  <MonthTitle>
                    {new Date(month).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </MonthTitle>
                  <MonthButton onClick={handleNextMonth}>
                    <FaChevronRight />
                  </MonthButton>
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
  padding: 2vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 30px auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 auto;
  }
  @media (max-height: 810px) {
    margin: 0 auto;
  }
`;

const MonthTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MonthTitle = styled.h2`
  margin: 0 20px;
  text-align: center;
  flex-grow: 1;
  width: 100%;
  min-width: 80px;
  ${(props) => props.theme.fonts.default};
  font-size: 1.5em;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1em;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;

const MonthButton = styled.button`
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.pink2};
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink2};
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5px 10px;
    font-size: 13px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5px 5px;
    font-size: 10px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5px 0;
    font-size: 0.8em;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  gap: 1vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0.5vh;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.5vh;
  }
`;

const CalendarCell = styled.div`
  height: 7vh;
  border: 1px solid #ddd;
  background-color: ${(props) => props.color};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 5vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 4vh;
    font-size: 0.6em;
  }
`;

const DateLabel = styled.div`
  font-size: 0.75em;
  color: black;
  position: absolute;
  top: 5px;
  left: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 4vh;
    font-size: 0.6em;
  }
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
  /* min-height: 453px; */
  margin-top: 2vh;
  padding: 4vh;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 462px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 320px;
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
  /* min-height: 60vh; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
