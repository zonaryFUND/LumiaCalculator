import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>死の商人</span>：ヘイズは装填をする代わりに、{Constants.T.swap_time}秒間ウェポンケースからフル装填の新しい突撃小銃を取り出します。取り出す間、基本攻撃はできません。以降、初めての基本攻撃は
            <Value skill="T" ratio={Constants.T.damage} />の追加スキルダメージを与えます。この攻撃が実験体に的中した場合、移動速度が{Constants.T.movement_speed.duration}秒間
            {Constants.T.movement_speed.effect[props.skillLevel]}%増加します。<br />
            <span className={style.emphasis}>死の商人</span>効果は突撃小銃状態でのみ適用されます。<br />
            <br />
            <span className={style.emphasis}>ウェポンケース</span>: ヘイズは各スキルごとに色んな種類の武器を活用し、使い切るとウェポン ケースから新しい突撃小銃を取り出し、<span className={style.emphasis}>死の商人</span>効果が適用されます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>ヘイズは手動装填と非戦闘自動装填ができません。武器を切り替えても弾の数は維持されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "移動速度増加量(%)", values: Constants.T.movement_speed.effect, percent: true}
    ]
}
