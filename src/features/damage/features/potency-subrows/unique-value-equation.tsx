import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import { EquationExpression } from "@app/ingame-params/subjects/unique-value-strategy";


type Props = {
    intlID?: string
    equationExpression: EquationExpression[]
}

/**
 * 固有の計算ロジックを有する効果量の詳細な計算式サブセルを生成する。
 * l10nの変換、ステータスレシオの該当ステータスに対する表記変換を行い、配列をそのまま並べて構成する。
 */
const UniqueValueEquation: React.FC<Props> = props => {
    return props.equationExpression.map((items, parentIndex) => {
        const equation = items.expression.map((item, index) => {
            if (typeof item == "string") {
                return <React.Fragment key={`${item}-${index}`}>{item}</React.Fragment>;
            }
            if ("intlID" in item) {
                return (
                    <span key={`${item.intlID}-${index}`} className={table.small}>
                        <FormattedMessage id={item.intlID} />
                    </span>
                );
            }
            if ("ratioKey" in item) {
                return (
                    <span key={`${item.ratioKey}-${index}`} className={table.small}>
                        {(() => {
                            switch (item.ratioKey) {
                                case "base":
                                    return null;
                                case "attack":
                                    return <FormattedMessage id="StatType/AttackPower" />;
                                case "additionalAttack":
                                    return <FormattedMessage id="ToolTipType/AddAttackPower" />;
                                case "additionalMaxHP":
                                    return <FormattedMessage id="StatType/AddedHpAmount" />;
                                case "maxHP":
                                    return <FormattedMessage id="StatType/MaxHp" />;
                                case "defense":
                                    return <FormattedMessage id="StatType/Defense" />;
                                case "amp":
                                    return <FormattedMessage id="StatType/SkillAmp" />;
                                case "level":
                                    return <FormattedMessage id="레벨" />;
                                case "basicAttackAmp":
                                    return <FormattedMessage id="StatType/IncreaseBasicAttackDamageRatio" />;
                                case "criticalChance":
                                    return <FormattedMessage id="StatType/CriticalStrikeChance" />;
                                case "criticalDamage":
                                    return <FormattedMessage id="app.critical-damage-increase" />;
                                case "stack":
                                    return <FormattedMessage id="app.stack" />;
                                case "additionalAttackSpeed":
                                    return <FormattedMessage id="StatType/AttackSpeedRatioValue" />;
                                case "gauge":
                                    return <FormattedMessage id="app.gauge" />;
                            }
                        })()}
                    </span>
                )
            }
        })

        return (
            <tr key={`${items.labelIntlID}-${parentIndex}`}>
                {items.labelIntlID ? <FormattedMessage id={items.labelIntlID} /> : null}
                <td colSpan={items.labelIntlID ? undefined : 2}>{equation}</td>
            </tr>
        )
    });
}

export default UniqueValueEquation;
