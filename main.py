"""
Навчальний тренажер «PythonStart»
Головний модуль запуску програми.
"""

from theory import show_theory
from tasks import run_tasks


def main():
    print("=" * 50)
    print("   Навчальний тренажер «PythonStart»")
    print("=" * 50)
    print("\nВітаємо! Оберіть режим роботи:")
    print("  1 — Теоретичні картки")
    print("  2 — Практичні завдання")
    print("  0 — Вихід\n")

    while True:
        choice = input("Ваш вибір: ").strip()
        if choice == "1":
            show_theory()
        elif choice == "2":
            run_tasks()
        elif choice == "0":
            print("\nДо побачення! Успіхів у навчанні! 🐍")
            break
        else:
            print("Невірний вибір. Спробуйте ще раз.")


if __name__ == "__main__":
    main()
