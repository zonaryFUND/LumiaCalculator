import * as React from "react";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { withoutTemporaryStatus } from "core/subject-dynamic/status/calculation";
import { Status } from "core/subject-dynamic/status/type";

/**
 * 現在のStatusから、バフ・デバフ（`origin: "temporary-status"`）の寄与をすべて除いた版を返す。
 * ステータステーブルのメインセルで「バフ・デバフによる増減」を表示するために使う（`Column`の`baseline`）
 */
export default function useStatusWithoutBuffs(): Status {
    const status = useSubjectStateStore(s => s.status);
    return React.useMemo(() => withoutTemporaryStatus(status), [status]);
}
