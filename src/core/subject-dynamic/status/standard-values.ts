import Decimal from "decimal.js";

/**
 * 防御熟練度1ごとの基本攻撃ダメージ減少（％）
 */
export const BasicAttackReductionPerMastery = new Decimal(1);

/**
 * 防御熟練度1ごとのスキルダメージ減少（％）
 */
export const SkillReductionPerMastery = new Decimal(0.8);

/**
 * 移動熟練度1ごとの移動速度
 */
export const MovementSpeedPerMastery = new Decimal(0.005);

/**
 * 基礎視界範囲
 */
export const BaseVision = new Decimal(8.5);

/**
 * 基礎射程
 */
export const BaseBasicAttackRange = new Decimal(0.4);

/**
 * 致命打ダメージ基礎量（％）
 */
export const BaseCriticalDamagePercent = new Decimal(75)

/**
 * 突撃小銃基本攻撃の各弾丸ダメージ攻撃力係数
 */
export const AssaultRifleAttackRatio = [30,30,40]

/**
 * 双剣基本攻撃の各斬撃ダメージ攻撃力係数
 */
export const DualSwordsAttackRatio = [80,80]