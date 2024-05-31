import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            ダメージを受けていない状態になってから{Constants.threshold}秒後、毎秒<Value ratio={Constants.shield} />
            のシールドを獲得します。獲得できるシールドの最大値は<Value ratio={Constants.max_shield} />です。
        </p> 
    );
}

export default description;