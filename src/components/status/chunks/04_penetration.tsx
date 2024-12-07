import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { ShieldSlash, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import { PenetrationTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

type Props = SubjectConfig & {
    status: Status
}
const penetration: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(PenetrationTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}><td colSpan={2}><div><p><FormattedMessage id="status.armor-penetration" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
            <Column 
                name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-constant" /></>} 
                value={props.status.penetrationDefense.calculatedValue} 
                isHidden={hidden} 
            />
            <Column 
                name={<><ShieldSlash /><FormattedMessage id="status.armor-penetration-ratio" /></>} 
                value={props.status.penetrationDefenseRatio.calculatedValue} 
                expand={
                    props.status.penetrationDefenseRatio.overrideAdditional ?
                    <InnerTable>
                        <Equipment 
                            constant={props.status.penetrationDefenseRatio.equipment?.constant}
                            percent
                            level={props.level}
                        />
                        <tr>
                            <td><FormattedMessage id={props.status.penetrationDefenseRatio.overrideAdditional.nameKey} /></td>
                            <td>{props.status.penetrationDefenseRatio.overrideAdditional.value?.toString()}%</td>
                        </tr>
                    </InnerTable> 
                    :
                    null
                }
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default penetration;