import * as React from "react";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import SkillsStandard, { SkillImage, SkillsStandardProps } from "./skills-standard";
import { SubjectCodeWithOldID } from "app-types/subject-static";
import { SubjectSkillListExpressionDictionary } from "./dictionary";


export type CooldownOverride = (config: SubjectConfig, status: Status) => (basic: Decimal) => Decimal;
type SubjectModule = {
    default?: (props: SkillsStandardProps) => React.ReactElement
    idForLevel?: (skill: string) => string
    idForConsumption?: (skill: string) => string
    SkillImage?: SkillImage
}

const subjectModules = import.meta.glob<SubjectModule>("./**/skills.tsx", {eager: true});

export const SubjectSkills = Object.entries(subjectModules).reduce((skills, [key, m]) => {
    const subject = key.substring(2, key.lastIndexOf("/"));
    return {
        ...skills,
        [subject]: m
    }
}, {} as {
    [key: string]: SubjectModule
})

type Props = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

const subjectSkills: React.FC<Props> = props => {
    console.log(props.config.subject)

    return <SkillsStandard 
        code={props.config.subject}
        listHook={SubjectSkillListExpressionDictionary[props.config.subject]}
        skillLevels={props.config.skillLevels}
        setSkillLevels={props.setSkillLevels}
    />
};

export default subjectSkills;