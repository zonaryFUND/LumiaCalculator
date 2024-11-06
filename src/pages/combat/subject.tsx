import * as React from "react";
import { StateWrapped } from "util/state";
import index from "./index.module.styl";
import Config, { ConfigModifierProps, CurrentHPProps } from "components/config/config";
import Status from "components/status/status-table";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import SubjectSkills from "components/subjects/skills";
import style from "./subject.module.styl";

type Props = {
    status: StatusType
    modifier: ConfigModifierProps & CurrentHPProps
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
                <Config {...props.modifier} />
                <section className={style.skill}>
                    <h3>スキル</h3>
                    <SubjectSkills config={props.config} setSkillLevels={props.modifier.skillLevels[1]} />
                </section>
                <section>
                    <Status {...props.config} status={props.status} />
                </section>
            </div>
        </div>
    )
};

export default subject;