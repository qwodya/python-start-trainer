// Движок вікторини та банк завдань
export const quizQuestions = {
    operators: [
        {
            question: "Чому дорівнює результат виразу 10 + 2 * 3 у мові Python?",
            code: "result = 10 + 2 * 3",
            options: ["36", "16", "20", "23"],
            correct: "16",
            explanation: "Спочатку виконується множення: 2 * 3 = 6, потім додавання: 10 + 6 = 16."
        },
        {
            question: "Який результат поверне операція цілочисельного ділення 15 // 4?",
            code: "res = 15 // 4",
            options: ["3.75", "3", "4", "3.0"],
            correct: "3",
            explanation: "Оператор // відкидає дробову частину і повертає ціле число 3."
        }
    ],
    variables: [
        {
            question: "Який тип даних матиме змінна total після виконання: total = '20' + '30'?",
            code: "total = '20' + '30'",
            options: ["int (50)", "str ('2030')", "float (50.0)", "Помилка SyntaxError"],
            correct: "str ('2030')",
            explanation: "Оператор '+' для двох рядків виконує їх конкатенацію (зчеплення), утворюючи рядок '2030'."
        }
    ]
};

export function validateAnswer(selectedAnswer, correctAnswer) {
    if (!selectedAnswer) return false;
    return String(selectedAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();
}

export function calculateScorePercentage(score, total) {
    if (!total || total === 0) return 0;
    return Math.round((score / total) * 100);
}
