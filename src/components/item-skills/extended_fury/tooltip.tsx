import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            {Constants.cooldown}秒ごとに次の基本攻撃が強化されて射程距離が{Constants.range_extend}%増加し、
            <Value ratio={Constants.damage} overrideExpression={{result: {className: style.level}}} />の追加スキルダメージを与えます。<br />
            基本攻撃するたびにバレル延長スキルのクールダウンが{Constants.cooldown_reduction}秒ずつ減少します。
        </p> 
    );
}

export default description;