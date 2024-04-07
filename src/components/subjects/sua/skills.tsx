import * as React from "react";
import Images from "@app/resources/image";
import style from "../skills-standard.modue.styl";
import { Skill } from "../skills-standard";

type Props = {
    src: string
}

export default function() {
    return  (
        <ul className={style.skills}>
            <li>
                <Skill id="sua" skill="Q" />
                <Skill id="sua" skill="RQ" />
            </li>
            <li>
                <Skill id="sua" skill="W" />
                <Skill id="sua" skill="RW" />
            </li>
            <li>
                <Skill id="sua" skill="E" />
                <Skill id="sua" skill="RE" />
            </li>
            <li>
                <Skill id="sua" skill="R" />
            </li>
            <li>
                <Skill id="sua" skill="T" />
            </li>
        </ul>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(0, 1);
}
