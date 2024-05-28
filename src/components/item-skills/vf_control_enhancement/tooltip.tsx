import * as React from "react";
import Constants from "./constants.json";

const description: React.FC = _ => (
    <p>
        エキオンのオーバーロード状態の持続時間がVF暴走(R)レベルによって永久に{Constants.cooldown_reduction.map(cdr => `${cdr}%`).join("/")}減少します。
    </p> 
);

export default description;