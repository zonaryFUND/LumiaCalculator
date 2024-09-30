import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ガーネットが指定した方向に鎖を投げて、初めて的中した敵実験体を{Constants.R.bind}秒間束縛し、<Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えて{Constants.R.duration}秒間継続する刻印を付けます。持続時間の間、対象の体力が{Constants.R.reuse_threshold}%以下になると、スキルを再使用することができます。<br />
            <br />
            再使用：刻印が付けられた対象は鎖で引き寄せられ、ガーネットと一緒にアイアンメイデンの中に閉じ込められて倒されます。ガーネットはアイアンメイデンから出た後、{Constants.R.movement_speed.duration}秒間移動速度が{Constants.R.movement_speed.effect}%増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}
