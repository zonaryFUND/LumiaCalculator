import * as React from "react";
import Config from "components/config/config";
import Status from "components/status/status-table";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import TabUnit from "components/common/tab/tab-unit";
import style from "./subject.module.styl";
import { SubjectConfigProps } from "components/config/use-subject-config";
import { StateProps } from "@app/util/state";

type Props = SubjectConfigProps & {
    status: StatusType
    hpRatio: StateProps<number>
}

const subject: React.FC = props => {
    return (
        <TabUnit title="実験体" className={style.subject}>
            <Config />
            <Status />
        </TabUnit>
    )
};

export default subject;