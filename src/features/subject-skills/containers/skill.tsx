import * as React from "react";
import SkillIcon from "../components/skill-icon.view";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { useLatest } from "react-use";
import { useSubjectStateStore } from "@app/features/subject-config/store";

const Skill: React.FC<{code?: number}> = ({code}) => {
    const uiType = useResponsiveUIType();
    const side = useSubjectStateStore(s => s.subjectSide);
    const tooltipContext = React.useContext(TooltipContext);

    const latest = useLatest({ code, side });
    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(event => {
        if (uiType != "mobile" || latest.current.code == undefined) {
            // モバイル版UIかつスキルがブランクでない場合のみクリックによってツールチップが表示される
            return
        }

        tooltipContext?.openModalSkill.current({
            skillCode: latest.current.code,
            subjectSide: latest.current.side
        });
    }, [])

    return (
        <SkillIcon
            skillCode={code}
            subjectSide={side}
            onClick={onClick}
        />
    )
}

export default Skill;