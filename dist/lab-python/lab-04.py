"""ML LAB 04: Missing values and min–max scaling. Python 3. Optional: --plot with matplotlib."""

import sys
from statistics import mean, median

PARAMETERS = {'strategy': 'mean', 'scale': False}
BASELINE = {'strategy': 'mean', 'scale': False}

SCORES = [35, None, 47, 59, None, 68, 83, 92]


def evaluate(settings):
    known = [score for score in SCORES if score is not None]
    fill = median(known) if settings["strategy"] == "median" else mean(known)
    low, high = min(known), max(known)
    rows = []
    for student, original in enumerate(SCORES, 1):
        if original is None and settings["strategy"] == "drop":
            continue
        value = fill if original is None else original
        if settings["scale"]:
            value = (value - low) / (high - low)
        rows.append((student, original, value))
    return rows


# --- overview ---
def overview():
    print("Original scores:", SCORES)
    known = [value for value in SCORES if value is not None]
    print(f"Missing: {SCORES.count(None)}, mean: {mean(known)}, median: {median(known)}")


# --- experiment ---
def experiment():
    rows = evaluate(PARAMETERS)
    print("student | original | processed")
    print(*rows, sep="\n")
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        plt.bar([row[0] for row in rows], [row[2] for row in rows],
                color=["mediumpurple" if row[1] is None else "seagreen" for row in rows])
        plt.xlabel("Student")
        plt.ylabel("Processed score")
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        rows = evaluate(settings)
        print(f"{name}: {settings}, rows={len(rows)}, values={[round(row[2], 3) for row in rows]}")


# --- defense ---
def defense():
    assert len(evaluate({"strategy": "drop", "scale": False})) == 6
    scaled = [row[2] for row in evaluate({"strategy": "median", "scale": True})]
    assert min(scaled) == 0 and max(scaled) == 1
    print("Fit imputation and scaling on training data before applying to test data.")


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
