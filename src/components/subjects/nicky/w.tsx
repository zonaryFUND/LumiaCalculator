import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>ガード</span>：マウスカーソルの方へガードを構え、{Constants.W.duration}秒間受けるすべてのダメージが
            {Constants.W.damage_reduction[props.skillLevel]}%減少し、すべてのデバフ効果と妨害効果を無効化します。ダメージ効果または移動不可効果のガードに成功した場合、
            {Constants.W.e2_duration}秒間<span className={style.emphasis}>怒りのパンチ！</span>が使用できるようになり、持続時間が終わると
            <span className={style.emphasis}>カウンター</span>を発動します。<br />
            <br />
            <span className={style.emphasis}>カウンター</span>：受けるダメージ減少状態を維持したまま突進し、周りの敵に
            <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、{Constants.W.slow.duration}
            秒間移動速度を{Constants.W.slow.effect}%減少させます。移動速度は持続時間にわたって回復します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>移動不可状態ではカウンターが発動しません。</>,
    parameters: [
        {title: "受けるダメージ減少(%)", values: Constants.W.damage_reduction},
        {title: "カウンターダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
