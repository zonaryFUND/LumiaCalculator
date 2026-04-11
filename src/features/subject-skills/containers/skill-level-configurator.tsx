import * as React from "react";
import { SubjectDependentSkillKey } from "app-types/skill";
import PullDown from "components/common/pull-down";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import style from "./skill-level-configurator.module.styl";

type Props = {
    skill: SubjectDependentSkillKey
    max?: number
}

const SkillLevelConfigurator: React.FC<Props> = props => {
    const skillLevel = useSubjectStateStore(s => s.config.skillLevels[props.skill]);
    const setSkillLevels = useSubjectStateStore(s => s.setSkillLevels);

    // 実験体固有の設定がない場合、通常スキルの最大レベルは5、R/パッシブスキルの最大レベルは3
    const max = props.max ?? (props.skill == "R" || props.skill == "T" ? 3 : 5);

    const onChange = React.useCallback((to: number) => {
        setSkillLevels(prev => ({...prev, [props.skill]: to - 1}));
    }, [])

    return (
        <div className={style.configurator}>
            <PullDown value={{max, current: skillLevel + 1, set: onChange}} layout="skill" />
        </div>
    )
}

export default SkillLevelConfigurator;