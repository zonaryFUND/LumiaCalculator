import * as React from "react";
import { useToggle } from "react-use";
import Column from "./column";
import Mastery from "./expand/mastery";
import Equipment from "./expand/equipment";
import InnerTable from "components/common/inner-table";
import { HandFist, SneakerMove, Eye, ArrowFatLineRight, CaretDown, CaretUp } from "@phosphor-icons/react"
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
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><SneakerMove /><FormattedMessage id="status.movement-speed" /></>} 
                value={props.status.movementSpeed.calculatedValue} 
                expand={
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.subject" /></td><td>{props.status.movementSpeed.base?.toString()}</td></tr>
                        <Equipment 
                            {...props.status.movementSpeed.equipment}
                            level={props.level}
                        />
                        <Mastery perMastery={props.status.movementSpeed.perMastery!} name={<FormattedMessage id="status.movement-mastery" />} mastery={props.movementMastery} />
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><Eye /><FormattedMessage id="status.vision" /></>} 
                value={props.status.visionRange.calculatedValue} 
                expand={
                    props.status.visionRange.equipment == undefined ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.visionRange.base?.toString()}</td></tr>
                        <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.visionRange.equipment?.constant?.toString()}</td></tr>
                    </InnerTable>
                }
                isHidden={hidden}
            />
            <Column 
                name={<><ArrowFatLineRight />基本攻撃射程</>} 
                value={props.status.basicAttackRange.calculatedValue} 
                expand={
                    props.status.basicAttackRange.equipment == undefined ? null :
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{props.status.basicAttackRange.base?.toString()}</td></tr>
                        <tr><td><FormattedMessage id="app.weapon" /></td><td>{props.status.basicAttackRange.equipment?.constant?.toString()}</td></tr>
                        {props.status.basicAttackRange.equipment?.ratio ? <tr><td><FormattedMessage id="app.additional-value" /></td><td>{props.status.basicAttackRange.equipment.ratio.toString()}</td></tr> : null}
                        {
                            props.status.basicAttackRange.overrideAdditional ?
                            <tr>
                                <td><FormattedMessage id={props.status.basicAttackRange.overrideAdditional.nameKey} /></td>
                                <td>{props.status.basicAttackRange.overrideAdditional.value?.toString()}</td>
                            </tr>
                            : null
                        }
                        {
                            props.status.basicAttackRange.overrideFix ?
                            <tr className={style.fixedvalue}><td><FormattedMessage id={props.status.basicAttackRange.overrideFix.nameKey} /></td><td>{props.status.basicAttackRange.overrideFix.value.toString()}</td></tr>
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