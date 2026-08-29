import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { IntlProvider } from "react-intl";
import { Locales } from "@app/App";
import { SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { statusOf } from "app-types/subject-dynamic/status/calculation";
import equationExpressionOf from "@app/features/damage/features/potency-subrows/equation-expression";

// 回帰テスト: 武器未装備の実験体が持つ「2回目の弱い基本攻撃」のようなbasicAttackAmpレシオ付きの
// 威力について、計算式表示が「27 x 35% x = 9」のように孤立した演算子を出さないことを保証する。
// (equationExpressionOfがReactコンポーネントではなくプレーンな関数になっているのは、
//  呼び出し元(static-value-equation.tsx)がレンダリング前にnullかどうかを判定し、
//  結合演算子ごと除外できるようにするため)

describe("equationExpressionOf", () => {
    const config = SubjectConfigDefault; // equipment.Weapon = null
    const status = statusOf(config, 100);

    test("武器未装備の場合、basicAttackAmpキーはnullを返す（結合演算子の対象から除外されるべきキー）", () => {
        const result = equationExpressionOf(config, status, "basicAttackAmp", <>100</>);
        expect(result).toBeNull();
    });

    test("attackキーは武器の有無に関わらず計算式要素を返す", () => {
        const result = equationExpressionOf(config, status, "attack", <>35</>);
        expect(result).not.toBeNull();

        const { container } = render(
            <IntlProvider locale="ja" messages={Locales["ja"]}>{result}</IntlProvider>
        );
        expect(container.textContent).toContain("35");
    });
});
