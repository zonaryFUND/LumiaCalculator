import * as React from "react";
import style from "./skills-standard.modue.styl";
import { SubjectID } from "@app/entity/subject";
import Images from "@app/resources/image";

type Props = {
    id: SubjectID
}

const Skill: React.FC<{id: SubjectID, skill: "Q" | "W" | "E" | "R" | "T"}> = props => (
    <li
        data-tooltip-id="subject-skill" 
        data-tooltip-content={`${props.id}-${props.skill}`}
    >
        <img src={Images.skill[props.id][props.skill]} />
    </li>
)

const skillsStandard: React.FC<Props> = props => {
    return (
        <ul className={style.skills}>
            <Skill id={props.id} skill="Q" />
            <Skill id={props.id} skill="W" />
            <Skill id={props.id} skill="E" />
            <Skill id={props.id} skill="R" />
            <Skill id={props.id} skill="T" />
        </ul>
    )
}

export default skillsStandard;