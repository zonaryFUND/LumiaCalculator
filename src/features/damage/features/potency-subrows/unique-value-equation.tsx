import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import { EquationExpression } from "@app/ingame-params/subjects/unique-value-strategy";


type Props = {
    intlID?: string
    equationExpression: EquationExpression[]
}

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
                                    return <FormattedMessage id="status.attack-power" />;
                                case "additionalAttack":
                                    return "追加攻撃力";
                                case "additionalMaxHP":
                                    return <FormattedMessage id="status.additional-maxhp" />;
                                case "maxHP":
                                    return <FormattedMessage id="status.maxhp" />;
                                case "defense":
                                    return <FormattedMessage id="status.defense" />;
                                case "amp":
                                    return <FormattedMessage id="status.skill-amp" />;
                                case "level":
                                    return "レベル";
                                case "basicAttackAmp":
                                    return "基本攻撃増幅";
                                case "criticalChance":
                                    return "致命打確率";
                                case "criticalDamage":
                                    return "致命打ダメージ増加量"
                                case "stack":
                                    return "スタック";
                                case "additionalAttackSpeed":
                                    return "追加攻撃速度(%)"
                                case "gauge":
                                    return "ゲージ";
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
