import * as React from "react";
import Constants from "./constants.json";

const description: React.FC = _ => (
    <p>
        エンベノミゼーション(R)に的中した敵対象の防御力を{Constants.duration}秒間{Constants.armor}%減少させます。
        この効果は最大{Constants.max_stack}スタックまで獲得できます。
    </p> 
);

export default description;