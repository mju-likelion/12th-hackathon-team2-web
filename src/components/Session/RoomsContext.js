import React, { createContext, useContext, useState } from 'react';

const RoomsContext = createContext();

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
    const initialRooms = [
        
    ];

    const [rooms, setRooms] = useState(initialRooms);

    return (
        <RoomsContext.Provider value={{ rooms, setRooms }}>
            {children}
        </RoomsContext.Provider>
    );
};
