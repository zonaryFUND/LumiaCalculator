import * as React from "react";
import table from "components/common/table.module.styl";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import StandardDamage from "./rows/standard-damage";
import CriticalAvailable from "./rows/critical-available";
import Decimal from "decimal.js";
import { useCombatHPContext } from "../combat-hp-context";
import { ValueRatio } from "app-types/value-ratio";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";

type Props = {
    label: string
    elements: (SubjectDamageTableUnit | Omit<DamageTableUnit, "value"> & {value: ValueRatio | UniqueValueStrategy} & {skillLevel?: number})[][]
    attacker: {
        config: SubjectConfig
        status: Status
    }
}

const subTable: React.FC<Props> = props => {
    const { ltr } = useCombatHPContext();
    const hpRatioHeader = [
        <td key="self">自己体力比</td>,
        <td key="effect">効果量</td>,
        <td key="target">対象体力比</td>
    ]

    return (
        <tbody>
            <tr className={table.separator}>
                <td>{props.label}</td>
                {ltr == "ltr" ? hpRatioHeader : hpRatioHeader.toReversed()}
            </tr>
            {
                props.elements.flatMap((chunk, index) => {
                    const separator = index == 0 || chunk.length == 0 ? 
                        null :
                        <tr key={`separator-${index}`} className={table.border}><td colSpan={5}></td></tr>;

                    const elements = chunk.flatMap(unit => {
                        const skillLevel = (() => {
                            if ("skillLevel" in unit) return unit.skillLevel;
                            return "skill" in unit ? props.attacker.config.skillLevels[unit.skill] : undefined;
                        })();

                        if (typeof unit.value == "function") {
                            const { value } = unit.value(props.attacker.config, props.attacker.status);
                            if (Array.isArray(value)) {
                                return value
                                    .map((v, index) => {
                                        if (v == undefined) return null;
                                        const labelSuffix = [
                                            "(基礎値)", 
                                            value[2] == undefined ? "(確定致命打)" : "(致命打)", 
                                            "(期待値)"
                                        ];
                                        const label = `${unit.label}${labelSuffix[index]}`
                                        return <StandardDamage
                                            key={label}
                                            {...unit}
                                            label={label}
                                            value={v}
                                            skillLevel={skillLevel}
                                            config={props.attacker.config}
                                            status={props.attacker.status}
                                        />
                                    })
                                    .filter((e): e is React.ReactElement => e != null)
                            } else {
                                return [
                                    <StandardDamage 
                                        {...unit}
                                        key={unit.label}
                                        value={value}
                                        skillLevel={skillLevel}
                                        config={props.attacker.config}
                                        status={props.attacker.status}
                                    />
                                ];
                            }
                        } else {
                            if (unit.type?.type == "basic" && unit.type.critical == undefined) {
                                return [
                                    <CriticalAvailable 
                                        {...unit}
                                        key={unit.label}
                                        value={unit.value}
                                        skillLevel={skillLevel}
                                        config={props.attacker.config}
                                        status={props.attacker.status}
                                    />
                                ];
                            } else if (
                                unit.type != undefined && 
                                "target" in unit.type && 
                                unit.type.target == "any"
                            ) {
                                const keys = Object.keys(unit.value);
                                if (["targetMaxHP", "targetLostHP", "targetHP"].findIndex(key => keys.includes(key)) >= 0) {
                                    // if heal/shield value is target-status dependent, draw 2 cells
                                    return [
                                        <StandardDamage 
                                            {...unit}
                                            key={`${unit.label}(自分へ)`}
                                            label={`${unit.label}(自分へ)`}
                                            value={unit.value}
                                            skillLevel={skillLevel}
                                            config={props.attacker.config}
                                            status={props.attacker.status}
                                            targetSide="anyToSelf"
                                        />,
                                        <StandardDamage 
                                            {...unit}
                                            key={`${unit.label}(相手へ)`}
                                            label={`${unit.label}(相手へ)`}
                                            value={unit.value}
                                            skillLevel={skillLevel}
                                            config={props.attacker.config}
                                            status={props.attacker.status}
                                            targetSide="anyToOpponent"
                                        />
                                    ];
                                } else {
                                    return [
                                        <StandardDamage 
                                            {...unit}
                                            key={unit.label}
                                            value={unit.value}
                                            skillLevel={skillLevel}
                                            config={props.attacker.config}
                                            status={props.attacker.status}
                                            targetSide="both"
                                        />
                                    ];
                                }
                            } else {
                                return [
                                    <StandardDamage 
                                        {...unit}
                                        key={unit.label}
                                        value={unit.value}
                                        skillLevel={skillLevel}
                                        config={props.attacker.config}
                                        status={props.attacker.status}
                                    />
                                ];
                            }
                        }
                    })

                    return separator ? [separator].concat(elements) : elements;
                })
        }
        </tbody>
    )
}

export default subTable;