import * as React from "react";

import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import HealPower from "../../components/potency-subrows/heal-power";

import InnerTable from "components/common/inner-table";

import style from "../../components/potency-rows/damage-table.module.styl";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";
import Standard from "../../components/potency-rows/standard";
import Critical from "../../components/potency-rows/critical";
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
    const valueClass = props.type ? style[props.type.type] : style.skill;
    const healPower = props.type?.type == "heal" && status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ? status.healerGiveHpHealRatio.calculatedValue : undefined;

    if (value.type == "critical") {
        // 致命打の可能性がある基本攻撃属性ダメージ。基礎値・致命打・期待値の3列を独立したセルとして
        // 表示する必要があるため、単一の値セルしか持たないStandardではなくCriticalを使う
        const [regularDamage, criticalDamage, expectedValue] = value.values.map(v => v?.addPercent(healPower || 0));

        return (
            <Critical
                labelIntlID={props.label}
                regularDamage={regularDamage!}
                criticalDamage={criticalDamage}
                expectedValue={expectedValue}
                valueClass={valueClass}
                subtable={
                    <InnerTable>
                        <UniqueValueEquation equationExpression={equationExpression} />
                        {healPower ? <HealPower baseValue={value.values[0]} healPower={healPower} /> : null}
                    </InnerTable>
                }
            />
        )
    }

    const sanitizedValue = value.value.addPercent(healPower || 0);

    return (
        <Standard
            label={props.label}
            value={sanitizedValue.floor().toString()}
            valueClass={valueClass}
            subtable={
                <InnerTable>
                    <UniqueValueEquation equationExpression={equationExpression} />
                    {healPower ? <HealPower baseValue={value.value} healPower={healPower} /> : null}
                </InnerTable>
            }
        />
    )
}

export default uniqueExpression;
