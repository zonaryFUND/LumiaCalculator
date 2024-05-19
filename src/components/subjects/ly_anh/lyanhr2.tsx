import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const lyanhr2: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>「思い通りにはさせないわ！」</span><br />
            <br />
            イアンが悪霊に抵抗し、人間状態に戻ります。侵食がすべて消耗されます。
        </>
    );
}

export default lyanhr2;
