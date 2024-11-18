import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.enhance}>ニーストライク</span>：ヤンが膝で範囲内の敵に<Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与え、
        {Constants.Q.slow.duration}秒間、移動速度を{Constants.Q.slow.effect}%減少させます。再使用すると、リッピング・ニーストライクを使用できます。<br />
        <span className={style.emphasis}>強化効果</span>：ダメージを受けた敵に{Constants.Q.defense_reduction.duration}秒間、防御力を{Constants.Q.defense_reduction.effect}%減少させます。<br />
        <br />
        <span className={style.enhance}>リッピング・ニーストライク</span>：ヤンが膝打ちで敵に<Value skill="Q" ratio={Constants.Q.Q2_damage} />のスキルダメージを与え、
        {Constants.Q.airborne}秒間、敵を空中に浮かせます。<br />
        <span className={style.emphasis}>強化効果</span>：リッピング・ニーストライクで敵にダメージを与えると、<span className={style.emphasis}>ウィービング</span>のクールダウンを初期化させます。
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        強化ニーストライクを使用すると、次のリッピング・ニーストライクに強化効果を適用します。<br />
        このスキルは壁を越えられません。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "強化ダメージ量", values: Constants.Q.Q2_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}