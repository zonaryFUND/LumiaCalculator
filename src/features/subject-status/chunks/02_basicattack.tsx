import * as React from "react";
import Column from "../components/column";
import { Sword, Plus, Crosshair } from "@phosphor-icons/react"
import { FormattedMessage } from "react-intl";

import style from "./02_basicattack.module.styl";
import AttackSpeed from "./attack-speed";
import { BasicAttackTableHiddenKey } from "@app/storage/status";
import useStorageBoolean from "@app/storage/boolean";
import ExpandStatus from "../components/inner-table/expanded-status-description";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import useStatusWithoutBuffs from "../use-status-without-buffs";
import ChunkHeader from "./chunk-header";

const basicAttack: React.FC = () => {
    const attackPower = useSubjectStateStore(s => s.status.attackPower);
    const increaseBasicAttackDamageRatio = useSubjectStateStore(s => s.status.increaseBasicAttackDamageRatio);
    const attackSpeed = useSubjectStateStore(s => s.status.attackSpeed);
    const criticalStrikeChance = useSubjectStateStore(s => s.status.criticalStrikeChance);
    const criticalStrikeDamage = useSubjectStateStore(s => s.status.criticalStrikeDamage);
    const withoutBuffs = useStatusWithoutBuffs();

    const {value: hidden, toggleValue: toggleHidden} = useStorageBoolean(BasicAttackTableHiddenKey);

    return (
        <tbody>
            <ChunkHeader 
                intlID="app.basic-attack" 
                hidden={hidden}
                toggleHidden={toggleHidden}
            />
            <Column
                name={<><Sword /><FormattedMessage id="status.attack-power" /></>}
                value={attackPower.calculatedValue}
                baseline={withoutBuffs.attackPower.calculatedValue}
                expand={<ExpandStatus {...attackPower} />}
                isHidden={hidden}
                descriptionIntlID="tooltip.status.attack-power"
            />
            <Column
                name={<><span className={style.basic_attack_amp}><Sword /><Plus weight="bold" /></span><FormattedMessage id="status.basic-attack-amp" /></>}
                value={increaseBasicAttackDamageRatio.calculatedValue}
                baseline={withoutBuffs.increaseBasicAttackDamageRatio.calculatedValue}
                expand={
                    increaseBasicAttackDamageRatio.calculatedValue.isZero() ? null :
                    <ExpandStatus {...increaseBasicAttackDamageRatio} percent />
                }
                percent
                isHidden={hidden}
                descriptionIntlID="tooltip.status.basic-attack-amp"
            />
            <Column
                name={<><AttackSpeed /><FormattedMessage id="status.attack-speed" /></>}
                value={attackSpeed.calculatedValue}
                baseline={withoutBuffs.attackSpeed.calculatedValue}
                expand={<ExpandStatus {...attackSpeed} />}
                isHidden={hidden}
                descriptionIntlID="tooltip.status.attack-speed"
            />
            <Column
                name={<><Crosshair /><FormattedMessage id="status.critical-chance" /></>}
                value={criticalStrikeChance.calculatedValue}
                baseline={withoutBuffs.criticalStrikeChance.calculatedValue}
                expand={
                    criticalStrikeChance.components.findIndex(c => c.origin != "equipment") > -1 ?
                    <ExpandStatus {...criticalStrikeChance} percent /> : null
                }
                percent
                isHidden={hidden}
                descriptionIntlID="tooltip.status.critical-chance"
            />
            <Column
                name={<><span className={style.critical_damage}><Crosshair /><Plus weight="bold" /></span><FormattedMessage id="status.critical-damage" /></>}
                value={criticalStrikeDamage.calculatedValue}
                baseline={withoutBuffs.criticalStrikeDamage.calculatedValue}
                percent
                isHidden={hidden}
                descriptionIntlID="tooltip.status.critical-damage"
            />
        </tbody>
    );
}

export default basicAttack;