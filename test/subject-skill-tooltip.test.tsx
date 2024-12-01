import * as React from "react";
import { expect, it } from "vitest";
import renderer from "react-test-renderer";
import Tooltip from "components/tooltip/skill/tooltip";
import { SubjectConfig, SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { useStatus } from "app-types/subject-dynamic/status/use-status";

it("abigail skill tooltip", () => {
    const config: SubjectConfig = {
        ...SubjectConfigDefault,
        subject: 67
    }
    const status = useStatus(config);
    const tree = renderer.create(<Tooltip code={10000} showEquation={false} config={config} status={status} />).toJSON();
    expect(tree).toMatchSnapshot();
})