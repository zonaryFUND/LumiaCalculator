import * as React from "react";
import SkillIcon from "../components/skill-icon.view";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { TooltipSubjectSideContext } from "components/tooltip/subject-side-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { useLatest } from "react-use";

const Skill: React.FC<{code?: number}> = ({code}) => {
    const uiType = useResponsiveUIType();
    const side = React.useContext(TooltipSubjectSideContext);
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
