import * as React from "react";
import Pane from "components/layout/pane/pane";
import style from "./buff-debuff.module.styl";
import SelfBuffs from "@app/features/buff-debuff/containers/self-buffs";
import AutoSelfBuffs from "@app/features/buff-debuff/containers/auto-self-buffs";
import IncomingBuffs from "@app/features/buff-debuff/containers/incoming-buffs";

const buffDebuffs: React.FC = props => {
    return (
        <Pane title="バフ・デバフ" className={style.buffdebuff}>
            <section>
                <p>バフ・デバフ機能は現在仮実装です。<br />特性・戦術スキルによるバフ・デバフは作成中。<br />UIは未調整です。</p>
                <h3>自己バフ</h3>
                <SelfBuffs />
                <h3>自己バフ（自動発動）</h3>
                <AutoSelfBuffs />
            </section>
            <section>
                <h3>他者からのバフ・デバフ</h3>
                <IncomingBuffs />
            </section>
        </Pane>
    )
};

export default buffDebuffs;
