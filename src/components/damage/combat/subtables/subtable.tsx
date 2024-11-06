import * as React from "react";
import table from "components/common/table.styl";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectDamageTableUnit } from "components/subjects/damage-table";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import StandardDamage from "./rows/standard-damage";
import CriticalAvailable from "./rows/critical-available";
import Decimal from "decimal.js";
import { useCombatHPContext } from "../combat-hp-context";

type Props = {
    label: string
    elements: (SubjectDamageTableUnit | DamageTableUnit & {skillLevel?: number})[][]
    attacker: {
        config: SubjectConfig
        status: Status
    }
}

const subTable: React.FC<Props> = props => {
    const { ltr } = useCombatHPContext();
    const hpRatioHeader = [
        <td>自己体力比</td>,
        <td>効果量</td>,
        <td>対象体力比</td>
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
                            console.log(value)
                            if (Array.isArray(value)) {
                                return value
                                    .map((v, index) => {
                                        if (v == undefined) return null;
                                        const label = [
                                            "(基礎値)", 
                                            value[2] == undefined ? "(確定致命打)" : "(致命打)", 
                                            "(期待値)"
                                        ];
                                        return <StandardDamage 
                                            {...unit}
                                            label={`${unit.label}${label[index]}`}
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
                                            label={`${unit.label}(自分へ)`}
                                            value={unit.value}
                                            skillLevel={skillLevel}
                                            config={props.attacker.config}
                                            status={props.attacker.status}
                                            targetSide="anyToSelf"
                                        />,
                                        <StandardDamage 
                                            {...unit}
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
                /*
                definition?.skill.map((array, index) => 
                    <React.Fragment key={index}>
                    {
                        index == 0 ? null :
                        <tr className={table.border}><td colSpan={3}></td></tr>
                    }
                    {
                        array.map(s => {
                            if (s.type?.type == "basic" && s.type.critical != "none") {
                                const level = extractskillLevel(s, attacker.config);
                                const multiplier = extractMultiplier(level, s.multiplier)?.[0];
                                const sanitizedDict = Object.fromEntries(
                                    Object.entries(s.value).map(([key, value]) => {
                                        return [key, Array.isArray(value) ? value[level] : value]
                                    })
                                );
                                return <BasicAttackDamage 
                                    name={s.label} 
                                    status={attacker.status} 
                                    config={sanitizedDict} 
                                    multiplier={multiplier} 
                                />;
                            }

                            if ((s.type?.type == "heal" || s.type?.type == "shield") && s.type.target == "any") {
                                return (
                                    <>
                                        <SkillDamage 
                                            {...s}
                                            key={s.label + "_self"}
                                            label={s.label + "(自己)"}
                                            status={attacker.status} 
                                            config={attacker.config} 
                                            selfTarget={true}
                                        />
                                        <SkillDamage 
                                            {...s}
                                            key={s.label + "_opponent"} 
                                            label={s.label + "(相手)"} 
                                            status={attacker.status} 
                                            config={attacker.config} 
                                        />
                                    </>
                                )
                            } 

                            if (s.type == "kenneth-heal") {
                                return (
                                    <>
                                        <KennethHeal status={attacker.status} config={attacker.config} onEEffect={false} />
                                        <KennethHeal status={attacker.status} config={attacker.config} onEEffect={true} />
                                    </>
                                )
                            }

                            return <SkillDamage 
                                key={s.label} 
                                status={attacker.status} 
                                config={attacker.config} {...s}
                            />;
                        })
                    }
                    </React.Fragment>
                )
                    */
        }
        </tbody>
    )
}

export default subTable;