import { randomNumber } from "@src/shared/lib/randomNumber";
import { TColor } from "../model";
import { COLORS } from "../config";

export const randomColor = (): TColor => {
    const randomIndex = randomNumber(0, COLORS.length - 1)
    return COLORS[randomIndex]
}