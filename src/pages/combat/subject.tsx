import * as React from "react";
import Config from "@app/features/subject-config";
import Status from "@app/features/subject-status";
import TabUnit from "components/common/tab/tab-unit";
import style from "./index.module.styl";

type Props = {
    side: "left" | "right"
}

const subject: React.FC<Props> = props => {
    return (
        <TabUnit title={props.side === "left" ? "左実験体" : "右実験体"} className={style.subject}>
            <Config />
            {/*
            <section className={style.skill}>
                <h3>スキル</h3>
                <SubjectSkills config={props.value} setSkillLevels={props.skillLevels[1]} />
            </section>
            */}
            <Status />
        </TabUnit>
    )
};

export default subject;