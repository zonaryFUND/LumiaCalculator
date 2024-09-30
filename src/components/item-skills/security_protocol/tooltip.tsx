import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            敵実験体を移動不可状態にさせた場合には、{Constants.duration}秒間
            <Value ratio={Constants.shield} overrideExpression={{result: {className: style.maxhp}}} />のシールドを獲得します。自分の体力が最大体力の
            {Constants.threshold}%以下の場合には、保護プロトコルのシールド効果が{Constants.enhance}%増加します。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;