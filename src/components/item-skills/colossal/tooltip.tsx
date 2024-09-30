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
            着用者の体力が{Constants.threshold}%以下の時に敵実験体からダメージを受けると、
            {Constants.duration}秒間<Value ratio={Constants.shield} overrideExpression={{result:{className: style.maxhp}}} />のシールドを獲得します。
        </p> 
    );
}

export default description;