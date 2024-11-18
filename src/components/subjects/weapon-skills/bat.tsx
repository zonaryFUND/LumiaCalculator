import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const bat: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            前方の全ての敵に<Value skill="D" ratio={Constants.bat.damage} />
            のスキルダメージを与え、{Constants.bat.knockback}mノックバックさせます。ノックバックされた敵が壁にぶつかった場合、
            {Constants.bat.stun}秒間気絶します。
        </>
    );
}

export default bat;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.bat.damage.base},
        {title: "合計スキル増幅係数", values: Constants.bat.damage.amp, percent: true},
    ]
}