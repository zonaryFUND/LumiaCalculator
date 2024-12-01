import * as React from "react";
import { Tooltip } from "react-tooltip";
import SkillTooltip from "./tooltip";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import style from "../tooltip.module.styl"

type Props = {
    showEquation: boolean
    config: SubjectConfig | [SubjectConfig, SubjectConfig]
    status: Status | [Status, Status]
}

export const SkillTooltipID = "skill";

const tooltipPresenter: React.FC<Props> = props => (
    <Tooltip 
        id={SkillTooltipID}
        className={style.padding}
        style={{zIndex: 1000}}
        render={({ content, activeAnchor }) => {
            if (!content) return null;
            const side = activeAnchor?.getAttribute('data-tooltip-subject-side');
            const config = Array.isArray(props.config) ? props.config[side == "left" ? 0 : 1] : props.config;
            const status = Array.isArray(props.status) ? props.status[side == "left" ? 0 : 1] : props.status;

            return (
                <SkillTooltip
                    code={+content} 
                    showEquation={props.showEquation}
                    config={config}
                    status={status}
                />
            );
        }}
    />
)

export default tooltipPresenter;