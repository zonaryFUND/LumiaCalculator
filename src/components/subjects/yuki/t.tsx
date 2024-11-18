import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        雪が敵にダメージを与える時、ボタンを1個消費して{Constants.T.damage.base[props.skillLevel]}の追加固定ダメージを与えます。ボタンが無い時には適用されません。<br />
        <br />
        ボタンは非戦闘状になるか、襟正しを使用すると最大値まで回復します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "固定ダメージ量", values: Constants.T.damage.base}
    ]
}