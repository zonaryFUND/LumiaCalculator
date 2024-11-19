import * as React from "react";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { SubjectCodeWithOldID } from "app-types/subject-static";
import { SkillCode, SkillKey, SubjectSkillListExpressionDictionary } from "./dictionary";
import style from "./skills.module.styl";
import Images from "@app/resources/image";
import { SubjectSideContext } from "./subject-side";
import PullDown from "components/common/pull-down";

type SkillListProps = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}
export const SkillListContext = React.createContext<SkillListProps | null>(null);

const Skill: React.FC<{code: SkillCode}> = ({code}) => {
    const side = React.useContext(SubjectSideContext);

    return (
        <img 
            src={Images.skill[code]} 
            data-tooltip-id="subject-skill" 
            data-tooltip-content={`${code}`}
            data-tooltip-subject-side={side}
        />
    );
}

const SkillLevelConfigurator: React.FC<{skill: "Q" | "W" | "E" | "R" | "T", max?: number}> = props => {
    const context = React.useContext(SkillListContext);

    const value = context!.config.skillLevels[props.skill];
    const max = (() => {
        if (props.max) return props.max;
        return props.skill == "R" || props.skill == "T" ? 3 : 5;
    })();

    const onChange = React.useCallback((to: number) => {
        context!.setSkillLevels(prev => ({...prev, [props.skill]: to - 1}))
    }, [])

    return (
        <div className={style.configurator}>
            <PullDown value={{max, current: value + 1, set: onChange}} layout="skill" />
        </div>
    )
}

type Props = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

const subjectSkills: React.FC<Props> = props => {
    console.log(props.config.subject)
    const list = SubjectSkillListExpressionDictionary[props.config.subject](props.config);
    
    return (
        <div className={style.skills}>
            <SkillListContext.Provider value={props}>
            {
                (["Q", "W", "E", "R", "T"] as SkillKey[]).map(skill => (
                    <div key={skill} className={style.vertical}>
                        {
                            (Array.isArray(list[skill]) ? list[skill] : [list[skill]]).map(code => <Skill key={code} code={code} />)
                        }
                    </div>
                ))
            }
            {/*<WeaponSkill id={props.weaponType} />*/}
            {
                (["Q", "W", "E", "R", "T"] as SkillKey[]).map(skill => (
                    <SkillLevelConfigurator key={skill} skill={skill} />  
                ))
            }
            </SkillListContext.Provider>
        </div>
    )
};

export default subjectSkills;