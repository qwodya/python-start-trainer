// Движок вікторини та банк навчальних завдань тренажера «PythonStart»
export const quizQuestions = {
    variables: [
        {
            question: "Який тип даних матиме змінна total після виконання операції конкатенації?",
            code: "total = '20' + '30'",
            options: ["int (50)", "str ('2030')", "float (50.0)", "Помилка TypeError"],
            correct: "str ('2030')",
            explanation: "Оператор '+' для двох рядків виконує їх зчеплення (конкатенацію), повертаючи рядок '2030'."
        },
        {
            question: "Який тип даних повертає операція ділення '/' у мові Python 3?",
            code: "result = 10 / 2",
            options: ["int", "float", "number", "decimal"],
            correct: "float",
            explanation: "У Python 3 оператор звичайного ділення '/' завжди повертає дійсне число (тип float, наприклад 5.0)."
        },
        {
            question: "До якого логічного значення приводиться порожній список bool([])?",
            code: "is_empty = bool([])",
            options: ["True", "False", "None", "Error"],
            correct: "False",
            explanation: "Будь-які порожні послідовності (порожній список [], кортеж (), рядок '' тощо) у логічному контексті є False."
        },
        {
            question: "Які значення матимуть змінні a та b після множинного присвоєння?",
            code: "a, b = 5, 10\na, b = b, a",
            options: ["a = 5, b = 10", "a = 10, b = 5", "a = 10, b = 10", "Помилка SyntaxError"],
            correct: "a = 10, b = 5",
            explanation: "Конструкція множинного присвоєння в Python дозволяє обміняти значення двох змінних без тимчасової змінної."
        }
    ],
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
        },
        {
            question: "Чому дорівнює результат операції взяття остачі від ділення 17 % 5?",
            code: "rem = 17 % 5",
            options: ["2", "3", "3.4", "1"],
            correct: "2",
            explanation: "17 ділиться на 5 як 3 цілих з остачею 2 (3 * 5 + 2 = 17)."
        },
        {
            question: "Чому дорівнює результат піднесення до степеня 2 ** 3?",
            code: "power = 2 ** 3",
            options: ["6", "8", "9", "5"],
            correct: "8",
            explanation: "Оператор ** підносить основу до степеня: 2 в кубі = 8."
        }
    ],
    conditions: [
        {
            question: "Що буде виведено на екран у результаті виконання умовного оператора?",
            code: "score = 75\nif score >= 90:\n    print('A')\nelif score >= 70:\n    print('B')\nelse:\n    print('C')",
            options: ["A", "B", "C", "Нічого"],
            correct: "B",
            explanation: "Умова score >= 90 є False (75 < 90), а умова elif score >= 70 є True (75 >= 70), тому друкується 'B'."
        },
        {
            question: "Який результат поверне вираз із логічним оператором and?",
            code: "res = (5 > 2) and (10 < 3)",
            options: ["True", "False", "None", "Помилка"],
            correct: "False",
            explanation: "Оператор and повертає True тільки якщо обидві частини істинні. Оскільки 10 < 3 є False, результат False."
        },
        {
            question: "Чому дорівнює результат виразу: not False or False?",
            code: "check = not False or False",
            options: ["True", "False", "None", "Error"],
            correct: "True",
            explanation: "Оператор not має найвищий пріоритет: not False = True. Далі True or False = True."
        },
        {
            question: "Який синтаксис має тернарний умовний оператор у Python?",
            code: "val = 10\nstatus = 'Парне' if val % 2 == 0 else 'Непарне'",
            options: ["status = 'Парне'", "status = 'Непарне'", "status = True", "Помилка SyntaxError"],
            correct: "status = 'Парне'",
            explanation: "Оскільки 10 % 2 == 0 є True, тернарний оператор повертає значення перед if: 'Парне'."
        }
    ],
    loops: [
        {
            question: "Скільки чисел згенерує функція range(1, 5) і що саме буде надруковано?",
            code: "for i in range(1, 5):\n    print(i, end=' ')",
            options: ["1 2 3 4 5", "1 2 3 4", "0 1 2 3 4", "1 2 3"],
            correct: "1 2 3 4",
            explanation: "Функція range(start, stop) генерує числа від start до stop-1. Верхня межа 5 не включається."
        },
        {
            question: "Яке фінальне значення матиме змінна s після виконання циклу?",
            code: "s = 0\nfor x in [1, 2, 3, 4]:\n    s += x",
            options: ["10", "4", "6", "0"],
            correct: "10",
            explanation: "Цикл підсумовує елементи списку: 0 + 1 + 2 + 3 + 4 = 10."
        },
        {
            question: "Які числа надрукує цикл із використанням оператора break?",
            code: "for n in range(5):\n    if n == 3:\n        break\n    print(n, end=' ')",
            options: ["0 1 2", "0 1 2 3", "0 1 2 3 4", "1 2 3"],
            correct: "0 1 2",
            explanation: "Коли n стає рівним 3, виконується інструкція break, яка негайно припиняє цикл до друку числа 3."
        },
        {
            question: "Що надрукує цикл із використанням оператора continue?",
            code: "for n in range(4):\n    if n % 2 == 0:\n        continue\n    print(n, end=' ')",
            options: ["0 2", "1 3", "0 1 2 3", "Нічого"],
            correct: "1 3",
            explanation: "Для парних чисел (0 та 2) умова n % 2 == 0 є True, тому continue пропускає виклик print. Надрукуються лише 1 та 3."
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
