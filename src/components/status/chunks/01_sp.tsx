import * as React from "react";
import Column from "./column";
import { Lightning, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import ExpandStatus from "./expand-status";

import table from "components/common/table.module.styl";
import { SpTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

type Props = SubjectConfig & {
    status: Status
}

const sp: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(SpTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}>
                <td colSpan={2}><div><p><FormattedMessage id="app.sp" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
            </tr>
            <Column 
                name={<><Lightning weight="fill" /><FormattedMessage id="status.maxsp" /></>} 
                value={props.status.maxSp.calculatedValue} 
                expand={<ExpandStatus {...props.status.maxSp} />}
                isHidden={hidden}
            />
            <Column 
                name={<><Lightning /><FormattedMessage id="status.spregen"/></>} 
                value={props.status.spRegen.calculatedValue} 
                expand={<ExpandStatus {...props.status.spRegen} />}
                isHidden={hidden}
            />
        </tbody>
    )
}

export default sp;