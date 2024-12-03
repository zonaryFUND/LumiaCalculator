import * as React from "react";
import * as es from "es-toolkit";

import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { SubjectTooltipDictionary } from "@app/ingame-params/subjects/dictionary";
import { WeaponSkillTooltipDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { FormattedMessage, useIntl } from "react-intl";
import Images from "@app/resources/image";
import FormattedText from "components/common/formatted-text";
import CooldownComsumption from "./cooldown-consumption";
import ExpansionValues from "./expansion-values"

import baseStyle from "../tooltip.module.styl";
import style from "./tooltip.module.styl";
import { ExtractAndCalculateValue } from "../extract-tooltip-value";

type Props = {
    code: number
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const tooltip: React.FC<Props> = props => {
    const intl = useIntl();
    const skillInfo = React.useMemo(() => SubjectTooltipDictionary[props.code] ?? WeaponSkillTooltipDictionary[props.code], [props.code]);

    const skillLevel = React.useMemo(() => {
        if (skillInfo.skillKey == "D") {
            return weaponSkillLevel(props.config.weaponMastery);
        } else {    
            return props.config.skillLevels[skillInfo.skillKey];
        }
    }, [skillInfo.skillKey, props.config.skillLevels]);
    const infoTextIntlID = (props.showEquation ? skillInfo.overrideIntlID?.coef : skillInfo.overrideIntlID?.desc) ?? `Skill/Group/${props.showEquation ? "Coef" : "Desc"}/${props.code}`;
    const insertedValues = skillInfo.values({showEquation: props.showEquation, config: props.config, status: props.status});

    const coefficientValues = es.mapValues(insertedValues, value => ExtractAndCalculateValue(value, intl, props.config, props.status, skillLevel));
    const expansion = skillInfo.expansion({skillLevel, config: props.config, status: props.status});
    const expansionValues = (() => {
        if (expansion.tipValues == undefined) return undefined;
        return es.mapValues(expansion.tipValues, value => ExtractAndCalculateValue(value, intl, props.config, props.status, skillLevel));
    })();
    const expansionTooltip = intl.formatMessage({id: `Skill/Group/ExpansionTip/${props.code}`});

    return (
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={Images.skill[props.code]} />
                    <div>
                        <div className={style.name}>
                            <h1><FormattedMessage id={`Skill/Group/Name/${props.code}`} /> （レベル {skillLevel + 1}）</h1>
                            <p>[{skillInfo.skillKey}]</p>
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
    );
}

export default tooltip;