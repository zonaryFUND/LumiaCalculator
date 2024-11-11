import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import color from "./color.module.styl";
import { values } from "./q";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが筆を振り回して当たった敵に<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与え、筆の頭に当たった敵に<span className={color.red}>赤色</span>
        の絵の具を塗ります。赤色の絵の具がついたら{Constants.Q.r.slow.duration}秒間敵の移動速度を
        {Constants.Q.r.slow.effect}%減少させます。
    </>
);

export default q;

export { values };