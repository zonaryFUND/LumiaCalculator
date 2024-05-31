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
            {Constants.time_bound}秒以内に敵実験体に個別ダメージを{Constants.count}回的中させた場合、
            {Constants.tick}秒ごとに<Value ratio={Constants.damage} overrideExpression={{result: {className: style.amp}}} />のスキルダメージを与える突風が発生し、
            {Constants.duration}秒間維持されます。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;