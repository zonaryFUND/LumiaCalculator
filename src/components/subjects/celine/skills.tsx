import * as React from "react";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps } from "../skills-standard";

const skills: React.FC<SkillsStandardProps> = props => (
    <SkillsParent {...props}>
        <Skill id="celine" skill="Q" skillImage={props.skillImage} />
        <Skill id="celine" skill="W" skillImage={props.skillImage} />
        <Skill id="celine" skill="E" skillImage={props.skillImage} />
        <Skill id="celine" skill="R" skillImage={props.skillImage} />
        <Skill id="celine" skill="T" skillImage={props.skillImage} />
        <SkillLevelConfigurator skill="Q" />    
        <SkillLevelConfigurator skill="W" />    
        <SkillLevelConfigurator skill="E" />    
        <SkillLevelConfigurator skill="R" max={5} />    
        <SkillLevelConfigurator skill="T" max={2} />    
    </SkillsParent>
)

export default skills;
