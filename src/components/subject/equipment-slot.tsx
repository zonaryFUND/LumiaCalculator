import { ArmorTypeID } from "@app/entity/equipment"
import * as React from "react"

type Props = {
    slot: "weapon" | ArmorTypeID 
}

const equipmentSlot: React.FC<Props> = props => {
    return (
        <div>
            <img src="008. One Inch Punch_단영촌천투.png" />
        </div>
    );
};

export default equipmentSlot;