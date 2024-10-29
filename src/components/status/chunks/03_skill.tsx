import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { ArrowFatLinesUp, Hourglass, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.styl";
import { SkillTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

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
                    <InnerTable>
                        {
                            props.status.skillAmp.equipment?.constant || props.status.skillAmp.perLevel ?
                            <Equipment 
                                {...props.status.skillAmp.equipment}
                                level={props.level}
                                label={<FormattedMessage id="app.constant-value" />}
                            /> 
                            : null
                        }
                        {
                            props.status.skillAmp.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.skillAmp.overrideAdditional.nameKey} /></td>
                                <td>{props.status.skillAmp.overrideAdditional.value?.toString()}</td>
                            </tr>
                            : null
                        }
                        {
                            props.status.skillAmp.equipment?.adaptive ?
                            <tr><td><FormattedMessage id="status.adaptive"/></td><td>{props.status.skillAmp.equipment.adaptive.toString()}</td></tr>
                            : null
                        }
                        {
                            props.status.skillAmp.equipment?.ratio ?
                            <tr><td>%<FormattedMessage id="status.skill-amp" /></td><td>{props.status.skillAmp.equipment.ratio.toString()}%</td></tr>
                            : null
                        }
                        {
                            props.status.skillAmp.perMastery ? 
                            <Mastery perMastery={props.status.skillAmp.perMastery} name={<FormattedMessage id="status.weapon-mastery" />} mastery={props.weaponMastery} />
                            : null
                        }
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><Hourglass /><FormattedMessage id="status.cooldown-reduction" /></>} 
                value={props.status.cooldownReduction.calculatedValue} 
                expand={
                    props.status.cooldownReduction.cap.isZero() ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="status.max-cooldown-reduction" /></td><td>+{props.status.cooldownReduction.cap.toString()}%</td></tr>
                    </InnerTable>
                }
                percent
                isHidden={hidden}
            />
        </tbody>
    );
}

export default skill;