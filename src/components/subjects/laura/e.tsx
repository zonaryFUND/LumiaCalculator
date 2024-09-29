import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ラウラが1指定した方向に鞭を発射します。鞭が壁に届いた場合には壁の方に突進し、{Constants.E.reuse}秒間スキルを再使用できます。<br />
            <br />
            再使用：指定した位置に突進してジャンプした後、着地しながら周りの敵に<Value skill="E" ratio={Constants.E.damage} />
            のスキルダメージを与えて{Constants.E.airborne}秒間敵を空中に浮かせます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown},
    ]
}
