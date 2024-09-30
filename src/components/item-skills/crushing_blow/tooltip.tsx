import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            戦闘状態になった後、{Constants.cooldown}秒ごとに強化基本攻撃をチャージします。強化基本攻撃は
            <Value ratio={Constants.damage} overrideExpression={{result: {className: style.maxhp}}} />の追加スキルダメージを与えて
            <Value ratio={Constants.heal} overrideExpression={{result: {className: style.maxhp}}} />の体力を回復します。
        </p> 
    );
}

export default description;