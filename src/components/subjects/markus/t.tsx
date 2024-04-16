import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>

            マーカスが指定した方向にジャンプして斧を振り下ろします。振り下ろした範囲は{Constants.R.tectonic_rift}秒間<span className={style.emphasis}>亀裂</span>
            状態になり、攻撃された敵は<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを受け、{Constants.R.slow.duration}
            秒間移動速度が{Constants.R.slow.effect}％減少された後、すぐに元に戻ります。<br />
            <br />
            <span className={style.emphasis}>亀裂</span>範囲でエアボーンやノックバックの影響を受けると<span className={style.emphasis}>ショック</span>ダメージを受けて
            <span className={style.emphasis}>ショック</span>状態になります。この効果は<span className={style.emphasis}>亀裂</span>範囲の中で1回のみ適用されます。<br />
            <br />
            敵を<span className={style.emphasis}>ショック</span>状態にさせた場合、<span className={style.emphasis}>地殻変動</span>のクールダウンが{Constants.R.cooldown_reduction}秒減少します。

            <span className={style.emphasis}>ショック</span>：マーカスが突き飛ばした敵が壁に衝突すると、敵に<Damage skill="T" constants={Constants.T.damage} {...props} />
            スキルダメージを与え、敵は{Constants.T.stun}秒間気絶して{Constants.T.slow.duration}秒間移動速度が{Constants.T.slow.effect}％減少されます。壁に衝突した敵は
            {Constants.T.shock}秒間<span className={style.emphasis}>ショック</span>状態になります。<br />
            マーカスが突き飛ばした敵が他の野生動物や実験体に衝突すると、衝突したすべての対象に同じ効果を与えて突き飛ばします。<br />
            <br />
            <span className={style.emphasis}>一擊</span>：{Constants.T.shock_range}m以内にいる<span className={style.emphasis}>ショック</span>
            状態の敵を基本攻撃対象に指定すると、マーカスが阻止不可状態になって突進し、<Damage skill="T" constants={Constants.T.additional_damage} {...props} />
            の追加スキルダメージを与えます。この時、マーカスが付与したすべての<span className={style.emphasis}>ショック</span>状態が消えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ショックダメージ量", values: Constants.T.damage.base},
        {title: "突進ダメージ", values: Constants.T.additional_damage.base}
    ]
}
