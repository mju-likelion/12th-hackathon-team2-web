import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRooms } from '../../api/Rooms/RoomsPageGetApi';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms(currentPage);
        setRooms(data.data.roomList);
        setTotalPages(data.data.pagination.totalPage);
      } catch (error) {
        console.error('세션 조회 실패', error);
      }
    };

    loadRooms();
  }, [currentPage]);

  return (
    <RoomsContext.Provider
      value={{ rooms, totalPages, currentPage, setCurrentPage }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  return useContext(RoomsContext);
};
