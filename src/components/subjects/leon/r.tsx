import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            レオンが波を召喚します。レオンは波に乗って一緒に前進し、経路上の敵に<Value skill="R" ratio={Constants.R.damage} />
            のスキルダメージを与え、敵は波が消える瞬間まで押し出されます。波に押し出された敵が壁にぶつかると敵に<Value skill="R" ratio={Constants.R.wall_damage} />
            のスキルダメージを与えて{Constants.R.airborne}秒間空中に浮かせます。波が消える時、その場に水溜りが生成されます。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "衝突ダメージ量", values: Constants.R.wall_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
