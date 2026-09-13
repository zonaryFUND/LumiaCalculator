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
    const clickCountRef = React.useRef(0);

    const latest = useLatest({ code, side });
    // 装備アイテム（equipment-icon.view.tsx）と挙動を揃えるため、モバイル版はダブルタップでツールチップを
    // 表示する。スキル自体にはシングルタップに割り当てられた操作がないため、1回目のタップは単に何もしない
    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(event => {
        if (uiType != "mobile" || latest.current.code == undefined) {
            return
        }

        clickCountRef.current++;
        if (clickCountRef.current < 2) {
            setTimeout(() => {
                if (clickCountRef.current >= 2) {
                    tooltipContext?.openModalSkill.current({
                        skillCode: latest.current.code!,
                        subjectSide: latest.current.side
                    });
                }
                clickCountRef.current = 0;
            }, 200);
        }
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
