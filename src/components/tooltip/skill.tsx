import { EquipmentAbility, name } from "@app/entity/equipment-ability";
import * as React from "react";
import style from "./skill.module.styl";
import HealingReduction from "components/item-skills/healing_reduction/tooltip";

import { ItemSkillDefinition, ItemSkillProps } from "components/item-skills/item-skill";

const skill: React.FC<EquipmentAbility & ItemSkillProps> = props => {
    const description = (() => {
        if (props.id == "healing_reduction_weak") {
            return React.createElement(ItemSkillDefinition["healing_reduction"].tooltip!, {...props, intensity: "weak"} as any);
            //return <HealingReduction intensity="weak" />;
        } else if (props.id == "healing_reduction_strong") {
            return React.createElement(ItemSkillDefinition["healing_reduction"].tooltip!, {...props, intensity: "strong"} as any);
            //return <HealingReduction intensity="strong" />;
        } else {
            console.log(props.id)
            return React.createElement(ItemSkillDefinition[props.id].tooltip!, props);
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