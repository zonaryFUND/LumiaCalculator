import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import color from "./color.styl";
import { values } from "./q";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが筆を振り回して当たった敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与え、筆の頭に当たった敵に<span className={color.red}>赤色</span>
        の絵の具を塗ります。赤色の絵の具がついたら{Constants.Q.r.slow.duration}秒間敵の移動速度を
        {Constants.Q.r.slow.effect}％減少させます。
    </>
);

export default q;

export { values };