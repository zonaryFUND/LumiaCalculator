import * as React from "react";
import Pane from "components/layout/pane/pane";
import style from "./buff-debuff.module.styl";
import SelfBuffs from "@app/features/buff-debuff/containers/self-buffs";
import IncomingBuffs from "@app/features/buff-debuff/containers/incoming-buffs";

const buffDebuffs: React.FC = props => {
    return (
        <Pane title="バフ・デバフ" className={style.buffdebuff}>
            <section>
                <h3>自己バフ</h3>
                <SelfBuffs />
            </section>
            <section>
                <h3>他者からのバフ・デバフ</h3>
                <IncomingBuffs />
            </section>
        </Pane>
    )
};

export default buffDebuffs;
