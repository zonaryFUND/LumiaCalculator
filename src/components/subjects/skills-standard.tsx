import * as React from "react";
import style from "./skills-standard.module.styl";
import { OldSubjectID } from "app-types/subject-static";
import Images from "@app/resources/image";
import Selection from "components/common/number-selection";
import { SkillLevels } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectSideContext } from "./subject-side";
import { Prohibit } from "@phosphor-icons/react"

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
    id: OldSubjectID
    skill: string
    skillImage?: SkillImage
}

export const Skill: React.FC<SkillProps> = props => {
    const src = (() => {
        const standard = Images.skill[props.id][props.skill];
        return props.skillImage ? (props.skillImage(props.skill) ?? standard) : standard 
    })();

    const side = React.useContext(SubjectSideContext);

    return (
        <img 
            src={src} 
            data-tooltip-id="subject-skill" 
            data-tooltip-content={`${props.id}-${props.skill}`}
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
    id: OldSubjectID
    skillImage?: SkillImage
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
    return (
        <SkillsParent {...props}>
            <Skill id={props.id} skill="Q" skillImage={props.skillImage} />
            <Skill id={props.id} skill="W" skillImage={props.skillImage} />
            <Skill id={props.id} skill="E" skillImage={props.skillImage} />
            <Skill id={props.id} skill="R" skillImage={props.skillImage} />
            <Skill id={props.id} skill="T" skillImage={props.skillImage} />
            <WeaponSkill id={props.weaponType} />
            <SkillLevelConfigurator skill="Q" />    
            <SkillLevelConfigurator skill="W" />    
            <SkillLevelConfigurator skill="E" />    
            <SkillLevelConfigurator skill="R" />    
            <SkillLevelConfigurator skill="T" />    
        </SkillsParent>
    )
}

export default skillsStandard;
