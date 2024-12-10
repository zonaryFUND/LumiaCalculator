import * as React from "react";
import SubjectSkills from "components/subject/skills";
import Table from "components/damage/simple/damage-table";
import style from "./damage.module.styl";
import TabUnit from "components/common/tab/tab-unit";

import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";

type Props = {
    status: Status
    config: SubjectConfig
    hp: number
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

const damages: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();

    return (
        <TabUnit title="ダメージ" className={style.damage}>
            <section className={style.skill}>
                <h3>
                    スキル<span>
                        {
                            uiType == "mobile" ? "タップでツールチップを表示" : "マウスオーバーでツールチップを表示"
                        }
                    </span>
                </h3>
                <SubjectSkills config={props.config} setSkillLevels={props.setSkillLevels} />
            </section>
            <Table status={props.status} config={props.config} hp={props.hp} />
        </TabUnit>
    )
};

export default damages;
