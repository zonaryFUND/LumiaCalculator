import { PerpetualOuterBuff } from "app-types/subject-dynamic/config/perpetual-outer-buff";
import * as React from "react";

type Props = {
    buffs: PerpetualOuterBuff[]
}

const perpetualBuffs: React.FC<Props> = props => {
    return (
        <div>
            <ul>
                {
                    props.buffs.map(buff => {
                        return <></>
                    })
                }
            </ul>
        </div>
    );
}

export default perpetualBuffs;
