import * as React from "react";
import Config, { ConfigModifierProps } from "components/config/config";
import Status from "components/status/status-table";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";
import TabUnit from "components/common/tab/tab-unit";

type Props = {
    config: SubjectConfig
    modifier: ConfigModifierProps
    status: StatusType
}

const subject: React.FC<Props> = props => {
    return (
        <TabUnit title="実験体">
            <Config {...props.modifier} />
            <Status 
                {...props.config}
                status={props.status}
            />
        </TabUnit>
    )
};

export default subject;