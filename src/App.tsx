import React, { useState, useEffect } from 'react';
import style from './App.styl';
import Subject from "components/subject/subject";

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className={style.App}>
      <Subject />
    </div>
  );
}

export default App;
