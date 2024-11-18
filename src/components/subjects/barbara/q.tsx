import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps, ValuesPropsGenerator } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import style from "components/tooltip/tooltip.module.styl";

const dict = {
    summonedAttack: {
        format: "セントリーガンの攻撃力の{ratio}%"
    }
}

const q: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラが指定した位置に体力<Value skill="Q" ratio={Constants.Q.hp} overrideExpression={{level: {format: "バーバラのレベル"}}} />
        のセントリーガンを設置します。(最大{Constants.Q.max_sentry_gun}つ)<br />
        セントリーガンは{Constants.Q.duration}秒間維持されます。<br />
        <br />
        バーバラの<span className={style.emphasis}>イオンレーザー</span>や<span className={style.emphasis}>磁力手榴弾</span>
        が敵に的中したり、セントリーガンが{Constants.Q.railgun_count}回目の基本攻撃をするたびにレールガンを発射します。レールガンは最大
        {Constants.Q.railgun_charge}回までチャージできます。<br />
        <br />
        セントリーガンが敵にダメージを与えるたびに<span className={style.emphasis}>イオンレーザー</span>のクールダウンが{Constants.Q.w_cooldown_reduction}%減少します。
    </>
)

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        セントリーガンの基本攻撃とレールガンはスキルダメージの判定が適用され、レールガンの場合、1つのスキルとしての判定が適用されます。<br />
        BT-Mk2 セントリーガンの能力値<br />
        基本攻擊：<Value skill="Q" ratio={Constants.Q.damage} /><br />
        レールガン：<Value skill="Q" ratio={Constants.Q.railgun_damage} /><br />
        防御力<span className={style.emphasis}>80</span>
    </>,
    parameters: [
        {title: "セントリーガン基本攻撃ダメージ量", values: Constants.Q.damage.base},
        {title: "セントリーガンレールガンダメージ量", values: Constants.Q.railgun_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}