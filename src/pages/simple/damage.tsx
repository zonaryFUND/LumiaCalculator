import * as React from "react";
import SubjectSkills from "@app/features/subject-skills";
import Table from "@app/features/damage/containers/simple/damage-table";
import style from "./damage.module.styl";
import Pane from "components/layout/pane/pane";

import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";

type Props = {
    status: Status
    config: SubjectConfig
    hp: number
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
}

const damages: React.FC = props => {
    const uiType = useResponsiveUIType();

    return (
        <Pane title="ダメージ" className={style.damage}>
            <section className={style.skill}>
                <h3>
                    スキル<span>
                        {
                            uiType == "mobile" ? "タップでツールチップを表示" : "マウスオーバーでツールチップを表示"
                        }
                    </span>
                </h3>
                <SubjectSkills />
            </section>
            <Table />
        </Pane>
    )
};

export default damages;
