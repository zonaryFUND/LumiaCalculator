import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            敵実験体の移動を妨害した場合、{Constants.duration}秒間維持される[刻印]を残します。味方が[刻印]が残された対象に基本攻撃をすると、
            <Value ratio={Constants.damage} overrideExpression={{result: {className: style.level}}} />の追加スキルダメージを与え、攻撃した味方は<Value ratio={Constants.heal} overrideExpression={{result: {className: style.level}}} />の体力を回復します。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;