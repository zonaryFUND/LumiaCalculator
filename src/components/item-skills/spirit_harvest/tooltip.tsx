import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            敵実験体にスキルダメージを与えると、<Value ratio={Constants.first_damage} overrideExpression={{result: {className: style.amp}}} />
            のスキルダメージを追加で与えて刻印を残します。刻印が残されてから{Constants.duration}秒後にスキルでもう一度ダメージを与えると、
            <Value ratio={Constants.second_damage} overrideExpression={{result: {className: style.amp}}} />のスキルダメージを追加で与えます。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;