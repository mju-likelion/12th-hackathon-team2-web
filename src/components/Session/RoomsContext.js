import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchRooms } from '../../api/Rooms/RoomsPageGetApi';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const loadRooms = async (page) => {
    try {
      const { rooms, totalPages, currentPage } = await fetchRooms(page);
      setRooms(rooms);
      setTotalPages(totalPages);
      setCurPage(currentPage);
    } catch (error) {
      console.error('방 데이터 로드 실패:', error);
    }
  };

  useEffect(() => {
    console.log(curPage);
    loadRooms(curPage);
  }, [curPage]);

  return (
    <RoomsContext.Provider
      value={{ rooms, totalPages, curPage, setCurPage, loadRooms }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
