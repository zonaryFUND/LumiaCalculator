import { EquipmentStatus, EquipmentStatusKeys, EquipmentStatusValueKey, PercentExpressedEquipmentStatusKeys } from "app-types/equipment";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import FormattedText from "components/common/formatted-text";

const options: React.FC<EquipmentStatus> = props => {
    const intl = useIntl();

    return (
        <ul>   
            {
                EquipmentStatusKeys.map(key => {
                    if (props[key] == undefined) return null;
                    const statKey = key[0].toUpperCase() + key.slice(1);
                    const percent = PercentExpressedEquipmentStatusKeys.includes(key) ? "%" : null;
                    const message = intl.formatMessage({id: `StatType/${statKey}`});

                    if (key.includes("Lv") || key.includes("Level")) {
                        return (
                            <li key={key}>
                                <FormattedText text={message} /> +{props[key]?.toFixed(1)}~{props[key]?.times(20).toFixed(1)}{percent}
                            </li>
                        )
                    } else if (key == "adaptiveForce") {
                        return (
                            <li key={key}>
                                <><FormattedMessage id="StatType/AttackPower" /> +{props[key]?.toString()}</>
                                <> <FormattedMessage id="app.or" /> </>
                                <><FormattedMessage id="StatType/SkillAmp" /> +{props[key]?.times(2).toString()}</>
                            </li>
                        );
                    } else {
                        return (
                            <li key={key}>
                                <FormattedText text={message} /> +{props[key]?.toString()}{percent}
                            </li>
                        )
                    }
                })
            }
        </ul>
    );
}

export default options;
