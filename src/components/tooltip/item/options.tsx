import { EquipmentBaseStatus, EquipmentStatus, IsPercentExpressedEquipmentStatusKey } from "core/equipment";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import FormattedText from "components/common/formatted-text";

const options: React.FC<EquipmentStatus> = props => {
    const intl = useIntl();

    return (
        <ul>   
            {
                Object.entries(props).map(([key, value]) => {
                    if (!Decimal.isDecimal(value)) return null;

                    const statKey = key[0].toUpperCase() + key.slice(1);
                    const percent = IsPercentExpressedEquipmentStatusKey(key as keyof EquipmentBaseStatus) ? "%" : null;
                    const message = intl.formatMessage({id: `StatType/${statKey == "SkillAmpByLevel" ? "SkillAmpByLv" : statKey}`});

                    if (key.includes("Lv") || key.includes("Level")) {
                        return (
                            <li key={key}>
                                <FormattedText text={message} /> +{value.toFixed(1)}~{value.times(20).toFixed(1)}{percent}
                            </li>
                        )
                    } else if (key == "adaptiveForce") {
                        return (
                            <li key={key}>
                                <><FormattedMessage id="StatType/AttackPower" /> +{value.toString()}</>
                                <> <FormattedMessage id="app.or" /> </>
                                <><FormattedMessage id="StatType/SkillAmp" /> +{value.times(2).toString()}</>
                            </li>
                        );
                    } else {
                        return (
                            <li key={key}>
                                <FormattedText text={message} /> +{value.toString()}{percent}
                            </li>
                        )
                    }
                })
            }
        </ul>
    );
}

export default options;
