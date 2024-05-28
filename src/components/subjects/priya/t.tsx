import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            プリヤは頭の防具を装備したり解除することができません。<span className={style.emphasis}>自然の呼びかけ</span>レベルが上がると頭の防具が強化されます。<br />
            <br />
            プリヤは<span className={style.emphasis}>咲き誇るメロディー</span>と<span className={style.emphasis}>ポルタメント</span>でサラスバティの花を生成し、
            {Constants.T.bloom}秒後にサラスバ ティの花は満開になります。満開のサラスバティの花に<span className={style.emphasis}>咲き誇るメロディー</span>や
            <span className={style.emphasis}>ポルタメント</span>を的中させると効果が発動し、サラスバティの花が消えます。<br />
            <br />
            サラスバティの花は{Constants.T.flower_duration}秒間続き、プリヤと一定距離以上離れるとすぐに消えます。茂みに生成したサラスバティの花はすぐ満開になります。
        </>
    );
}

export default t;