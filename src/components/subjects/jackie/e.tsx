import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーが指定した位置にジャンプし、周りの敵に<Value skill="E" ratio={Constants.E.damage} />
        のスキルダメージを与え、{Constants.E.slow.duration}秒間敵の移動速度を{Constants.E.slow.effect}%減少させます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}