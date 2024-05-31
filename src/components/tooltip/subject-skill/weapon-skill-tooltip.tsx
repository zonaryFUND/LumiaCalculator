import * as React from "react";
import Name from "dictionary/weapon-skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Values, { ValuesProps } from "components/subjects/values";
import Constant from "components/subjects/weapon-skills/constants.json";
import { equipmentStatus } from "app-types/equipment";
import { skillLevel } from "components/subjects/skill-damage";
import { ValueContext, useValueContext } from "../value-context";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { useIntl } from "react-intl";

function valueOrElement(value: number | number[], index: number): number {
    if (Array.isArray(value)) return value[index];
    return value;
}

const skillsContext = require.context("components/subjects/weapon-skills", true, /(.*)\.tsx$/);
export const SkillsDescription = skillsContext.keys().reduce((skills: any, path) => {
    const pathComponents = path.split("/");
    const weapon = pathComponents[pathComponents.length - 1];
    return {
        ...skills,
        [weapon.split(".")[0]]: skillsContext(path)
    };
}, {}) as any

type Props = {
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const weaponSkillTooltip: React.FC<Props> = props => {
    const weaponType = React.useMemo(() => {
        return equipmentStatus(props.config.equipment.weapon!).type;
    }, [props.config.equipment.weapon]);

    const level = skillLevel("D", props.config);

    const valuesProps: ValuesProps = (() => {
        if (!props.showEquation) return null;
        const values = SkillsDescription[weaponType].values
        return typeof values === "function" ? values(props) : values;
    })();

    const basicAdditionalText = <>
        武器熟練度<span className={baseStyle.emphasis}>5Lv・10Lv・15Lv</span>の時にスキルレベルアップ<br />
        クールダウン固定：このスキルはクールダウン減少の影響を受けません。
    </>

    return (
        <ValueContext.Provider value={props}>
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={Images.skill.weapon[weaponType]} />
                    <div>
                        <div className={style.name}>
                            <h1>{(Name as any)[weaponType].jp} （レベル {level + 1}）</h1>
                            <p>[D]</p>
                        </div>
                        <div className={style.cooldown}>
                            コストなし<br />
                            クールダウン{valueOrElement((Constant as any)[weaponType].cooldown, level)}秒
                        </div>
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[weaponType].default, {skillLevel: level})}
                </p>
            </div>
            {
                valuesProps ? (
                    <div className={style.values}>
                        <Values {...valuesProps} additionalInfo={<>{valuesProps.additionalInfo ? <>{valuesProps.additionalInfo}<br /></> : null}{basicAdditionalText}</>} skillLevel={level} />
                    </div>
                ) : null
            }
        </div>
        </ValueContext.Provider>
    );
};

export default weaponSkillTooltip;