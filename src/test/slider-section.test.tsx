import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import SliderSection from "@app/features/subject-config/components/slider-section.view";

// SliderSectionはStoreに依存しないpure view（props -> JSX）なので、
// 実際のゲームデータやZustand storeを一切用意せずにテストできる。
// ゲームパッチで変わるのは実験体の基礎値・レシオ係数などの「データ」であり、
// このコンポーネントの「propsで受け取った値をどう表示・デバウンス反映するか」という
// 振る舞いはパッチの影響を受けない。だからこそここをテストする価値がある。

describe("SliderSection", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("マウント時、propsで渡された現在値を表示する", () => {
        const setValue = vi.fn();
        render(
            <SliderSection
                style={{ type: "gauge" }}
                label="暴走ゲージ"
                value={[30, setValue]}
                max={100}
            />
        );

        // ラベル横の数値表示は、propsで渡された現在値(30)を反映しているべき
        expect(screen.getByText("30")).toBeInTheDocument();
        // スライダー本体(input[type=range])の初期値も同様に30であるべき
        expect(screen.getByRole("slider")).toHaveValue("30");
    });

    test("ユーザー操作がない限り、マウントだけではsetValueを呼ばない", () => {
        const setValue = vi.fn();
        render(
            <SliderSection
                style={{ type: "gauge" }}
                label="暴走ゲージ"
                value={[30, setValue]}
                max={100}
            />
        );

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(setValue).not.toHaveBeenCalled();
    });

    test("スライダー変更後、デバウンス(500ms)を経てsetValueへ反映される", () => {
        const setValue = vi.fn();
        render(
            <SliderSection
                style={{ type: "gauge" }}
                label="暴走ゲージ"
                value={[30, setValue]}
                max={100}
            />
        );

        fireEvent.change(screen.getByRole("slider"), { target: { value: "70" } });

        // デバウンス期間中はまだ呼ばれない
        act(() => {
            vi.advanceTimersByTime(400);
        });
        expect(setValue).not.toHaveBeenCalled();

        // 500ms経過後に呼ばれる
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(setValue).toHaveBeenCalledWith(70);
    });

    test("実験体切替やプリセット読込などStore側の外部要因でvalueが変わった場合、表示に追従する", () => {
        const setValue = vi.fn();
        const { rerender } = render(
            <SliderSection
                style={{ type: "gauge" }}
                label="暴走ゲージ"
                value={[30, setValue]}
                max={100}
            />
        );

        // 実験体切替でconfig.gaugeが0にリセットされたことを想定し、propsのみ変更して再描画する
        rerender(
            <SliderSection
                style={{ type: "gauge" }}
                label="暴走ゲージ"
                value={[0, setValue]}
                max={100}
            />
        );

        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByRole("slider")).toHaveValue("0");

        // 追従処理自体がsetValueを呼び直す（無限ループやechoの書き戻し）ことはない
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(setValue).not.toHaveBeenCalled();
    });
});
