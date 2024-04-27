import { SubjectID, name } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.module.styl";
import { Equipment, SkillLevels, SubjectConfig } from "components/subject/use-subject-config";
import Config from "components/subject/config";
import Status from "components/subject/status-table";

type Props = {
    subject: StateProps<SubjectID>
    level: StateProps<number>
    skillLevels: StateProps<SkillLevels>
    weaponMastery: StateProps<number>
    defenseMastery: StateProps<number>
    movementMastery: StateProps<number>
    equipment: StateProps<Equipment>
}

function unpackConfig(props: Props): SubjectConfig {
    return Object.entries(props).reduce((result, [key, value]) => {
        (result as any)[key] = value[0];
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
            />
        </div>
    )
};

export default subject;