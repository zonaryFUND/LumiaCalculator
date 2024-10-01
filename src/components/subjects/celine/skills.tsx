import * as React from "react";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

const skills: React.FC<SkillsStandardProps> = props => (
    <SkillsParent {...props}>
        <Skill id="celine" skill="Q" />
        <Skill id="celine" skill="W" />
        <Skill id="celine" skill="E" />
        <Skill id="celine" skill="R" />
        <Skill id="celine" skill="T" />
        <WeaponSkill id={props.weaponType} />
        <SkillLevelConfigurator skill="Q" />    
        <SkillLevelConfigurator skill="W" />    
        <SkillLevelConfigurator skill="E" />    
        <SkillLevelConfigurator skill="R" max={5} />    
        <SkillLevelConfigurator skill="T" max={2} />    
    </SkillsParent>
)

export default skills;
