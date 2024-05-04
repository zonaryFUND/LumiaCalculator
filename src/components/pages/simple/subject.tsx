import { SubjectID, name } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.module.styl";
import { Equipment, SkillLevels, SubjectConfig } from "components/subject/use-subject-config";
import Config from "components/subject/config";
import Status from "components/subject/status-table";
import { Status as StatusType } from "components/subject/status";
import { DisplayedStatusValues } from "components/subject/use-status";

type Props = {
    subject: StateProps<SubjectID>
    level: StateProps<number>
    skillLevels: StateProps<SkillLevels>
    weaponMastery: StateProps<number>
    defenseMastery: StateProps<number>
    movementMastery: StateProps<number>
    equipment: StateProps<Equipment>
    status: [StatusType, DisplayedStatusValues]
    gauge: StateProps<number>
}

function unpackConfig(props: Props): SubjectConfig {
    return Object.entries(props).reduce((result, [key, value]) => {
        if (key == "status") return result;
        (result as any)[key] = (value as any)[0];
        return result
    }, {}) as SubjectConfig;
}

const subject: React.FC<Props> = props => {
    return (
        <div className={index.row}>
            <header>
                <h1>実験体</h1>
            </header>
            <Config {...props} />
            <Status 
                {...unpackConfig(props)}
                status={props.status}
            />
        </div>
    )
};

export default subject;