import * as React from "react";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import { SubjectConfigProps } from "components/config/use-subject-config";
import { StateProps } from "@app/util/state";

type Props = SubjectConfigProps & {
    status: StatusType
    hp: StateProps<number>
}

const subject: React.FC<Props> = props => {
    /*
    return (
        <TabUnit title="左実験体" className={style.subject}>
            <Config {...props} maxHP={props.status.maxHp.calculatedValue.toNumber()} currentHPRatio={props.hp} />
            <section className={style.skill}>
                <h3>スキル</h3>
                <SubjectSkills config={props.value} setSkillLevels={props.skillLevels[1]} />
            </section>
            <Status {...props.value} status={props.status} />
        </TabUnit>
    )
        */
       return <></>
};

export default subject;