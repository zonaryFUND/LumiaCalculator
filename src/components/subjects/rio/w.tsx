import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            離れが的中した場合、莉央のスキルクールダウンが{Constants.W.cooldown_reduction}秒減少します。<br />
            <br />
            短弓：指定した方向へ扇型に矢を発射して<Value skill="W" ratio={Constants.W.hankyu_damage} />のスキルダメージを与え、ダメージを受けた対象の位置に移動速度を
            {Constants.W.hankyu_slow.effect}%減少させる風を{Constants.W.hankyu_slow.duration}秒間生成します。一つの対象に連続で的中した矢は{Constants.W.multiple_hit}%のダメージを与えます。<br />
            <br />
            和弓：指定した方向へ強力な1本の矢を発射して<Value skill="W" ratio={Constants.W.daikyu_damage} />のスキルダメージを与え、その後ろの敵には
            <Value skill="W" ratio={Constants.W.daikyu_behind_damage} />のスキルダメージを与えます。ダメージを受けた対象は
            {Constants.W.daikyu_slow.duration}秒間移動速度が{Constants.W.daikyu_slow.effect}%減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>和弓状態で使用する<span className={style.emphasis}>離れ</span>は基本攻撃及びスキル攻撃判定とみなされ、初めて敵に的中した時に効果が発動します。</>,
    parameters: [
        {title: "短弓ダメージ量", values: Constants.W.hankyu_damage.base},
        {title: "和弓ダメージ量", values: Constants.W.daikyu_damage.base},
        {title: "和弓追加ダメージ量", values: Constants.W.daikyu_behind_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
