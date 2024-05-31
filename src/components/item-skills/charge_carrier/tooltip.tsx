import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import Value from "../value";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        {Constants.time_bound}秒以内に{Constants.threshold}回の個別ダメージを加えると、 
        {Constants.duration}秒間移動速度が<Value ratio={Constants.movement_speed} overrideExpression={{result: {className: style.level}}} /><span className={style.level}>%</span>増加して{Constants.shield.base}のシールドを獲得します。
        <br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;