import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { HandFist, SneakerMove, Boot, Eye, ArrowFatLineRight, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import style from "./06_misc.module.styl";
import { MiscTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

type Props = SubjectConfig & {
    status: Status
}
const misc: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(MiscTableHiddenKey);

    return (
        <tbody>
            <tr className={table. separator} onClick={toggleHidden}><td colSpan={2}><div><p><FormattedMessage id="app.others" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td></tr>
            <Column 
                name={<><HandFist /><FormattedMessage id="status.tenacity" /></>} 
                value={props.status.tenacity.calculatedValue}
                expand={
                    props.status.tenacity.overrideAdditional == undefined ? null :
                    <InnerTable>
                        {
                            props.status.tenacity.equipment?.constant == undefined ? null : 
                            <Equipment constant={props.status.tenacity.equipment.constant} level={-1} percent />
                        }
                        <tr><td><FormattedMessage id={props.status.tenacity.overrideAdditional.nameKey} /></td><td>{props.status.tenacity.overrideAdditional.value?.toString()}%</td></tr>
                    </InnerTable>
                }
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><SneakerMove /><FormattedMessage id="status.movement-speed" /></>} 
                value={props.status.moveSpeed.calculatedValue} 
                expand={
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.subject" /></td><td>{props.status.moveSpeed.base?.toString()}</td></tr>
                        <Equipment 
                            {...props.status.moveSpeed.equipment}
                            level={props.level}
                        />
                        <Mastery perMastery={props.status.moveSpeed.perMastery!} name={<FormattedMessage id="status.movement-mastery" />} mastery={props.movementMastery} />
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><Boot />移動速度減少耐性</>} 
                value={props.status.slowResist.calculatedValue} 
                isHidden={hidden}
                percent
            />
            <Column 
                name={<><Eye /><FormattedMessage id="status.vision" /></>} 
                value={props.status.sightRange.calculatedValue} 
                expand={
                    props.status.sightRange.equipment == undefined ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.sightRange.base?.toString()}</td></tr>
                        <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.sightRange.equipment?.constant?.toString()}</td></tr>
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><ArrowFatLineRight />基本攻撃射程</>} 
                value={props.status.attackRange.calculatedValue} 
                expand={
                    props.status.attackRange.equipment == undefined ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.attackRange.base?.toString()}</td></tr>
                        <tr><td><FormattedMessage id="app.weapon" /></td><td>{props.status.attackRange.equipment?.constant?.toString()}</td></tr>
                        {props.status.attackRange.equipment?.ratio ? <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.attackRange.equipment.ratio.toString()}</td></tr> : null}
                        {
                            props.status.attackRange.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.attackRange.overrideAdditional.nameKey} /></td>
                                <td>{props.status.attackRange.overrideAdditional.value?.toString()}</td>
                            </tr>
                            : null
                        }
                        {
                            props.status.attackRange.overrideFix ?
                            <tr className={style.fixedvalue}><td><FormattedMessage id={props.status.attackRange.overrideFix.nameKey} /></td><td>{props.status.attackRange.overrideFix.value.toString()}</td></tr>
                            : null
                        }
                    </InnerTable>
                }
                isHidden={hidden}
            />
        </tbody>
    );
}

export default misc;