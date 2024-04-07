import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const healMax = {
    base: Constants.RE.heal.base.map(v => v * Constants.RE.heal_max_multiplier),
    amp: Constants.RE.heal.amp * Constants.RE.heal_max_multiplier
}

const r: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.strong}>オデッセイ</span>：本が中心部に集まる時に範囲内の敵に<Damage skill="R" constants={Constants.RQ.damage} {...props} />
        のスキルダメージを与え、{Constants.RQ.bookmark_duration}秒間栞を残します。<br />
        栞が残った対象に新しい栞を残すと<Damage skill="R" constants={Constants.RQ.bookmark_damage} {...props} />
        のスキルダメージ与えて{Constants.RQ.stun}秒間気絶させます。<br />
        本の衝突地点にいる敵には{Constants.RQ.center_multiplier}％増加したダメージを与えて
        {Constants.RQ.slow.duration}秒間移動速度を{Constants.RQ.slow.effect[props.config.skillLevels.R]}％減少させます。<br />
        <span className={style.strong}>青い鳥</span>：味方やスアに<Damage skill="R" constants={Constants.RW.shield} {...props} />のスキルダメージを吸収し、妨害効果免疫状態にするシールドを付けます。<br />
        敵に使用すると<Damage skill="R" constants={Constants.RW.damage} {...props} />のダメージを与えて
        {Constants.RW.blind_duration}秒間対象を失明させます。<br />
        <span className={style.strong}>ドン・キホーテ</span>：最初に的中された敵に<Damage skill="R" constants={Constants.RE.damage} {...props} />のスキルダメージを与えて
        {Constants.RE.slow.duration}秒間移動速度を{Constants.RE.slow.effect}%減少させます。<br />
        栞が残った状態の敵には<Damage skill="R" constants={Constants.RE.bookmark_damage} {...props} />
        のスキルダメージを与えて空中に浮かせます。スアはドン・キホーテを的中させた場合、失った体力に比例して
        <Damage skill="R" constants={Constants.RE.heal} {...props} /> ~ <Damage skill="R" constants={healMax} {...props} />の体力を回復します。<br />
        スアが武器を変更する間には妨害効果免疫状態になります。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "記憶力ーオデッセイダメージ量", values: Constants.RQ.damage.base},
        {title: "記憶力ー青い鳥ダメージ量", values: Constants.RW.damage.base},
        {title: "記憶力ードン・キホーテダメージ量", values: Constants.RE.damage.base},
        {title: "記憶力ードン・キホーテ強化ダメージ量", values: Constants.RE.bookmark_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}