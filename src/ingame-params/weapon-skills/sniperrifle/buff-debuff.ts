import Constants from "./constants.json";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する。
// 阻止射撃の的中時に発生。l10n上"阻止射撃"という同名のCharacterStateが2件（3011010/3011020）存在するが
// 区別ができないため前者を使う
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/3011010", values: [Constants.cripping.slow.effect] }
];
