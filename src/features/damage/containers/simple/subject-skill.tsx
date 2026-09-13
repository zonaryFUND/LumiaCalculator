import * as React from "react";
import SubTable from "../../components/simple/subtable";
import CriticalAvailable from "../potency-rows/critical-available";
import StandardDamage from "../potency-rows/standard-damage";
import UniqueExpression from "../potency-rows/unique-expression";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";

type Props = {
    tables: SubjectDamageTableUnit[][]
}

const SubjectSkill: React.FC<Props> = props => {
    const renderedUnitsChunks = props.tables.map(chunk => {
        return chunk.flatMap((unit): React.ReactElement[] => {
            // damageDependentHealが設定されている項目は、Simpleモードでは表示しない
            // （対戦モードの軽減後ダメージ値がないと回復量を計算できないため）
            if (unit.damageDependentHeal != undefined) return [];

            if (typeof unit.value == "function") {
                return [
                    <UniqueExpression
                        key={unit.label}
                        {...unit}
                        strategy={unit.value}
                    />
                ];
            }

            if (unit.type?.type == "basic" && unit.type.critical != "none") {
                return [
                    <CriticalAvailable
                        key={unit.label}
                        {...unit}
                        value={unit.value}
                    />
                ];
            }

            return [
                <StandardDamage
                    key={unit.label}
                    {...unit}
                    value={unit.value}
                />
            ];
        });
    });

    return (
        <SubTable
            label="実験体スキル"
            storageKey="subject-skill"
            valueHeaders={[{content: "ダメージ / 効果量", colSpan: 3}]}
            unitsChunks={renderedUnitsChunks}
        />
    )
}

export default SubjectSkill;
