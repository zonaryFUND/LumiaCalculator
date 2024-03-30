import * as React from "react";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

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
