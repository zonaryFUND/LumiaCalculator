import * as React from "react";
import { ArmorTypeID } from "@app/entity/equipment";
import { Sword, TShirt, BaseballCap, Hand, Sneaker } from "@phosphor-icons/react";
import style from "./blank.module.styl";
import base from "./item.module.styl";
import { styles } from "@app/util/style";

type Props = {
    slot: "weapon" | ArmorTypeID
}

const blank: React.FC<Props> = props => {
    const icon = React.useMemo(() => {
        switch (props.slot) {
            case "weapon":
                return <Sword size="2rem" />;
            case "chest":
                return <TShirt size="2rem" />;
            case "head":
                return <BaseballCap size="2rem" />;
            case "arm":
                return <Hand size="2rem" />;
            case "leg":
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