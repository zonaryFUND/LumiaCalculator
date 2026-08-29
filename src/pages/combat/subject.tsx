import * as React from "react";
import Config from "@app/features/subject-config";
import Status from "@app/features/subject-status";
import SubjectSkills from "@app/features/subject-skills";
import Pane from "components/layout/pane/pane";
import style from "./subject.module.styl";

type Props = {
    side: "left" | "right"
}

const subject: React.FC<Props> = props => {
    return (
        <Pane title={props.side === "left" ? "左実験体" : "右実験体"} className={style.subject}>
            <Config />
            <section className={style.skill}>
                <h3>スキル</h3>
                <SubjectSkills />
            </section>
            <Status />
        </Pane>
    )
};

export default subject;