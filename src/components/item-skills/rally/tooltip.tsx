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
            究極技を使用すると、
            {Constants.tick}秒ごとに<Value ratio={Constants.damage} overrideExpression={{result: {className: style.attack}}} />のスキルダメージを与える竜巻を
            {Constants.duration}秒間発生させます。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;