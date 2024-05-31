import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Damage from "../value";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        基本攻撃が敵実験体に命中すると、<Damage ratio={props.values.dmg} overrideExpression={{result: {className: style.amp}}} />のスキルダメージを与え、
        {Constants.duration}秒間情熱スタックを獲得して、{props.values.as}%の攻撃速度を獲得します。
    </p> 
);

export default description;