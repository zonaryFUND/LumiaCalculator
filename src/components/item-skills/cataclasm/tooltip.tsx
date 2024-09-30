import * as React from "react";
import Value from "../value";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            敵実験体にスキルを的中させると、{Constants.duration}秒後に爆発し、的中した実験体の周りに
            <Value ratio={Constants.damage} overrideExpression={{result: {className: style.amp}}} />のスキルダメージを与える爆発を起こします。
        </p> 
    );
}

export default description;