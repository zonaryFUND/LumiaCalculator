import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import Value from "../value";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        戦闘に突入すると秒ごとに周り{Constants.area}mの敵に<Value ratio={props.values.dmg} overrideExpression={{result: {className: style.maxhp}}} />のスキルダメージを与えます。
    </p> 
);

export default description;