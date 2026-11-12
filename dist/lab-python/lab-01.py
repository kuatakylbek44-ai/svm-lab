"""ML LAB 01: A threshold classifier. Python 3. Optional: --plot with matplotlib."""

import sys

PARAMETERS = {'threshold': 4}
BASELINE = {'threshold': 4}

STUDENTS = [(1, 8, 35), (2, 6, 52), (3, 7, 47), (4, 5, 59),
            (5, 8, 72), (6, 6, 68), (7, 7, 83), (8, 5, 92)]


def evaluate(settings):
    threshold = settings["threshold"]
    rows = [(h, score, int(score >= 50), int(h >= threshold)) for h, _, score in STUDENTS]
    accuracy = sum(actual == prediction for _, _, actual, prediction in rows) / len(rows)
    return rows, accuracy


# --- overview ---
def overview():
    print("Eight students: study hours, sleep hours, exam score")
    print(*STUDENTS, sep="\n")
    print("Actual class: score >= 50. Predicted class: hours >= threshold.")


# --- experiment ---
def experiment():
    rows, accuracy = evaluate(PARAMETERS)
    print("hours | score | actual | predicted")
    print(*rows, sep="\n")
    print(f"Accuracy: {accuracy:.2%}")
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        for hours, _, actual, predicted in rows:
            plt.scatter(hours, actual, color="seagreen" if actual == predicted else "indianred")
        plt.axvline(PARAMETERS["threshold"] - 0.3, color="purple", linestyle="--")
        plt.yticks([0, 1], ["Failed", "Passed"])
        plt.xlabel("Study hours")
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        rows, accuracy = evaluate(settings)
        print(f"{name}: threshold={settings['threshold']}, accuracy={accuracy:.2%}, errors={sum(a != p for _, _, a, p in rows)}")


# --- defense ---
def defense():
    assert evaluate({"threshold": 4})[1] == 7 / 8
    assert evaluate({"threshold": 9})[1] == 2 / 8
    print("Threshold 9 predicts no passes, so all six actual passes become errors.")


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
