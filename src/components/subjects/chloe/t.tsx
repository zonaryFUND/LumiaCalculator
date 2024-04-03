import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        クロエは人形ニナで敵を攻撃させることができます。ニナはクロエが2回以上基本攻撃した対象に突き攻撃で
        <Damage skill="T" constants={Constants.T.damage} {...props} summonedName="ニナ" />
        のスキルダメージを追加で与えます。ニナは体力が0になると、消滅状態になってしばらく後に復活します。<br />
        <br />
        <span className={style.enhance}>操縦</span>：<span className={style.emphasis}>[Alt]+[右クリック]</span>
        でニナをコントロールできます。地点や敵を指定でき、クロエを指定すると他の場所を指定するまでニナはクロエについて行きます。また、クロエとの距離が離れると、クロエの近くにまた瞬間移動します。<br />
        <br />
        <span className={style.enhance}>消滅&復活</span>：消滅したニナは{Constants.T.nina_revive[props.config.skillLevels.T]}
        秒後にクロエ現在体力の{Constants.T.nina_revive_cost}％を消耗し、ニナ最大体力の{Constants.T.nina_revive_hp}％で復活します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "[ニナ]突きダメージ", values: Constants.T.damage.base},
        {title: "[ニナ]復活時間", values: Constants.T.nina_revive},
        {title: "[ニナ]追加攻撃力", values: Constants.T.nina_attack},
        {title: "[ニナ]追加防御力", values: Constants.T.nina_defense},
        {title: "[ニナ]追加生命力", values: Constants.T.nina_maxhp}
    ]
}