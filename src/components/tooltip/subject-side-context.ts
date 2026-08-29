import React from "react";

/**
 * 対戦モードにおいて、スキル/装備アイコンをhoverしたときに表示するツールチップが
 * どちら側の実験体のconfig/statusを参照すべきかを伝えるためだけの補助Context。
 *
 * react-tooltipのhover表示はDOM要素の`data-tooltip-subject-side`属性を読んで判別する仕組み
 * （TooltipContextのようなReact経由の参照ができない）ため、アイコン側でこのContextから値を
 * 読み取り、自身のDOM要素にその属性として書き出す、という橋渡し役を担う。
 *
 * シンプルモードのように実験体が1体しかない場面ではProviderを設置する必要がなく、
 * その場合は既定値のundefinedのままでよい（`TooltipPresenter`はconfig/statusが単一値のときは
 * side自体を無視する）。
 */
export const TooltipSubjectSideContext = React.createContext<"left" | "right" | undefined>(undefined);
