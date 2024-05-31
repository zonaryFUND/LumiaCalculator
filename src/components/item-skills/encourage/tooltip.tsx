import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import Value from "../value";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        味方に治癒またはシールドスキルを適用させた場合、自分以外に適用させた対象の適合能力値を{Constants.duration}秒間<Value ratio={Constants.adaptive} overrideExpression={{result: {className: style.level}}} />、
        攻撃速度を{Constants.as}%増加させます。
    </p> 
);

export default description;