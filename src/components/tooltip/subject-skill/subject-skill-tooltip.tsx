import * as React from "react";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import ExpansionValues from "components/tooltip/subject-skill/expansion-values";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { ValueContext } from "../value-context";
import { SkillCode, SubjectTooltipDictionary, TooltipInfo } from "components/subjects/dictionary";
import { FormattedMessage, useIntl } from "react-intl";
import FormattedText from "components/common/formatted-text";
import * as es from "es-toolkit";
import { calculateValue } from "app-types/value-ratio/calculation";
import CooldownComsumption from "./cooldown-consumption";

type Props = {
    code: SkillCode
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const subjectSkillTooltip: React.FC<Props> = props => {
    const intl = useIntl();
    const skillInfo = SubjectTooltipDictionary[props.code];
    const skillLevel = props.config.skillLevels[skillInfo.skill];
    const infoTextIntlID = (props.showEquation ? skillInfo.overrideIntlID?.coef : skillInfo.overrideIntlID?.desc) ?? `Skill/Group/${props.showEquation ? "Coef" : "Desc"}/${props.code}`;
    const values = skillInfo.values({skillLevel, showEquation: props.showEquation, config: props.config, status: props.status});
    const coefficientValues = es.mapValues(values, value => {
        if (typeof value == "object") {
            return calculateValue(value, props.status, props.config, skillLevel).static.floor().toString();
        } else {
            return value;
        }
    });
    const expansion = skillInfo.expansion({skillLevel, config: props.config});
    const expansionValues = (() => {
        if (expansion.tipValues == undefined) return undefined;

        return es.mapValues(expansion.tipValues, value => {
            if (typeof value == "object") {
                return calculateValue(value, props.status, props.config, skillLevel).static.floor().toString();
            } else {
                return value;
            }
        })
    })();
    const expansionTooltip = intl.formatMessage({id: `Skill/Group/ExpansionTip/${props.code}`});

    return (
        <ValueContext.Provider value={props}>
            <div className={`${baseStyle.base} ${style.tooltip}`}>
                <div className={style.main}>
                    <header>
                        <img src={Images.skill[props.code]} />
                        <div>
                            <div className={style.name}>
                                <h1><FormattedMessage id={`Skill/Group/Name/${props.code}`} /> （レベル {props.config.skillLevels[skillInfo.skill] + 1}）</h1>
                                <p>[{skillInfo.skill}]</p>
                            </div>
                            <CooldownComsumption {...skillInfo} skillLevel={skillLevel} config={props.config} status={props.status} />
                        </div>
                    </header>
                    <p>
                        <FormattedText 
                            text={intl.formatMessage({id: infoTextIntlID})}
                            values={coefficientValues}
                        />
                    </p>
                </div>
                {
                    props.showEquation && (expansion.tipValues || expansion.enumeratedValues.length) ? (
                        <div className={style.values}>
                            {
                                expansionTooltip.startsWith("Skill/Group/ExpansionTip") ? 
                                null : 
                                <FormattedText text={expansionTooltip} values={expansionValues} />
                            }
                            <ExpansionValues {...expansion} skillLevel={skillLevel} />
                            {skillInfo.calculatorMessage ? <p className={style.calcnote}>計算機作者注：{skillInfo.calculatorMessage}</p> : null}
                        </div>
                    ) : null
                }
            </div>
        </ValueContext.Provider>
    );
};

export default subjectSkillTooltip;