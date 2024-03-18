import * as React from "react";
import { Subjects, SubjectID, name } from "@app/entity/subject";
import { ImageURL } from "./image";
import style from "./subjects-list.module.styl";

type Props = {
    onSelect: (subject: SubjectID) => void
}

const idAndNames = Subjects.map(s => ({id: s, name: name(s, "jp")})).sort((a, b) => a.name > b.name ? 1 : -1);

const subjectsList: React.FC<Props> = props => (
    <div className={style.subjects}>
        <ul>
            {idAndNames.map(tuple => (
                <li key={tuple.id} onClick={() => props.onSelect(tuple.id)}>
                    <img src={ImageURL(tuple.id)} />
                    <p>{tuple.name}</p>
                </li>
            ))}
        </ul>
    </div>
);


export default subjectsList;