import * as React from "react";
import Value from "../value";
import Constants from "./constants.json";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            基本攻撃が敵実験体に的中すると、<Value ratio={Constants.damage} />
            の追加スキルダメージを与えて{props.values.duration}秒間情熱スタックを獲得し、
            {Constants.attack_speed}%の攻撃速度を獲得します。
        </p> 
    );
}

export default description;