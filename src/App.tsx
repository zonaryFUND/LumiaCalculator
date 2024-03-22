import React, { useState, useEffect } from 'react';
import style from './App.styl';
import { Tooltip } from "react-tooltip";
import ItemTooltip from "components/tooltip/item-tooltip";
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
      <Tooltip 
        id="weapon"
        className={`${style.tooltip}`}
        events={["click"]}
        render={({ content, activeAnchor }) => content ? <ItemTooltip itemID={content}/> : null}
      />
    </div>
  );
}

export default App;
