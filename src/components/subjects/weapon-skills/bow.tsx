import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const bow: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した地点に矢の束を発射して矢の雨を降らせます。<br />
            発射した矢は{Constants.bow.after}秒後に目標時点に降り、矢の雨に当たった対象に
            <Value skill="D" ratio={Constants.bow.damage} />のスキルダメージを与えて
            {Constants.bow.slow.duration}秒間移動速度を{Constants.bow.slow.effect}%減少させます。<br />
            矢の雨の中心にいる場合には<Value skill="D" ratio={Constants.bow.center_damage} />のスキルダメージを受けます。
        </>
    );
}

export default bow;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.bow.damage.base},
        {title: "内側ダメージ量", values: Constants.bow.center_damage.base},
        {title: "クールダウン", values: Constants.bow.cooldown},
    ]
}