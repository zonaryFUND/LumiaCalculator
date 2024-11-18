import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const nunchaku: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            チャージ：双節棍を素早く振り回して風を集め、移動速度が{Constants.nunchaku.movement_speed_penalty}
            %減少します。<br />
            <br />
            使用：指定した方向に飛ばして
            <Value skill="D" ratio={Constants.nunchaku.min_damage} /> ~ <Value skill="D" ratio={Constants.nunchaku.max_damage} />
            のスキルダメージを与えます。最大までチャージした場合には対象を{Constants.nunchaku.stun}秒間気絶させます。
        </>
    );
}

export default nunchaku;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.nunchaku.min_damage.base},
        {title: "最大ダメージ量", values: Constants.nunchaku.max_damage.base},
        {title: "クールダウン", values: Constants.nunchaku.cooldown},
    ]
}