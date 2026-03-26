import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import * as React from "react";
import EquipmentSlot from "../containers/equipment-slot";
import style from "./equipments.module.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    davidUpgradable?: boolean
    isChestDavid?: boolean
    onChangeDavidCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const EquipmentsLayout: React.FC<Props> = props => {
    const uiType = useResponsiveUIType();

    return (
        <div>
            <h3>
                <FormattedMessage id="app.equipment" />
                <span>
                    <FormattedMessage id={uiType == "mobile" ? "app.guide.tooltip.double-tap": "app.guide.tooltip.mouse-over"} />
                </span>
            </h3>
            <div className={style.equipment}>
                <EquipmentSlot slot="Weapon" />
                <EquipmentSlot slot="Chest" />
                <EquipmentSlot slot="Head" />
                <EquipmentSlot slot="Arm" />
                <EquipmentSlot slot="Leg" />
                <div />
                <div className={style.david}>
                {
                    props.davidUpgradable ? 
                    <label><input type="checkbox" checked={props.isChestDavid} onChange={props.onChangeDavidCheckBox} />David</label> : 
                    null
                }
                </div>
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default EquipmentsLayout;