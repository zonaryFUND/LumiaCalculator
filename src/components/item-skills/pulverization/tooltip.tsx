import * as React from "react";
import Constants from "./constants.json";

const description: React.FC = _ => (
    <p>
        敵実験体に個別攻撃をすると、{Constants.duration}秒間{Constants.max_stack}回までスタックされる[粉砕]効果を与えます。
        [粉砕]効果は敵実験体の防御力を{Constants.armor}%減少させます。<br />
        [粉砕]効果が適用されている対象にダメージを与える場合、{Constants.ms.duration}秒間移動速度が{Constants.ms.effect}増加します。
    </p> 
);

export default description;