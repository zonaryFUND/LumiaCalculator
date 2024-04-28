import * as React from "react";
import style from "./skills-standard.modue.styl";
import { SubjectID } from "@app/entity/subject";
import Images from "@app/resources/image";
import { SkillLevels } from "components/subject/use-subject-config";

export type SkillImage = (skillID: string) => string | undefined;
type ConfigurationProps = [SkillLevels, React.Dispatch<React.SetStateAction<SkillLevels>>]
const ConfigurationContext = React.createContext<ConfigurationProps | null>(null);

export const SkillLevelConfigurator: React.FC<{skill: "Q" | "W" | "E" | "R" | "T", max?: number}> = props => {
    const context = React.useContext(ConfigurationContext);

    const value = context![0][props.skill];
    const dec = React.useCallback(() => context![1](prev => ({...prev, [props.skill]: prev[props.skill] - 1})), []);
    const inc = React.useCallback(() => context![1](prev => ({...prev, [props.skill]: prev[props.skill] + 1})), []);

    const max = (() => {
        if (props.max) return props.max;
        return props.skill == "R" || props.skill == "T" ? 3 : 5;
    })();

    const onChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(event => {
        context![1](prev => ({...prev, [props.skill]: +event.target.value}))
    }, [])

    return (
        <div className={style.configurator}>
            <select value={value} onChange={onChange}>
                {[...Array(max)].map((_, i) => i).map(v => 
                    <option key={v} value={v}>{v + 1}</option>
                )}
            </select>
        </div>
    )
}

type SkillProps = {
    id: SubjectID
    skill: string
    skillImage?: SkillImage
}

export const Skill: React.FC<SkillProps> = props => {
    const src = (() => {
        const standard = Images.skill[props.id][props.skill];
        return props.skillImage ? (props.skillImage(props.skill) ?? standard) : standard 
    })();

    return (
        <li
            data-tooltip-id="subject-skill" 
            data-tooltip-content={`${props.id}-${props.skill}`}
        >
            <img src={src} />
        </li>
    );
}

export type SkillsStandardProps = {
    id: SubjectID
    skillImage?: SkillImage
    skillLevels: SkillLevels
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

export const SkillsParent: React.FC<SkillsStandardProps> = props => (
    <ul className={style.skills}>
        <ConfigurationContext.Provider value={[props.skillLevels, props.setSkillLevels]}>
            {props.children}
        </ConfigurationContext.Provider>
    </ul>
)

const skillsStandard: React.FC<SkillsStandardProps> = props => {
    return (
        <SkillsParent {...props}>
            <Skill id={props.id} skill="Q" skillImage={props.skillImage} />
            <Skill id={props.id} skill="W" skillImage={props.skillImage} />
            <Skill id={props.id} skill="E" skillImage={props.skillImage} />
            <Skill id={props.id} skill="R" skillImage={props.skillImage} />
            <Skill id={props.id} skill="T" skillImage={props.skillImage} />
            <SkillLevelConfigurator skill="Q" />    
            <SkillLevelConfigurator skill="W" />    
            <SkillLevelConfigurator skill="E" />    
            <SkillLevelConfigurator skill="R" />    
            <SkillLevelConfigurator skill="T" />    
        </SkillsParent>
    )
}

export default skillsStandard;
