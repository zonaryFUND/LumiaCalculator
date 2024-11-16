import * as React from "react";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import SkillsStandard, { SkillImage, SkillsStandardProps } from "./skills-standard";
import { equipmentStatus } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectCodeWithOldID } from "app-types/subject-static";


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
    const oldSubjectID = SubjectCodeWithOldID[props.config.subject];
    const weaponType = React.useMemo(() => 
        props.config.equipment.weapon ? equipmentStatus(props.config.equipment.weapon).type as WeaponTypeID : undefined
    , [props.config.equipment.weapon]);

    const skills = SubjectSkills[oldSubjectID];
    if (skills && skills.default) {
        return React.createElement(skills.default, {
            id: oldSubjectID, 
            skillLevels: props.config.skillLevels, 
            setSkillLevels: props.setSkillLevels,
            weaponType: weaponType
        })
    } else {
        const skillImage = skills == undefined ? undefined : skills.SkillImage;
        
        return <SkillsStandard
            id={oldSubjectID} 
            skillLevels={props.config.skillLevels}
            setSkillLevels={props.setSkillLevels}
            weaponType={weaponType}    
            skillImage={skillImage}
        />;
    }
};

export default subjectSkills;