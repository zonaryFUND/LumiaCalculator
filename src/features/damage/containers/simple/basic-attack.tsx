import { BasicAttackElement } from "@app/ingame-params/subjects/type";
import { DamageTableUnit } from "core/damage-table/unit";
import * as React from "react";
import SubTable from "../../components/simple/subtable";
import { basicAttackRatioOf } from "core/subject-dynamic/status/basic-attack-ratio";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import CriticalAvailable from "../potency-rows/critical-available";
import StandardDamage from "../potency-rows/standard-damage";
import UniqueExpression from "../potency-rows/unique-expression";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
    unitsChunks: (BasicAttackElement | DamageTableUnit & { skillLevel?: number })[][]
}

const BasicAttack: React.FC<Props> = (props) => {
    const intl = useIntl();

    // 致命打が発生しない実験体に対しては、通常のスキルダメージと同様のヘッダを表示する
    // そうでない通常の実験体に対しては、致命打が発生する可能性があるため、通常威力・致命打威力・期待値の3列で表示する
    const displayCriticalHead = props.unitsChunks.flat().some(element => {
        if (element == "standard") return true;
        if (typeof element == "object" && element.type?.type == "basic" && element.type.critical != "none") return true;
        return false;
    });

    const config = useSubjectStateStore(state => state.config);
    const { attackRatio: standardAttackRatio, labelIntlID: standardAttackLabelIntlID } = basicAttackRatioOf(config);

    const renderedUnitsChunks = props.unitsChunks.map(chunk => {
        return chunk.flatMap((unit): React.ReactElement[] => {
            if (unit == "standard") {
                // 致命打について通常通りのダメージ計算を適用する「standard」定義であり、
                // かつ攻撃力レシオが非undefinedで返されている（武器を装備している）場合のみ表示する
                if (standardAttackRatio == undefined || standardAttackLabelIntlID == undefined) return [];

                return [
                    <CriticalAvailable
                        key="standard"
                        label={intl.formatMessage({id: standardAttackLabelIntlID})}
                        value={{attack: standardAttackRatio, basicAttackAmp: 100}}
                        origin="other"
                    />
                ];
            }

            if (unit == "disable-critical") {
                // 致命打が発生しない基本攻撃威力の「disable-critical」定義
                if (standardAttackRatio == undefined || standardAttackLabelIntlID == undefined) return [];

                return [
                    <StandardDamage
                        key="disable-critical"
                        label={intl.formatMessage({id: standardAttackLabelIntlID})}
                        type={{type: "basic", critical: "none"}}
                        value={{attack: standardAttackRatio, basicAttackAmp: 100}}
                        origin="other"
                    />
                ];
            }

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

            if (unit.type?.type == "basic" && unit.type.critical == undefined) {
                return [
                    <CriticalAvailable
                        key={unit.label}
                        label={unit.label}
                        origin={unit.origin}
                        value={unit.value}
                        multiplier={unit.multiplier}
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
            label={<FormattedMessage id="app.basic-attack" />}
            storageKey="basic-attack"
            labelColSpan={displayCriticalHead ? undefined : 3}
            valueHeaders={
                displayCriticalHead ? [
                    {content: <FormattedMessage id="app.standard-value" />},
                    {content: <FormattedMessage id="app.critical-hit" />},
                    {content: <FormattedMessage id="app.expected-value" />}
                ] : [
                    {content: <FormattedMessage id="app.standard-value" />}
                ]
            }
            unitsChunks={renderedUnitsChunks}
        />
    )
}

export default BasicAttack;
