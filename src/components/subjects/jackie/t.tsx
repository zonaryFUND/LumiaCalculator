import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーからダメージを受けた敵実験体が{Constants.T.duration}秒以内に瀕死状態または死亡する場合、 ジャッキーの基本スキルのクールダウンが初期化されます。<br />
        <br />
        ジャッキーはスキルで敵にダメージを与えると、{Constants.T.bleeding_duration}秒間<Value skill="T" ratio={Constants.T.bleeding_damage} />
        の持続ダメージを与える出血効果を与えます。ジャッキーは出血状態の対象に基本攻撃すると、<Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えて出血の持続時間を更新します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "出血ダメージ量", values: Constants.T.bleeding_damage.base},
        {title: "出血対象追加ダメージ量", values: Constants.T.damage.base}
    ]
}