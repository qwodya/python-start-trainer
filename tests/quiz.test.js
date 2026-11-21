import { describe, it, expect } from "vitest";
import { validateAnswer, calculateScorePercentage } from "../src/js/quiz.js";

describe("Модульне тестування логіки тренажера PythonStart (Lab 11)", () => {
    it("Коректно валідує точну правильну відповідь", () => {
        expect(validateAnswer("16", "16")).toBe(true);
        expect(validateAnswer("float", "float")).toBe(true);
    });

    it("Ігнорує регістр літер та зайві пробіли (Edge cases)", () => {
        expect(validateAnswer("  FLOAT  ", "float")).toBe(true);
        expect(validateAnswer("str", "STR")).toBe(true);
    });

    it("Повертає false для неправильної відповіді або порожнього рядка", () => {
        expect(validateAnswer("36", "16")).toBe(false);
        expect(validateAnswer("", "16")).toBe(false);
        expect(validateAnswer(null, "16")).toBe(false);
    });

    it("Правильно розраховує відсоток успішності", () => {
        expect(calculateScorePercentage(2, 2)).toBe(100);
        expect(calculateScorePercentage(1, 2)).toBe(50);
        expect(calculateScorePercentage(0, 5)).toBe(0);
    });

    it("Захищає від ділення на нуль (total = 0)", () => {
        expect(calculateScorePercentage(0, 0)).toBe(0);
    });
});
