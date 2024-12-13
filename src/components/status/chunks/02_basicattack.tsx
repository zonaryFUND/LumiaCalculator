import * as React from "react";
import Column from "./column";
import { Sword, Plus, Wind, Crosshair, CaretDown, CaretUp } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import style from "./02_basicattack.module.styl";
import AttackSpeed from "./attack-speed";
import { BasicAttackTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import ExpandStatus from "./expand-status";

type Props = SubjectConfig & {
    status: Status
}
const basicAttack: React.FC<Props> = props => {
    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(BasicAttackTableHiddenKey);

    return (
        <tbody>
            <tr className={table.separator} onClick={toggleHidden}>
                <td colSpan={2}><div><p><FormattedMessage id="app.basic-attack" /></p>{hidden ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
            </tr>
            <Column 
                name={<><Sword /><FormattedMessage id="status.attack-power" /></>} 
                value={props.status.attackPower.calculatedValue} 
                expand={<ExpandStatus {...props.status.attackPower} />}
                isHidden={hidden}
            />
            <Column 
                name={<><span className={style.basic_attack_amp}><Sword /><Plus weight="bold" /></span><FormattedMessage id="status.basic-attack-amp" /></>} 
                value={props.status.increaseBasicAttackDamageRatio.calculatedValue}
                expand={
                    props.status.increaseBasicAttackDamageRatio.calculatedValue.isZero() ? null :
                    <ExpandStatus {...props.status.increaseBasicAttackDamageRatio} percent />
                }
                percent
                isHidden={hidden}
            />
            <Column 
                name={<><AttackSpeed /><FormattedMessage id="status.attack-speed" /></>} 
                value={props.status.attackSpeed.calculatedValue} 
                expand={<ExpandStatus {...props.status.attackSpeed} />}
                isHidden={hidden}
            />
            <Column 
                name={<><Crosshair /><FormattedMessage id="status.critical-chance" /></>} 
                value={props.status.criticalStrikeChance.calculatedValue} 
                expand={
                    props.status.criticalStrikeChance.components.findIndex(c => c.origin != "equipment") > -1 ? 
                    <ExpandStatus {...props.status.criticalStrikeChance} percent /> : null
                }
                percent 
                isHidden={hidden}
            />
            <Column 
                name={<><span className={style.critical_damage}><Crosshair /><Plus weight="bold" /></span><FormattedMessage id="status.critical-damage" /></>} 
                value={props.status.criticalStrikeDamage.calculatedValue} 
                percent 
                isHidden={hidden} 
            />
        </tbody>
    );
}

export default basicAttack;