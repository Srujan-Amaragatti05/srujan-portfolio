import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorMode, setCursorMode] = useState("default");

  return (
    <CursorContext.Provider value={{ cursorMode, setCursorMode }}>
      {children}
    </CursorContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCursor() {
  return useContext(CursorContext);
}