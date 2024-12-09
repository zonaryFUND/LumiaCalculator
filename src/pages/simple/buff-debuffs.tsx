import * as React from "react";
import TabUnit from "components/common/tab/tab-unit";
import style from "./buff-debuff.module.styl";

const buffDebuffs: React.FC = props => {
    return (
        <TabUnit title="バフ・デバフ" className={style.buffdebuff}>
            <p>作成中</p>
        </TabUnit>
    )
};

export default buffDebuffs;