import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ビアンカが呪文詠唱をしながら自分の周りに魔法陣を生成します。呪文詠唱が終わると地面に魔法陣を固定させ、範囲内の敵に<Value skill="R" ratio={Constants.R.first_damage} />
        のスキルダメージを与えて{Constants.R.slow.duration}秒間移動速度を{Constants.R.slow.effect}%減少させます。ビアンカは魔法陣の上にいると、ダメージ吸血が{Constants.R.omnisyphon_amp[props.skillLevel]}%増加します。<br />
        魔法陣の持続時間が終わると、範囲内の敵に失った体力に比例して
        <Value skill="R" ratio={Constants.R.min_damage} /> ~ <Value skill="R" ratio={Constants.R.max_damage} />のスキルダメージを与え、
        <Value skill="R" ratio={Constants.R.heal} />だけ体力を回復します。複数の敵に的中した場合、追加で的中した敵数あたりの回復量が{Constants.R.multiple_hit_heal_amp}%増加します。
    </>
)

export default r;

export const values: ValuesProps = {
    additionalInfo: <>真祖の君臨使用中に循環が使用できます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.first_damage.base},
        {title: "追加ダメージ量", values: Constants.R.min_damage.base},
        {title: "最大追加ダメージ量", values: Constants.R.max_damage.base},
        {title: "最大回復量", values: Constants.R.heal.base},
        {title: "ダメージ吸血量", values: Constants.R.omnisyphon_amp, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}