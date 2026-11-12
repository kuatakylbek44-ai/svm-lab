"""ML LAB 03: Visualization and Pearson correlation. Python 3. Optional: --plot with matplotlib."""

import sys
from math import sqrt
from statistics import mean

PARAMETERS = {'feature': 'hours', 'view': 'scatter'}
BASELINE = {'feature': 'hours', 'view': 'scatter'}

STUDENTS = [(1, 8, 35), (2, 6, 52), (3, 7, 47), (4, 5, 59),
            (5, 8, 72), (6, 6, 68), (7, 7, 83), (8, 5, 92)]


def evaluate(settings):
    column = {"hours": 0, "sleep": 1}[settings["feature"]]
    xs, ys = [row[column] for row in STUDENTS], [row[2] for row in STUDENTS]
    dx, dy = [x-mean(xs) for x in xs], [y-mean(ys) for y in ys]
    r = sum(x*y for x, y in zip(dx, dy)) / sqrt(sum(x*x for x in dx) * sum(y*y for y in dy))
    bars = [(x, mean(y for xi, y in zip(xs, ys) if xi == x)) for x in sorted(set(xs))]
    return list(zip(xs, ys)), bars, r


# --- overview ---
def overview():
    print("Compare study hours or sleep hours against score.")
    print(*STUDENTS, sep="\n")


# --- experiment ---
def experiment():
    points, bars, r = evaluate(PARAMETERS)
    print(f"Pearson r = {r:.4f}")
    plot_rows = points if PARAMETERS["view"] == "scatter" else bars
    print(*plot_rows, sep="\n")
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        draw = plt.scatter if PARAMETERS["view"] == "scatter" else plt.bar
        draw(*zip(*plot_rows))
        plt.xlabel(PARAMETERS["feature"])
        plt.ylabel("Score")
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        _, _, r = evaluate(settings)
        print(f"{name}: {settings['view']}, {settings['feature']}, Pearson r={r:.4f}")


# --- defense ---
def defense():
    assert evaluate({"feature": "hours", "view": "scatter"})[2] == evaluate(
        {"feature": "hours", "view": "bars"})[2]
    print("Chart type does not change correlation. Correlation does not establish causation.")


# --- main ---
if __name__ == "__main__":
    print("\n--- Overview ---")
    overview()
    print("\n--- Experiment ---")
    experiment()
    print("\n--- Results ---")
    results()
    print("\n--- Defense ---")
    defense()
