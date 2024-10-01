import * as React from "react";
import { Tooltip } from "react-tooltip";

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
import { SubjectSideContext } from "components/subjects/subject-side";

import ItemTooltip from "components/tooltip/item/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import { SubjectSkillProps } from "components/subjects/props";

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

    const damageInFormula = React.useState(false);

    const { width } = useWindowSize();
    const parentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    return (
        <main className={style.combat} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <CollapseTab collapse={collapse}>
                    <SubjectSideContext.Provider value="left">
                        <Subject
                            {...leftConfig}
                            status={leftStatus}
                            config={leftConfig.value}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                    <Damage leftStatus={leftStatus} rightStatus={rightStatus} leftConfig={leftConfig.value} rightConfig={rightConfig.value} leftHP={leftHP} rightHP={rightHP} />
                    <SubjectSideContext.Provider value="right">
                        <Subject
                            {...rightConfig}
                            status={rightStatus}
                            config={rightConfig.value}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                </CollapseTab>
            </div>
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const [subject, skill] = content?.split("-");
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');

                    return (
                        <SubjectSkillTooltip
                            id={subject} 
                            skill={skill as any} 
                            showEquation={damageInFormula[0]}
                            status={side == "left" ? leftStatus : rightStatus} 
                            config={side == "left" ? leftConfig.value : rightConfig.value} 
                        />
                    );
                }}
            />
            <Tooltip 
                id="weapon-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');
                    return (
                        <WeaponSkillTooltip 
                            showEquation={damageInFormula[0]}
                            status={side == "left" ? leftStatus : rightStatus} 
                            config={side == "left" ? leftConfig.value : rightConfig.value} 
                        />
                    );
                }}
            />
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;

                    const [item, onSlot] = content.split("%");
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');

                    const props: SubjectSkillProps = {
                        showEquation: damageInFormula[0] || onSlot == undefined,
                        config: side == "left" ? leftConfig.value : rightConfig.value,
                        status: side == "left" ? leftStatus : rightStatus
                    };

                    return <ItemTooltip itemID={item} {...props} />;
                }}
            />  
        </main>
    )
};

export default index;