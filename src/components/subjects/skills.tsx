import * as React from "react";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import SkillsStandard from "./skills-standard";
import { equipmentStatus } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";

const subjectContext = require.context("./", true, /\.\/.*\/skills\.tsx$/);

export type CooldownOverride = (config: SubjectConfig, status: Status) => (basic: Decimal) => Decimal;

export const SubjectSkills = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path);
    return skills;
}, {}) as any

type Props = {
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
    subjectSide?: "left" | "right"
}

const subjectSkills: React.FC<Props> = props => {
    const weaponType = React.useMemo(() => 
        props.config.equipment.weapon ? equipmentStatus(props.config.equipment.weapon).type as WeaponTypeID : undefined
    , [props.config.equipment.weapon]);

    const skills = SubjectSkills[props.config.subject];
    if (skills == undefined || skills.default == undefined) {
        const skillImage = skills == undefined ? undefined : skills.SkillImage;
        
        return <SkillsStandard
            id={props.config.subject} 
            skillLevels={props.config.skillLevels}
            setSkillLevels={props.setSkillLevels}
            weaponType={weaponType}    
            skillImage={skillImage}
        />;
    } else {
        return React.createElement(SubjectSkills[props.config.subject].default, {
            id: props.config.subject, 
            skillLevels: props.config.skillLevels, 
            setSkillLevels: props.setSkillLevels,
            weaponType: weaponType,
            weapon: props.config.equipment.weapon
        })
    }
};

export default subjectSkills;