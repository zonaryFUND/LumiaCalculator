import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            基本攻撃に的中した相手に<Value ratio={Constants.damage} overrideExpression={{result: {className: style.attack}}} />の追加スキルダメージを与えます。<br />
            近くに他の敵がいる場合、最大{Constants.spark_max}人に同じスキルダメージを与えるスパークを発射します。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;