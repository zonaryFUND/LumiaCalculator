import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import Options from "./options";
import Skill from "./skill";
import baseStyle from "../tooltip.module.styl";
import style from "./item-tooltip.module.styl";
import { ValueContext } from "../value-context";
import { FormattedMessage } from "react-intl";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";

type Props = {
    showEquation: boolean
    config: SubjectConfig
    status: Status
    itemID: EquipmentID
}

const itemTooltip: React.FC<Props> = props => {
    const status = React.useMemo(() => EquipmentStatusDictionary[props.itemID], [props.itemID]);

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

    const ammo = (() => {
        if (status.ammo == undefined) return null;
        return <p className={style.ammo}><span>装弾数: </span>{`${status.ammo}発`}</p>
    })();

    return (
        <div className={`${baseStyle.base} ${style.tooltip} ${style[status.itemGrade.toLowerCase()]}`}>
            <header className={style.header}>
                <div>
                    <h1><FormattedMessage id={`Item/Name/${props.itemID}`} /></h1>
                    <p><FormattedMessage id={`ItemGrade/${status.itemGrade}`} /></p>
                    <p>{typeExpression}</p>
                </div>
                <img src={src} />
            </header>
            <div className={style.content}>
                <Options {...status} />
                {ammo}
                <ValueContext.Provider value={props}>
                    {status.skill ? status.skill.map(op => <Skill key={op.skillCode} {...props} {...op} />) : null}
                </ValueContext.Provider>
            </div>
        </div>
    )
}

export default itemTooltip;