import * as React from "react";
import index from "./index.module.styl";
import Config, { ConfigModifierProps } from "components/config/config";
import Status from "components/status/status-table";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status as StatusType } from "app-types/subject-dynamic/status/type";

type Props = {
    config: SubjectConfig
    modifier: ConfigModifierProps
    status: StatusType
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
                <Status 
                    {...props.config}
                    status={props.status}
                />
            </div>
        </div>
    )
};

export default subject;