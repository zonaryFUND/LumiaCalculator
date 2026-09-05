import * as React from "react";
import style from "./skill.module.styl";
import { EquipmentAbilityTooltipDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { EquipmentSkill, Tier } from "core/equipment";
import FormattedText from "components/common/formatted-text";
import { useIntl } from "react-intl";
import { useValueContext, useValueContextOptional } from "../value-context";
import { ExtractAndCalculateValue } from "../extract-tooltip-value";

type Props = EquipmentSkill & { itemGrade: Tier }

const skill: React.FC<Props> = props => {
    const intl = useIntl();

    const { config, status, showEquation } = useValueContext();

    const sanitizedCode = (() => {
        if (props.skillCode == 6017006) return 6017005; // Vigor-Circulation does not provide same code between name and description.
        return props.skillCode;
    })();

    const values = EquipmentAbilityTooltipDictionary[sanitizedCode]({
        showEquation,
        config,
        status,
        itemGrade: props.itemGrade,
        importedDamage: props.dmg,
        importedValues: props.values
    });

    const sanitizedValues = Object.entries(values).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key.toString()]: ExtractAndCalculateValue(value, intl, config, status, "other")
        }
    }, {} satisfies Record<string, string | number>);

    return (
        <div className={style.skill}>
            <header>
                <h2>固有装備効果</h2>
            </header>
            <h3><FormattedText text={intl.formatMessage({id: `Item/Skills/${props.skillCode}/Name`})} /></h3>
            <p><FormattedText text={intl.formatMessage({id: `Item/Skills/${sanitizedCode}/${showEquation ? "Desc" : "Body"}`})} values={sanitizedValues} /></p>
        </div>
    );
};

export default skill;