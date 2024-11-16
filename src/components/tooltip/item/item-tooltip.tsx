import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import { equipmentStatus, name } from "app-types/equipment";
import Options from "./options";
import Skill from "./skill";
import baseStyle from "../tooltip.module.styl";
import style from "./item-tooltip.module.styl";
import { SubjectSkillProps } from "components/subjects/props";
import { tierName } from "app-types/equipment/tier";
import { ValueContext } from "../value-context";
import { FormattedMessage } from "react-intl";

type Props = SubjectSkillProps & {
    itemID: EquipmentID
}

const itemTooltip: React.FC<Props> = props => {
    const status = equipmentStatus(props.itemID);
    const itemName = name(props.itemID, "jp");

    const src = React.useMemo(() => {
        const itemType = equipmentStatus(props.itemID).type;
        const Items = (() => {
            switch (itemType) {
                case "head":    return Images.head;
                case "chest":   return Images.chest;
                case "arm":     return Images.arm;
                case "leg":     return Images.leg;
                default:        return Images.weapon;
            }
        })()
        if (props.itemID.endsWith("_crimson") || props.itemID.endsWith("_dawn")) {
            return Items[props.itemID.substring(0, props.itemID.lastIndexOf("_"))];
        } 
          
        return Items[props.itemID];
    }, [props.itemID]);

    const ammo = (() => {
        if (status.ammo == undefined) return null;
        return <p className={style.ammo}><span>装弾数: </span>{`${status.ammo}発`}</p>
    })();

    return (
        <div className={`${baseStyle.base} ${style.tooltip} ${style[status.tier]}`}>
            <header className={style.header}>
                <div>
                    <h1>{itemName}</h1>
                    <p>{tierName(status.tier, "jp")}</p>
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