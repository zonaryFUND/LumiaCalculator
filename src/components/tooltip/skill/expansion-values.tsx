import * as React from "react";
import style from "./expansion-values.module.styl";
import { FormattedMessage } from "react-intl";
import { SkillExpansionTooltipProps } from "../../../ingame-params/skill-tooltip-props";

const values: React.FC<SkillExpansionTooltipProps & {skillLevel: number}> = props => (
    <ul className={style.values}>
        {
            props.enumeratedValues.map(parameter => {
                const values = parameter.values
                    .map(v => `${v}${parameter.percent ? "%" : ""}`)
                    .map((v, i) => {
                        const content = i == props.skillLevel ?
                        <span>{v}</span> :
                        v

                        const separator = i < parameter.values.length - 1 ? " / " : "";
                        return <React.Fragment key={i}>{content}{separator}</React.Fragment>
                    })

                return (
                    <li key={parameter.labelIntlID}>
                        <h3><FormattedMessage id={parameter.labelIntlID} /></h3>
                        <p>[{values}]</p>
                    </li>
                )
            })
        }
    </ul>
);

export default values;