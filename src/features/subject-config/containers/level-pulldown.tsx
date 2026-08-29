import * as React from "react";
import { useSubjectStateStore } from "../store";
import PullDown from "@app/components/common/pull-down";

const LevelPulldown: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const setLevel = useSubjectStateStore(s => s.setLevel);

    return (
        <PullDown label="Lv" value={{max: 20, current: config.level, set: setLevel}} layout="config" />
    )
}

export default LevelPulldown;
