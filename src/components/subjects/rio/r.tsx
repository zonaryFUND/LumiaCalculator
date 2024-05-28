import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>連射 / 正射必中</span>を使用すると皆中のスタックが最大になります。<br />
            <br />
            短弓：莉央が指定した方向へ3本の矢を素早く発射してそれぞれ<Damage skill="R" constants={Constants.R.hankyu_first_damage} {...props} />のスキルダメージを与えて敵を押し出し、連射/正射必中のクールダウンを
            {Constants.R.hankyu_cooldown_reduction}秒減少させます。3本の矢を発射した後、スキルをもう一度使用すると追加で強力な矢を発射して<Damage skill="R" constants={Constants.R.hankyu_second_damage} {...props} />
            のスキルダメージを与え、的中した対象を後ろに{Constants.R.hankyu_knockback}mノックバックさせます。強力な矢によってノックバックされた対象が壁にぶつかる場合、対象は{Constants.R.hankyu_stun}秒間気絶します。<br />
            <br />
            和弓：莉央が集中して矢を発射し、<Damage skill="R" constants={Constants.R.daikyu_damage} {...props} />の範囲スキルダメージを与え、 
            {Constants.R.daikyu_slow.duration}秒間ダメージを受けた対象の移動速度を{Constants.R.daikyu_slow.effect}%減少させます。矢は発射されてから
            {Constants.R.daikyu_acceleration}秒後、速度が{Constants.R.daikyu_enhance.velocity}%、ダメージ量が{Constants.R.daikyu_enhance.damage}%、移動速度減少持続時間が
            {Constants.R.daikyu_enhance.slow_duration}%増加します。矢は対象と衝突したり、範囲の外まで飛ぶと消滅します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    additionalInfo: <>和弓状態で使用する<span className={style.emphasis}>正射必中</span>は実験体にのみ的中します。</>,
    parameters: [
        {title: "短弓ダメージ量", values: Constants.R.hankyu_first_damage.base},
        {title: "短弓最後の矢ダメージ量", values: Constants.R.hankyu_second_damage.base},
        {title: "和弓ダメージ量", values: Constants.R.daikyu_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}
