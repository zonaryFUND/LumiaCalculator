import * as React from "react";
import Constants from "./constants.json";
import { ValuesPropsGenerator } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { NinaValue } from "./nina-ratio-strategy";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        クロエは人形ニナで敵を攻撃させることができます。ニナはクロエが2回以上基本攻撃した対象に突き攻撃で
        <NinaValue {...props} {...Constants.T.damage} />
        のスキルダメージを追加で与えます。ニナは体力が0になると、消滅状態になってしばらく後に復活します。<br />
        <br />
        <span className={style.enhance}>操縦</span>：<span className={style.emphasis}>[Alt]+[右クリック]</span>
        でニナをコントロールできます。地点や敵を指定でき、クロエを指定すると他の場所を指定するまでニナはクロエについて行きます。また、クロエとの距離が離れると、クロエの近くにまた瞬間移動します。<br />
        <br />
        <span className={style.enhance}>消滅&復活</span>：消滅したニナは{Constants.T.nina_revive[props.skillLevel]}
        秒後にクロエ現在体力の{Constants.T.nina_revive_cost}%を消耗し、ニナ最大体力の{Constants.T.nina_revive_hp}%で復活します。
    </>
)

export default t;

const values: ValuesPropsGenerator = props => {
    const ratio = props.config.level * Constants.T.per_level_chloe_status_ratio + Constants.T.base_chloe_status_ratio;
    
    return {
        additionalInfo: <>
            ニナはパッシブレベルが上がるたびに追加能力値を獲得し、クロエの移動速度に比例して二 ナの移動速度が増加します。クロエの攻撃力の{ratio}
            %、防御力の{ratio}%、体力の{ratio}%、致命打確率の{ratio}%、スキル増幅の{ratio}
            %、防御貫通の{ratio}%がニナに追加で適用されます。(クロエのレベルが1増加するたびに{Constants.T.per_level_chloe_status_ratio}%ずつ増加)
        </>,
        parameters: [
            {title: "[ニナ]突きダメージ", values: Constants.T.damage.base},
            {title: "[ニナ]復活時間", values: Constants.T.nina_revive},
            {title: "[ニナ]追加攻撃力", values: Constants.T.nina_attack},
            {title: "[ニナ]追加防御力", values: Constants.T.nina_defense},
            {title: "[ニナ]追加生命力", values: Constants.T.nina_maxhp}
        ]
    }
}

export { values };