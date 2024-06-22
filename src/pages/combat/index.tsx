import * as React from "react";
import CollapseTab from "components/common/collapse-tab";
import Subject from "./subject";
import Damage from "./damage";
import useSubjectConfig from "app-types/subject-dynamic/config/use-subject-config";
import { useLocalStorage, useWindowSize } from "react-use";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { CombatCurrentLeftConfigKey, CombatCurrentRightConfigKey } from "@app/storage/combat";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import style from "./index.module.styl";
import { styles } from "@app/util/style";

const index: React.FC = props => {
    const [collapse, setCollapse] = React.useState(false);
    const [storageConfigLeft, saveConfigLeft] = useLocalStorage<SubjectConfig>(CombatCurrentLeftConfigKey);
    const leftConfig = useSubjectConfig({value: storageConfigLeft, update: saveConfigLeft});
    const leftStatus = useStatus(leftConfig.value);
    const [leftHP, setLeftHP] = React.useState(0);

    const [storageConfigRight, saveConfigRight] = useLocalStorage<SubjectConfig>(CombatCurrentRightConfigKey);
    const rightConfig = useSubjectConfig({value: storageConfigRight, update: saveConfigRight});
    const rightStatus = useStatus(rightConfig.value);
    const [rightHP, setRightHP] = React.useState(0);


    const { width } = useWindowSize();
    const parentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    return (
        <main className={style.combat} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <CollapseTab collapse={collapse}>
                    <Subject
                        {...leftConfig}
                        status={leftStatus}
                        config={leftConfig.value}
                        hideHeader={collapse}
                    />
                    <Damage leftStatus={leftStatus} rightStatus={rightStatus} leftConfig={leftConfig.value} rightConfig={rightConfig.value} leftHP={leftHP} rightHP={rightHP} />
                    <Subject
                        {...rightConfig}
                        status={rightStatus}
                        config={rightConfig.value}
                        hideHeader={collapse}
                    />
                </CollapseTab>
            </div>
        </main>
    )
};

export default index;