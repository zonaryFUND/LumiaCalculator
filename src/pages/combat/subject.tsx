import * as React from "react";
import { Tooltip } from "react-tooltip";
import { StateWrapped } from "util/state";
import index from "./index.module.styl";
import Config from "components/config/config";
import Status from "components/status/status-table";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import SubjectSkills from "components/subjects/skills";
import style from "./subject.module.styl";

import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";

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
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const [subject, skill] = content?.split("-");
                    return (
                        <SubjectSkillTooltip
                            id={subject} 
                            skill={skill as any} 
                            showEquation={false}
                            status={props.status} 
                            config={props.config} 
                        />
                    );
                }}
            />     
        </div>
    )
};

export default subject;