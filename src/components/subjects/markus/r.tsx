import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マーカスが指定した方向にジャンプして斧を振り下ろします。振り下ろした範囲は{Constants.R.tectonic_rift}秒間<span className={style.emphasis}>亀裂</span>
            状態になり、攻撃された敵は<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを受け、
            {Constants.R.defense_down.duration}秒間防御力が{Constants.R.defense_down.effect}%減少し、
            {Constants.R.slow.duration}秒間移動速度が{Constants.R.slow.effect}%減少されてはすぐに元に戻ります。<br />
            <br />
            <span className={style.emphasis}>亀裂</span>範囲でエアボーンやノックバックの影響を受けると<span className={style.emphasis}>ショック</span>ダメージを受けて
            <span className={style.emphasis}>ショック</span>状態になります。この効果は<span className={style.emphasis}>亀裂</span>範囲の中で1回のみ適用されます。<br />
            <br />
            敵を<span className={style.emphasis}>ショック</span>状態にさせた場合、<span className={style.emphasis}>地殻変動</span>のクールダウンが{Constants.R.cooldown_reduction}秒減少します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
