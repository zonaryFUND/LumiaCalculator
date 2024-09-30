import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => {
    return (
        <p>
            {Constants.cooldown}秒ごとに次の基本攻撃が強化されて射程距離が{props.values.extend}%増加し、
            <Value ratio={props.values.dmg} overrideExpression={{result: {className: style.level}}} />の追加スキルダメージを与えます。<br />
            基本攻撃するたびにバレル延長スキルのクールダウンが{Constants.cooldown_reduction}秒ずつ減少します。
        </p> 
    );
}

export default description;