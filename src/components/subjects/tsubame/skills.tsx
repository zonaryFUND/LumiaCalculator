import * as React from "react";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

const skills: React.FC<SkillsStandardProps> = props => (
    <SkillsParent {...props}>
        <Skill id="tsubame" skill="Q" skillImage={props.skillImage} />
        <Skill id="tsubame" skill="W" skillImage={props.skillImage} />
        <Skill id="tsubame" skill="E" skillImage={props.skillImage} />
        <Skill id="tsubame" skill="R" skillImage={props.skillImage} />
        <Skill id="tsubame" skill="T" skillImage={props.skillImage} />
        <WeaponSkill id={props.weaponType} />
        <SkillLevelConfigurator skill="Q" />    
        <SkillLevelConfigurator skill="W" />    
        <SkillLevelConfigurator skill="E" />    
        <SkillLevelConfigurator skill="R" max={5} />    
        <SkillLevelConfigurator skill="T" max={1} />    
    </SkillsParent>
)

export default skills;
