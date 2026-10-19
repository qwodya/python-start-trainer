"""
Модуль з теоретичними картками-підказками.
"""

CARDS = [
    {
        "title": "Змінні у Python",
        "content": (
            "Змінна — це іменована комірка пам'яті для зберігання даних.\n"
            "Приклад:\n"
            "  name = 'PythonStart'  # рядок (str)\n"
            "  age  = 17             # ціле число (int)\n"
            "  gpa  = 4.5            # дробове число (float)\n\n"
            "Python автоматично визначає тип даних."
        ),
    },
    {
        "title": "Умовні оператори (if / elif / else)",
        "content": (
            "Дозволяють виконувати різні блоки коду залежно від умови.\n"
            "Приклад:\n"
            "  score = 85\n"
            "  if score >= 90:\n"
            "      print('Відмінно')\n"
            "  elif score >= 75:\n"
            "      print('Добре')\n"
            "  else:\n"
            "      print('Потрібно більше практики')"
        ),
    },
    {
        "title": "Цикл for",
        "content": (
            "Використовується для перебору елементів послідовності.\n"
            "Приклад:\n"
            "  for i in range(1, 6):\n"
            "      print(f'Крок {i}')\n\n"
            "range(1, 6) генерує числа від 1 до 5 включно."
        ),
    },
    {
        "title": "Цикл while",
        "content": (
            "Виконує блок коду доки умова є істинною (True).\n"
            "Приклад:\n"
            "  count = 0\n"
            "  while count < 3:\n"
            "      print(f'Ітерація {count}')\n"
            "      count += 1"
        ),
    },
]


def show_theory():
    print("\n── Теоретичні картки ──────────────────────────")
    for i, card in enumerate(CARDS, start=1):
        print(f"\n[{i}/{len(CARDS)}] {card['title']}")
        print("-" * 40)
        print(card["content"])
        if i < len(CARDS):
            input("\nНатисніть Enter для наступної картки...")
    print("\n── Усі картки переглянуто! ────────────────────\n")
