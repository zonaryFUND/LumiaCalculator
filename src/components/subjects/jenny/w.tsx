import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ジェニーが指定した方向にレッドカーペットを設置して、的中した敵に<Value skill="W" ratio={Constants.W.first_damage} />
        のスキルダメージを与え、{Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
        <br />
        スキルを再使用すると、レッドカーペットの上の敵に<Value skill="W" ratio={Constants.W.second_damage} />
        のスキルダメージを与えます。カーペットを設置した時、ジェニーの配役によって追加効果が適用されます。<br />
        <br />
        <span className={style.strong}>赤ワイン</span>：レッドカーペットの上の敵を引っ張ります。<br />
        <span className={style.strong}>ブラックティー</span>：レッドカーペットの上の敵を突き飛ばします。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.first_damage.base},
        {title: "再使用ダメージ量", values: Constants.W.second_damage.base}
    ]
}