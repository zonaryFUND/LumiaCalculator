import * as React from "react";
import SubTable from "../../components/simple/subtable";
import StandardDamage from "../potency-rows/standard-damage";
import UniqueExpression from "../potency-rows/unique-expression";
import { DamageTableUnit } from "core/damage-table/unit";
import { ValueRatio } from "core/value-ratio";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | UniqueValueStrategy
}

type Props = {
    label: React.ReactNode
    unitsChunks: Unit[][]
}

/**
 * 武器スキル・アイテムスキル・特性・戦術スキルなど、
 * 「基本攻撃属性の致命打表示を必要としない」カテゴリで共通利用するサブテーブルコンテナ。
 * 実験体スキル（{@link ../simple/subject-skill}）や基本攻撃（{@link ./basic-attack}）は
 * 致命打関連の特別な分岐を持つため、このコンポーネントとは別に用意している。
 */
const GenericSubTable: React.FC<Props> = props => {
    const renderedUnitsChunks = props.unitsChunks.map(chunk => {
        return chunk.flatMap((unit): React.ReactElement[] => {
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
            label={props.label}
            valueHeaders={[{content: "ダメージ / 効果量", colSpan: 3}]}
            unitsChunks={renderedUnitsChunks}
        />
    )
}

export default GenericSubTable;
