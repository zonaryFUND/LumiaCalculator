import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    const defense = (() => {
        const base = Constants.W.defense.base[props.config.skillLevels.W];
        if (props.showEquation) {
            return <><span className={style.emphasis}>{base}</span><span className={style.defense}>(+防御力{Constants.W.defense.defense}あたり1)</span></>
        } else {
            return <span className={style.emphasis}>{props.status.defense.dividedBy(Constants.W.defense.defense).floor().add(base).toString()}</span>
        }
    })();

    return (
        <>
            ヒョヌが虚勢を発動すると、<span className={style.emphasis}>ドッグファイト</span>を活性化させ、{Constants.W.duration}
            秒間防御力が{defense}増加します。継続時間中に敵の基本攻撃を受けるたびに<span className={style.emphasis}>ドッグファイト</span>スタックを1獲得します。<br />
            <br />
            虚勢発動後、{Constants.W.cc_immune}秒間ヒョヌは移動妨害効果を無視します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo:<>行動妨害効果：エアボーン、スロー、恐怖、魅惑、束縛、気絶、ノックバック、制圧、踊 り、挑発、硬直、停止、氷結、眠気、睡眠</>,
    parameters: [
        {title: "防御力", values: Constants.W.defense.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
