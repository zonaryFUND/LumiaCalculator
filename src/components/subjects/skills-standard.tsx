import * as React from "react";
import style from "./skills-standard.module.styl";
import { OldSubjectID, SubjectCode } from "app-types/subject-static";
import Images from "@app/resources/image";
import Selection from "components/common/number-selection";
import { SkillLevels } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectSideContext } from "./subject-side";
import { Prohibit } from "@phosphor-icons/react"
import { SkillCode, SkillKey, SkillListHook } from "./dictionary";

export type SkillImage = (skillID: string) => string | undefined;
type ConfigurationProps = [SkillLevels, React.Dispatch<React.SetStateAction<SkillLevels>>]
const ConfigurationContext = React.createContext<ConfigurationProps | null>(null);

export const SkillLevelConfigurator: React.FC<{skill: "Q" | "W" | "E" | "R" | "T", max?: number}> = props => {
    const context = React.useContext(ConfigurationContext);

    const value = context![0][props.skill];
    const max = (() => {
        if (props.max) return props.max;
        return props.skill == "R" || props.skill == "T" ? 3 : 5;
    })();

    const onChange = React.useCallback((to: number) => {
        context![1](prev => ({...prev, [props.skill]: to - 1}))
    }, [])

    return (
        <div className={style.configurator}>
            <Selection max={max} value={[value + 1, onChange]} layout="skill" />
        </div>
    )
}

type SkillProps = {
    code: SkillCode
}

export const Skill: React.FC<SkillProps> = props => {
    const side = React.useContext(SubjectSideContext);

    return (
        <img 
            src={Images.skill[props.code]} 
            data-tooltip-id="subject-skill" 
            data-tooltip-content={`${props.code}`}
            data-tooltip-subject-side={side}
        />
    );
}

type WeaponSkillProps = {
    id?: WeaponTypeID
}

export const WeaponSkill: React.FC<WeaponSkillProps> = props => {
    const src = (() => {
        if (props.id == undefined) return ""; 
        return Images.skill.weapon[props.id];
    })();

    const side = React.useContext(SubjectSideContext);

    return (
        <div 
            className={style.vertical}
            data-tooltip-id={props.id ? "weapon-skill" : undefined}
            data-tooltip-content={`${props.id}`}
            data-tooltip-subject-side={side}
        >
            {
                props.id ?
                <img src={Images.skill.weapon[props.id]} />
                :
                <div className={style.blank}><Prohibit size="2rem" /></div>
            }
        </div>
    )
}

export type SkillsStandardProps = {
    code: SubjectCode
    listHook: SkillListHook
    skillLevels: SkillLevels
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
    weaponType?: WeaponTypeID
}

export const SkillsParent: React.FC<SkillsStandardProps & {children?: React.ReactNode}> = props => (
    <div className={style.skills}>
        <ConfigurationContext.Provider value={[props.skillLevels, props.setSkillLevels]}>
            {props.children}
        </ConfigurationContext.Provider>
    </div>
)

const skillsStandard: React.FC<SkillsStandardProps> = props => {
    const list = props.listHook();

    return (
        <SkillsParent {...props}>
            {
                (["Q", "W", "E", "R", "T"] as SkillKey[]).map(skill => (
                    <div key={skill} className={style.vertical}>
                        {
                            (Array.isArray(list[skill]) ? list[skill] : [list[skill]]).map(code => <Skill key={code} code={code} />)
                        }
                    </div>
                ))
            }
            <WeaponSkill id={props.weaponType} />
            {
                (["Q", "W", "E", "R", "T"] as SkillKey[]).map(skill => (
                    <SkillLevelConfigurator key={skill} skill={skill} />  
                ))
            }
        </SkillsParent>
    )
}

export default skillsStandard;
