import * as React from "react";
import style from "./skill.module.styl";
import { ItemSkillDictionary, ItemSkillTooltipDefinitions } from "components/item-skills/item-skill";
import { EquipmentSkill } from "app-types/equipment";
import FormattedText from "components/common/formatted-text";
import { useIntl } from "react-intl";
import { useValueContextOptional } from "../value-context";
import * as es from "es-toolkit";
import { calculateValue } from "app-types/value-ratio/calculation";

const skill: React.FC<EquipmentSkill> = props => {
    const intl = useIntl();

    const { config, status, showEquation } = useValueContextOptional();
    console.log(props.skillCode)

    const sanitizedCode = (() => {
        if (props.skillCode == 6017006) return 6017005; // Vigor-Circulation does not provide same code between name and description.
        return props.skillCode;
    })();

    const values = ItemSkillDictionary[sanitizedCode].tooltip(props.dmg, props.values);

    const sanitizedValues = Object.entries(values).reduce((prev, [key, value]) => {
        const sanitizedValue = (() => {
            if (typeof value == "object") {
                return calculateValue(value, status!, config!).static.floor().toString();
            }
            return value;
        })();

        return {
            ...prev,
            [key.toString()]: sanitizedValue
        }
    }, {} as Record<string, string | number>);

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