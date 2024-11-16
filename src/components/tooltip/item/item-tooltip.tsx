import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import Options from "./options";
import Skill from "./skill";
import baseStyle from "../tooltip.module.styl";
import style from "./item-tooltip.module.styl";
import { SubjectSkillProps } from "components/subjects/props";
import { tierName } from "app-types/equipment/tier";
import { ValueContext } from "../value-context";
import { FormattedMessage } from "react-intl";
import { EquipmentStatusDictionary } from "app-types/equipment";

type Props = SubjectSkillProps & {
    itemID: EquipmentID
}

const itemTooltip: React.FC<Props> = props => {
    const status = React.useMemo(() => EquipmentStatusDictionary[props.itemID], [props.itemID]);
    const itemName = props.itemID;

    const src = React.useMemo(() => {
        const itemType = EquipmentStatusDictionary[props.itemID].type;
        const Items = (() => {
            switch (itemType) {
                case "Head":    return Images.head;
                case "Chest":   return Images.chest;
                case "Arm":     return Images.arm;
                case "Leg":     return Images.leg;
                default:        return Images.weapon;
            }
        })()
        /*
        if (props.itemID.endsWith("_crimson") || props.itemID.endsWith("_dawn")) {
            return Items[props.itemID.substring(0, props.itemID.lastIndexOf("_"))];
        } 
            */
          
        return Items[props.itemID];
    }, [props.itemID]);

    const ammo = (() => {
        if (status.ammo == undefined) return null;
        return <p className={style.ammo}><span>装弾数: </span>{`${status.ammo}発`}</p>
    })();

    return (
        <div className={`${baseStyle.base} ${style.tooltip} ${style[status.itemGrade]}`}>
            <header className={style.header}>
                <div>
                    <h1>{itemName}</h1>
                    <p>{status.itemGrade}</p>
                    <p><FormattedMessage id={status.type} /></p>
                </div>
                <img src={src} />
            </header>
            <div className={style.content}>
                <Options {...status} />
                {ammo}
                <ValueContext.Provider value={props}>
                    {status.option ? status.option.map(op => <Skill key={op.id} {...props} id={op.id} values={op.values} />) : null}
                </ValueContext.Provider>
            </div>
        </div>
    )
}

export default itemTooltip;