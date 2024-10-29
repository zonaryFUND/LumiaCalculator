import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import StandardExpand from "./expand/standard";
import { Lightning, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.styl";
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
                value={props.status.maxSP.calculatedValue} 
                expand={<StandardExpand {...props.status.maxSP} level={props.level} digit={2} />}
                isHidden={hidden}
            />
            <Column 
                name={<><Lightning /><FormattedMessage id="status.spregen"/></>} 
                value={props.status.spReg.calculatedValue} 
                expand={<StandardExpand {...props.status.spReg} level={props.level} digit={2} />}
                isHidden={hidden}
            />
        </tbody>
    )
}

export default sp;