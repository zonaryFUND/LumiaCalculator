import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import { Drop, FirstAidKit, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import { HealTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

type Props = SubjectConfig & {
    status: Status
}
const heal: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(HealTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}><td colSpan={2}><div><p><FormattedMessage id="app.heal" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
            <Column 
                name={<><Drop /><FormattedMessage id="status.lifesteal" /></>} 
                value={props.status.lifeSteal.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><Drop /><FormattedMessage id="status.omnisyphon" /></>} 
                value={props.status.omnisyphon.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><FirstAidKit /><FormattedMessage id="status.heal-power" /></>} 
                value={props.status.healPower.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default heal;