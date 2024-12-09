import * as React from "react";
import Config from "components/config/config";
import Status from "components/status/status-table";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import SubjectSkills from "components/subject/skills";
import style from "./subject.module.styl";
import { SubjectConfigProps } from "components/config/use-subject-config";
import TabUnit from "components/common/tab/tab-unit";

type Props = SubjectConfigProps & {
    status: StatusType
}

const subject: React.FC<Props> = props => {
    return (
        <TabUnit title="左実験体" className={style.subject}>
            <Config {...props} />
            <section className={style.skill}>
                <h3>スキル</h3>
                <SubjectSkills config={props.value} setSkillLevels={props.skillLevels[1]} />
            </section>
            <Status {...props.value} status={props.status} />
        </TabUnit>
    )
};

export default subject;