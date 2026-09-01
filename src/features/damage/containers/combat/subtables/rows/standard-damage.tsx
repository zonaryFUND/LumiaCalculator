import { DamageTableUnit } from "core/damage-table/unit";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { extractSkillLevel, ValueRatio } from "core/value-ratio";
import { calculateValue, resolveDynamicValue } from "core/value-ratio";
import { extractMultiplier } from "core/damage-table/multiplier";
import * as React from "react";
import { useToggle } from "react-use";
import { useCombatHPContext } from "../../combat-hp-context";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";
import { useMitigation } from "../../mitigation-context";
import { mitigatedDamage } from "core/damage-table/mitigation";
import { healPowerRatiosOf, applyHealPower } from "core/damage-table/heal-power";
import Potency from "../subrows/potency";
import HealPower from "../subrows/heal-power";
import Mitigation from "../subrows/mitigation";
import DamageDependentHeal from "../subrows/damage-dependent-heal";
import style from "../../../../components/potency-rows/damage-table.module.styl";
import table from "components/common/table.module.styl";

type Props = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | Decimal
    critical?: Decimal
    config: SubjectConfig
    status: Status
    targetSide?: "anyToSelf" | "both" | "anyToOpponent" // never use "both" when value contains target-specific key
}

const standardDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const {static: staticBasePotency, dynamic: dynamicBasePotency} = (() => {
        if (Decimal.isDecimal(props.value)) {
            return { static: props.value, dynamic: undefined };
        } else {
            return calculateValue(props.value, props.status, props.config, props.origin);
        }
    })();
    const skillLevel = extractSkillLevel(props.config, props.origin);
    const { hp, targetHP, targetMaxHP, ltr } = useCombatHPContext();
    const multiplier = extractMultiplier(props.multiplier, skillLevel);

    const staticPotency = staticBasePotency.percent(props.critical ?? 100).percent(multiplier?.mergedMultiplier ?? 100);

    const {
        potencyDictionary: dynamicPotencyDictionary,
        potency: dynamicPotency
    } = resolveDynamicValue(
        dynamicBasePotency,
        multiplier?.mergedMultiplier,
        {hp, maxHP: props.status.maxHp.calculatedValue}, // sender
        props.targetSide == "anyToSelf" ? {
            hp, maxHP: props.status.maxHp.calculatedValue // self-target
        } : {
            hp: targetHP, maxHP: targetMaxHP            // opponent target
        }
    )

    const totalPotency = staticPotency.add(dynamicPotency)
    const healPowerRatios = healPowerRatiosOf(props.status, props.type);
    const finalPotency = applyHealPower(totalPotency, healPowerRatios);
    // healPowerRatiosは複数の増加効果を独立に乗算しうるため、比率ごとに1行ずつ、直前の結果を基準値として
    // 積み上げて表示する
    const healPowerRows = (() => {
        let running = totalPotency;
        return healPowerRatios.map((ratio, i) => {
            const next = running.addPercent(ratio);
            const row = <HealPower key={`healpower-${i}`} baseValue={running} healPower={ratio} calculated={next} />;
            running = next;
            return row;
        });
    })();
    const mitigationContext = useMitigation();

    const [mitigatedValue, damageDependentHealValue, mitigationInfo] = (() => {
        if (props.type == undefined || props.type.type == "basic" || props.damageDependentHeal) {
            const mitigated = mitigatedDamage(
                finalPotency, 
                mitigationContext, 
                props.type?.type == "basic" ? "basic" : "skill",
                false,
                (props.type && "hitCount" in props.type) ? props.type.hitCount : undefined
            );
            if (props.damageDependentHeal) {
                if (typeof props.damageDependentHeal == "function") {
                    const response = props.damageDependentHeal({potency: finalPotency, calculatedDamage: mitigated[0] });
                    return[response.heal, {base: response.baseValue, multiplier: response.multiplier}, []]
                }  else {
                    const multiplier = (() => {
                        if (Array.isArray(props.damageDependentHeal)) {
                            if (skillLevel == undefined) {
                                throw new Error("damage dependent heal is array but skill level is not provided.");
                            }
                            return props.damageDependentHeal[skillLevel];
                        } else {
                            return props.damageDependentHeal;
                        }
                    })();
                    return [mitigated[0].percent(multiplier), {base: mitigated[0], multiplier}, []]
                }
            } else {
                return [mitigated[0], undefined, mitigated[1]]
            }
        } else {
            return [finalPotency, undefined, []]
        }
    })();

    const target = props.type != undefined && "target" in props.type ? props.type.target : undefined;
    const selfHPRatio = (() => {
        if (
            props.type?.type == "misc" ||
            target == undefined || target == "ally" || props.targetSide == "anyToOpponent"
        ) {
            return undefined
        } else {
            return mitigatedValue.dividedBy(props.status.maxHp.calculatedValue)
                .times(100).floor2();
        }
    })();

    const opponentHPRatio = (() => {
        if (
            props.type?.type == "misc" ||
            props.targetSide == "anyToSelf" || target == "self"
        ) {
            return undefined;
        } else {
            return mitigatedValue
                .dividedBy(targetMaxHP)
                .times(100).floor2()
        }
    })();

    const valueClass = props.type ? style[props.type.type] : style.skill;
    const percent = React.useMemo(() => props.type && ("percentExpression" in props.type) && props.type.percentExpression, [props.type]);

    const subrows = (() => {
        if (props.type?.type == "misc") return [];

        return [
            damageDependentHealValue ?
            <DamageDependentHeal 
                key="damage-dependent-heal"
                baseDamage={damageDependentHealValue.base}
                ratio={damageDependentHealValue.multiplier}
                calculated={mitigatedValue}
            /> 
            :
            <Potency
                key="potency"
                staticPotency={staticPotency}
                dynamicPotencyDictionary={dynamicPotencyDictionary}
                sum={totalPotency}
            />,
            healPowerRows,
            mitigationInfo.map(info => <Mitigation key={info.labelIntlID} {...info} />)
        ].flat()
    })();

    const hpRatio: React.ReactElement[] = [
        selfHPRatio ? 
        <td key="self" className={valueClass}>{selfHPRatio.toString()}%</td> :
        <td key="self" />,
        <td key="effect" className={valueClass}>{mitigatedValue.floor().toString()}{percent ? "%" : null}</td>,
        opponentHPRatio ? 
        <td key="opponent" className={valueClass}>{opponentHPRatio.toString()}%</td> :
        <td key="opponent" />
    ];

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.label}</td>
                {ltr == "ltr" ? hpRatio : hpRatio.toReversed()}
            </tr>
            {
                subrows.length == 0 ? null :
                <tr className={table.expand} style={expand ? undefined : {display: "none"}}>
                    <td colSpan={5}>
                        <InnerTable>
                            {subrows}
                        </InnerTable>
                    </td>
                </tr>
            }
        </>
    )
}

export default standardDamage;