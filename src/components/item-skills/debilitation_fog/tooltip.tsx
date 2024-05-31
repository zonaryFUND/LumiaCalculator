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
            敵実験体に移動不可効果を適用させた場合には、敵実験体が攻撃された場所に{Constants.duration}秒間維持されるエリアを生成します。エリア内の敵は防御力が
            {Constants.defense_down}%減少し、毎秒<Value ratio={Constants.damage} overrideExpression={{result: {className: style.maxhp}}} />
            のスキルダメージを受けます。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;