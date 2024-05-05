import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
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
    additionalInfo: <>ショック状態の対象者から視界が提供されます。すでにショック状態の対象は条件を満たしてもショック状態になりません。</>,
    parameters: [
        {title: "ショックダメージ量", values: Constants.T.damage.base},
        {title: "突進ダメージ", values: Constants.T.additional_damage.base}
    ]
}
