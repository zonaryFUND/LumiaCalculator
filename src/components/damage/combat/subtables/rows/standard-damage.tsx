import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { isValueRatio, RatioKeys, ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { extractMultiplier } from "components/damage/damage-table-util";
import * as React from "react";
import { useToggle } from "react-use";
import { useCombatHPContext } from "../../combat-hp-context";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";
import { useMitigation } from "../../mitigation-context";
import mitigatedDamage from "../../mitigated-damage";
import Potency from "../subrows/potency";
import HealPower from "../subrows/heal-power";
import Mitigation from "../subrows/mitigation";
import DamageDependentHeal from "../subrows/damage-dependent-heal";
import style from "../../../damage-table.module.styl";
import table from "components/common/table.styl";
import useDynamicValueCalculation from "./use-dynamic-value-calculation";
import { FormattedDate, FormattedMessage } from "react-intl";

type Props = Omit<DamageTableUnit, "value"> & {
    skillLevel?: number
    value: ValueRatio | Decimal
    config: SubjectConfig
    status: Status
    targetSide?: "anyToSelf" | "both" | "anyToOpponent" // never use "both" when value contains target-specific key
}

const standardDamage: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const {static: staticBasePotency, dynamic: dynamicBasePotency, dynamicValueOnly} = (() => {
        if (isValueRatio(props.value)) {
            return calculateValue(props.value, props.status, props.config, props.skillLevel);
        } else {
            return { static: props.value, dynamic: undefined, dynamicValueOnly: false };
        }
    })();
    const { hp, targetHP, targetMaxHP } = useCombatHPContext();
    const multiplier = extractMultiplier(props.skillLevel, props.multiplier);

    const staticPotency = staticBasePotency.percent(multiplier?.[0] ?? 100);

    const { 
        potencyDictionary: dynamicPotencyDictionary,
        potency: dynamicPotency
    } = useDynamicValueCalculation(
        dynamicBasePotency,
        multiplier?.[0],
        {hp, maxHP: props.status.maxHP.calculatedValue}, // sender
        props.targetSide == "anyToSelf" ? {
            hp, maxHP: props.status.maxHP.calculatedValue // self-target
        } : {
            hp: targetHP, maxHP: targetMaxHP            // opponent target
        }
    )

    const totalPotency = staticPotency.add(dynamicPotency)
    const healPower = props.type?.type == "heal" && props.status.healPower.calculatedValue.greaterThan(0) ? props.status.healPower.calculatedValue : null;
    const finalPotency = totalPotency.addPercent(healPower ?? 0);
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
                            if (props.skillLevel == undefined) {
                                throw new Error("damage dependent heal is array but skill level is not provided.");
                            }
                            return props.damageDependentHeal[props.skillLevel];
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

    if (props.type && "hitCount" in props.type && props.type.hitCount) {
        console.log(props)
        console.log(mitigationInfo)
    }

    const target = props.type != undefined && "target" in props.type ? props.type.target : undefined;
    const selfHPRatio = (() => {
        if (
            props.type?.type == "misc" ||
            target == undefined || target == "ally" || props.targetSide == "anyToOpponent"
        ) {
            return undefined
        } else {
            return mitigatedValue.dividedBy(props.status.maxHP.calculatedValue)
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
                baseDamage={damageDependentHealValue.base}
                ratio={damageDependentHealValue.multiplier}
                calculated={mitigatedValue}
            /> 
            :
            <Potency
                staticPotency={dynamicValueOnly ? undefined : staticPotency}
                dynamicPotencyDictionary={dynamicPotencyDictionary}
                sum={totalPotency}
            />,
            healPower ? <HealPower baseValue={totalPotency} healPower={healPower} calculated={finalPotency} /> : [],
            mitigationInfo.map(info => <Mitigation key={info.labelIntlID} {...info} />)
        ].flat()
    })();

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.label}</td>
                {
                    selfHPRatio ? 
                    <td className={valueClass}>{selfHPRatio.toString()}%</td> :
                    <td />
                }
                <td className={valueClass}>{mitigatedValue.floor().toString()}{percent ? "%" : null}</td>
                {
                    opponentHPRatio ? 
                    <td className={valueClass}>{opponentHPRatio.toString()}%</td> :
                    <td />
                }
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