import * as React from "react";

import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import HealPower from "../../components/potency-subrows/heal-power";

import InnerTable from "components/common/inner-table";

import style from "../../components/potency-rows/damage-table.module.styl";
import Decimal from "decimal.js";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";
import Standard from "../../components/potency-rows/standard";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import UniqueValueEquation from "../potency-subrows/unique-value-equation";

type Props = Omit<SubjectDamageTableUnit, "value"> & {
    strategy: UniqueValueStrategy
}

/**
 * 固有の計算ロジックを有する効果量について、その値セル、および計算式サブセルを構成する
 */
const uniqueExpression: React.FC<Props> = props => {
    const config = useSubjectStateStore(state => state.config);
    const status = useSubjectStateStore(state => state.status);
    const hpRatio = useSubjectStateStore(state => state.hpRatio);
    const hp = status.maxHp.calculatedValue.percent(hpRatio).floor().toNumber();

    const { value, equationExpression } = props.strategy({ 
        config, 
        status,
        hp
    });
    const sanitizedValue = (() => {
        if (value.type == "critical") {
            // 致命打の可能性がある基本攻撃属性ダメージ
            return [value.values[0], value.values[1], value.values[2] || value.values[1]];
        } else {
            // その他
            return value.value;
        }
    })();
    const valueClass = (() => {
        return props.type ? style[props.type.type] : style.skill;
    })();

    const healPower = props.type?.type == "heal" && status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ? status.healerGiveHpHealRatio.calculatedValue : undefined;
    const healPowerConcerned = Array.isArray(sanitizedValue) ? sanitizedValue.map(v => v?.addPercent(healPower || 0)) : sanitizedValue.addPercent(healPower || 0);

    return (
        <Standard
            label={props.label}
            value={
                Array.isArray(healPowerConcerned) ?
                healPowerConcerned.map(v => <td className={valueClass}>{v?.floor().toString() ?? "-"}</td>) :
                <td colSpan={3} className={valueClass}>{healPowerConcerned.floor().toString()}</td>
            }
            valueClass={valueClass}
            subtable={
                <InnerTable>
                    <UniqueValueEquation equationExpression={equationExpression} />
                    {healPower ? <HealPower baseValue={sanitizedValue as Decimal} healPower={healPower} /> : null}
                </InnerTable>
            }
        />
    )
}

export default uniqueExpression;