import * as React from "react";

import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { useToggle } from "react-use";
import InnerTable from "components/common/inner-table";
import StaticValueEquation from "../../../../components/damage/simple/subtables/subrows/static-value-equation";
import MultiplyEquation from "../../../../components/damage/simple/subtables/subrows/mutiply-equation";
import CriticalHit from "../potency-subrows/critical-hit";
import style from "../../../damage-table.module.styl";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { calculateBasicAttackTypeDamage } from "components/damage/basic-attack-damage";

type Props =  DamageTableUnit & {
    /**
     * 実験体設定
     */
    config: SubjectConfig

    /**
     * 実験体ステータス
     */
    status: Status
}

/**
 * 致命打の可能性があるダメージ（致命打無効になっていない基本攻撃ダメージ属性）について、基礎値・致命打・期待値の3値をそれぞれセルで表示する効果量表示行、および計算式サブセルを構成する
 */
const criticalAvailable: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const {
        regularDamage,
        criticalDamage,
        expectedValue,
        multiplier
    } = calculateBasicAttackTypeDamage(props);
 
    const equations = (() => {
        if (multiplier) {
            // 複数段ヒットなどの倍率指定がされている効果量の場合、基礎値・致命打それぞれに対して最終計算結果に倍率をかける計算式行を表示する
            return (
                <>
                    <MultiplyEquation 
                        label={<FormattedMessage id="app.standard-value" />}
                        baseValue={regularDamage.base!}
                        multipliers={multiplier.individualExpressions}
                        finalValue={regularDamage.final}
                    />
                    <MultiplyEquation 
                        label={<FormattedMessage id="app.critical-hit" />}
                        baseValue={criticalDamage.base!}
                        multipliers={multiplier.individualExpressions}
                        finalValue={criticalDamage.final}
                    />
            </>
            )
        } else {
            // 通常の効果量の場合、基礎値の計算を示す計算式行と、致命打の計算を示す計算式行を表示する
            return (
                <>
                    <StaticValueEquation
                        label={<FormattedMessage id="app.standard-value" />}
                        origin={props.origin}
                        config={props.config}
                        status={props.status}
                        ratio={props.value}
                        calculated={<>{regularDamage.final.floor().toString()}</>}
                    />
                    <CriticalHit
                        regularDamage={regularDamage.final}
                        criticalDamage={criticalDamage.final}
                        criticalDamageAdditionalRatio={props.status.criticalStrikeDamage.calculatedValue}
                    />
                </>
            )
        }
    })();

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.label}</td>
                <td className={style.basic}>{regularDamage.final.toString()}</td>
                <td className={style.basic}>
                    {
                        props.status.criticalStrikeChance.calculatedValue.greaterThan(0) ? 
                        criticalDamage.final.toString() :
                        "-"
                    }
                </td> 
                <td className={style.basic}>{expectedValue.percent(multiplier?.mergedMultiplier ?? 100).floor().toString()}</td>
            </tr>
            <tr className={table.expand} style={expand ? undefined : {display: "none"}}>
                <td colSpan={4}>
                    <InnerTable>
                        {equations}
                    </InnerTable>
                </td>
            </tr>
        </>
    )
}

export default criticalAvailable;