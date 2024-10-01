import * as React from "react";
import { StateWrapped } from "util/state";
import index from "./index.module.styl";
import Config from "components/config/config";
import Status from "components/status/status-table";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import SubjectSkills from "components/subjects/skills";
import style from "./subject.module.styl";

type Props = StateWrapped<SubjectConfig> & {
    status: StatusType
    config: SubjectConfig
    hideHeader?: boolean
}

const subject: React.FC<Props> = props => {
    return (
        <div className={index.row}>
            {
                props.hideHeader ? null :
                <header>
                    <h1>実験体</h1>
                </header>
            }
            <div className={index.content}>
                <Config {...props} />
                <section className={style.skill}>
                    <h3>スキル</h3>
                    <SubjectSkills config={props.config} setSkillLevels={props.skillLevels[1]} />
                </section>
                <section>
                    <h3>ステータス</h3>
                    <Status {...props.config} status={props.status} />
                </section>
            </div>
        </div>
    )
};

export default subject;