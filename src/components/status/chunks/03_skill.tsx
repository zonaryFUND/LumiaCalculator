import * as React from "react";
import Column from "./column";
import InnerTable from "components/common/inner-table";
import { ArrowFatLinesUp, Hourglass, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import { SkillTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import ExpandStatus from "./expand-status";

type Props = SubjectConfig & {
    status: Status
}
const skill: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(SkillTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator}><td colSpan={2} onClick={toggleHidden}><div><p><FormattedMessage id="app.skill" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
            <Column 
                name={<><ArrowFatLinesUp weight="fill" /><FormattedMessage id="status.skill-amp" /></>} 
                value={props.status.skillAmp.calculatedValue}
                expand={
                    props.status.skillAmp.calculatedValue.isZero() ? null :
                    <ExpandStatus {...props.status.skillAmp} />
                }
                isHidden={hidden}
            />
            
            <Column 
                name={<><Hourglass /><FormattedMessage id="status.cooldown-reduction" /></>} 
                value={props.status.cooldownReduction.calculatedValue} 
                expand={
                    props.status.cooldownLimit.calculatedValue.isZero() ? null :
                    <InnerTable>
                        <tr>
                            <td><FormattedMessage id="status.max-cooldown-reduction" /></td>
                            <td>+{props.status.cooldownLimit.calculatedValue.toString()}%</td>
                        </tr>
                    </InnerTable>
                }
                percent
                isHidden={hidden}
            />
        </tbody>
    );
}

export default skill;