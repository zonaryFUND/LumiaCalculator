import * as React from "react";
import Value from "../value";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        基本攻撃をすると、<Value ratio={Constants.damage} overrideExpression={{result: {className: style.attack}}} />の追加スキルダメージを与え、ダメージを与えた場合には
        <Value ratio={Constants.heal} overrideExpression={{result: {className: style.attack}, lostHP: {className: style.maxhp, format: "自分の失った体力の{ratio}%"}}} />
        の体力を回復します。最大体力を超えた分の回復量は{Constants.overheal_duration}秒間追加体力に変換されます。<br />(クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;