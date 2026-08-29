import * as React from "react";
import SkillIcon from "../components/skill-icon.view";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { useLatest } from "react-use";

// ツールチップ（TooltipPresenter）は現在無効化されており、対戦モードの左右判別
// （subjectSide）は使用されていない。TooltipPresenter復旧時に別途設計し直す
// （features/README.mdのTODOメモ参照）。
const Skill: React.FC<{code?: number}> = ({code}) => {
    const uiType = useResponsiveUIType();
    const tooltipContext = React.useContext(TooltipContext);

    const latest = useLatest({ code });
    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(event => {
        if (uiType != "mobile" || latest.current.code == undefined) {
            // モバイル版UIかつスキルがブランクでない場合のみクリックによってツールチップが表示される
            return
        }

        tooltipContext?.openModalSkill.current({
            skillCode: latest.current.code,
            subjectSide: undefined
        });
    }, [])

    return (
        <SkillIcon
            skillCode={code}
            onClick={onClick}
        />
    )
}

export default Skill;