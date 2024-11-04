import * as React from "react";
import style from "./skill.module.styl";
import HealingReduction from "components/item-skills/healing_reduction/tooltip";

import { ItemSkillProps, ItemSkillTooltipDefinitions } from "components/item-skills/item-skill";
import { EquipmentAbility, name } from "app-types/equipment/ability";

const skill: React.FC<EquipmentAbility & ItemSkillProps> = props => {
    const description = (() => {
        if (props.id == "healing_reduction_weak") {
            return React.createElement(ItemSkillTooltipDefinitions["healing_reduction"], {...props, intensity: "weak"} as any);
            //return <HealingReduction intensity="weak" />;
        } else if (props.id == "healing_reduction_strong") {
            return React.createElement(ItemSkillTooltipDefinitions["healing_reduction"], {...props, intensity: "strong"} as any);
            //return <HealingReduction intensity="strong" />;
        } else {
            return React.createElement(ItemSkillTooltipDefinitions[props.id], props);
        }
    })();

    return (
        <div className={style.skill}>
            <header>
                <h2>固有装備効果</h2>
            </header>
            <h3>{name(props.id, "jp")}</h3>
            {description}
        </div>
    );
};

export default skill;