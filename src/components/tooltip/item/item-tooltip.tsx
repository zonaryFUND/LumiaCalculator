import * as React from "react";
import { EquipmentID } from "core/equipment/id";
import Images from "@app/resources/image";
import Options from "./options";
import Skill from "./skill";
import baseStyle from "../tooltip.module.styl";
import style from "./item-tooltip.module.styl";
import { ValueContext } from "../value-context";
import { FormattedMessage } from "react-intl";
import { DavidChestArmorUpgradeDictionary, EquipmentBaseStatus, EquipmentStatusDictionary } from "core/equipment";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import Decimal from "decimal.js";

type Props = {
    showEquation: boolean
    config: SubjectConfig
    isDavid: boolean
    status: Status
    itemID: EquipmentID
}

const itemTooltip: React.FC<Props> = props => {
    const { status, isDavid } = React.useMemo(() => {
        const rawStatus = EquipmentStatusDictionary[props.itemID];
        const davidUpgrade = props.isDavid ? DavidChestArmorUpgradeDictionary[props.itemID] : undefined;
        if (davidUpgrade != undefined) {
            const status = Object.entries(davidUpgrade).reduce((prev, [statusKey, value]) => {
                return {
                    ...prev,
                    [statusKey]: (prev[statusKey as keyof EquipmentBaseStatus] ?? new Decimal(0)).add(value)
                }
            }, rawStatus);
            return { status, isDavid: true };
        } else {
            return { status: rawStatus, isDavid: false };
        }
    }, [props.isDavid, props.itemID]);

    // 依存配列にstatus（上のuseMemoの結果）を含めていないが、David化は胸防具のみに存在する仕様であり
    // 武器のstatus.type（下記default節でのみ参照）がisDavidによって変化することはないため問題ない
    const [src, typeExpression] = React.useMemo(() => {
        const itemType = EquipmentStatusDictionary[props.itemID].type;
        const [Items, typeExpression] = (() => {
            switch (itemType) {
                case "Head":    return [Images.head, <FormattedMessage id="ArmorType/Head" />];
                case "Chest":   return [Images.chest, <FormattedMessage id="ArmorType/Chest" />];
                case "Arm":     return [Images.arm, <FormattedMessage id="ArmorType/Arm" />];
                case "Leg":     return [Images.leg, <FormattedMessage id="ArmorType/Leg" />];
                default:        return [Images.weapon, <FormattedMessage id={`MasteryType/${status.type}`} />];
            }
        })()

        return [Items[props.itemID], typeExpression];
    }, [props.itemID]);

    return (
        <div className={`${baseStyle.base} ${style.tooltip} ${style[status.itemGrade.toLowerCase()]}`}>
            <header className={style.header}>
                <div>
                    <h1><FormattedMessage id={`Item/Name/${props.itemID}${isDavid ? "_D" : ""}`} /></h1>
                    <p><FormattedMessage id={`ItemGrade/${status.itemGrade}`} /></p>
                    <p>{typeExpression}</p>
                </div>
                <img src={src} />
            </header>
            <div className={style.content}>
                <Options {...status} />
                <ValueContext.Provider value={props}>
                    {/* config/status/showEquationはpropsではなくValueContext経由でSkillへ渡している */}
                    {status.skill ? status.skill.map(op => <Skill key={op.skillCode} {...op} />) : null}
                </ValueContext.Provider>
            </div>
        </div>
    )
}

export default itemTooltip;