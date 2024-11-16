import * as React from "react";
import { Sword, TShirt, BaseballCap, Hand, Sneaker } from "@phosphor-icons/react";
import style from "./blank.module.styl";
import base from "./item.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "app-types/equipment/armor";

type Props = {
    slot: "Weapon" | ArmorTypeID
}

const blank: React.FC<Props> = props => {
    const icon = React.useMemo(() => {
        switch (props.slot) {
            case "Weapon":
                return <Sword size="2rem" />;
            case "Chest":
                return <TShirt size="2rem" />;
            case "Head":
                return <BaseballCap size="2rem" />;
            case "Arm":
                return <Hand size="2rem" />;
            case "Leg":
                return <Sneaker size="2rem" />;
        }
        
    }, [props.slot]);

    return (
        <div className={styles(style.blank, base.base)}>
            {icon}
        </div>
    );
};

export default blank