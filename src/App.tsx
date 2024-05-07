import React, { useState, useEffect } from 'react';
import Modal from "react-modal"
import Simple from "components/pages/simple";
import { Tooltip } from "react-tooltip";
import ItemTooltip from 'components/tooltip/item-tooltip';
import SubjectSkillTooltip from 'components/tooltip/subject-skill/subject-skill-tooltip';
import Navigation from 'components/pages/navigation/navigation';
import style from "./App.styl";

interface AppProps {}


function App({}: AppProps) {
  React.useLayoutEffect(() => {
    Modal.setAppElement("#root");
  });

  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <>
      <Navigation />
      <Simple />
    </>
  );
}

export default App;
