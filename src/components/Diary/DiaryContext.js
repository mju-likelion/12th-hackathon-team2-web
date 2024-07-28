import React, { createContext, useContext, useState } from 'react';

const DiaryContext = createContext();

export const useDiary = () => useContext(DiaryContext);

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([
    {
      title: 'example title 1',
      date: '2024.07.13',
      content: 'This is a detailed content of the diary entry 1.',
    },
  ]);

  const editEntry = (index, updatedEntry) => {
    const newEntries = entries.map((entry, i) =>
      i === index ? updatedEntry : entry
    );
    setEntries(newEntries);
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  return (
    <DiaryContext.Provider
      value={{ entries, setEntries, editEntry, deleteEntry }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
