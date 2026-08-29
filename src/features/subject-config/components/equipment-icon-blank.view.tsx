import * as React from "react";
import { Sword, TShirt, BaseballCap, Hand, Sneaker } from "@phosphor-icons/react";
import style from "./equipment-icon-blank.module.styl";
import base from "./equipment-icon.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "core/equipment/armor";

type Props = {
    slot: "Weapon" | ArmorTypeID
    onClick: () => void
}

const equipmentIconBlank: React.FC<Props> = props => {
    const icon = React.useMemo(() => {
        switch (props.slot) {
            case "Weapon":
                return <Sword size="90%" />;
            case "Chest":
                return <TShirt size="90%" />;
            case "Head":
                return <BaseballCap size="90%" />;
            case "Arm":
                return <Hand size="90%" />;
            case "Leg":
                return <Sneaker size="90%" />;
        }
        
    }, [props.slot]);

    return (
        <div className={styles(style.blank, base.base)} onClick={props.onClick}>
            {icon}
        </div>
    );
};

export default equipmentIconBlank;