import * as React from "react";
import Column from "./column";
import { HandFist, SneakerMove, Boot, Eye, ArrowFatLineRight, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import { MiscTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";

import ExpandStatus from "./expand-status";
import MoveSpeedSubRow from "./move-speed-sub-row";

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
                    props.status.tenacity.components.findIndex(c => c.origin != "equipment") > -1 ? 
                    <ExpandStatus {...props.status.tenacity} /> : null
                }
                percent 
                isHidden={hidden} 
            />
            <Column 
                name={<><SneakerMove /><FormattedMessage id="status.movement-speed" /></>} 
                value={props.status.moveSpeed.calculatedValue} 
                expand={
                    <ExpandStatus 
                        {...props.status.moveSpeed} 
                        additionalSubRow={<MoveSpeedSubRow {...props.status.moveSpeed} />}
                    />
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
                    props.status.sightRange.components.findIndex(c => c.origin != "subject-status") > -1 ?
                    <ExpandStatus {...props.status.sightRange} />
                    : null
                }
            />
            <Column 
                name={<><ArrowFatLineRight />基本攻撃射程</>} 
                value={props.status.attackRange.calculatedValue} 
                expand={
                    props.status.attackRange.components.findIndex(c => c.origin != "weapon-base") > -1 ?
                    <ExpandStatus {...props.status.attackRange} />
                    : null
                }
                isHidden={hidden}
            />
        </tbody>
    );
}

export default misc;