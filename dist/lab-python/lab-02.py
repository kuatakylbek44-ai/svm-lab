"""ML LAB 02: Table filtering and sorting. Python 3. Optional: --plot with matplotlib."""

import sys
from statistics import mean

PARAMETERS = {'minimum': 50, 'sort': 'score'}
BASELINE = {'minimum': 50, 'sort': 'score'}

STUDENTS = [(1, 8, 35), (2, 6, 52), (3, 7, 47), (4, 5, 59),
            (5, 8, 72), (6, 6, 68), (7, 7, 83), (8, 5, 92)]

COLUMNS = {"hours": 1, "sleep": 2, "score": 3}


def evaluate(settings):
    rows = [(i, h, s, score) for i, (h, s, score) in enumerate(STUDENTS, 1)
            if score >= settings["minimum"]]
    rows.sort(key=lambda row: row[COLUMNS[settings["sort"]]], reverse=True)
    return rows, mean(row[3] for row in rows) if rows else None


# --- overview ---
def overview():
    print("Each tuple is a row with hours, sleep, and score columns.")
    print(*STUDENTS, sep="\n")


# --- experiment ---
def experiment():
    rows, average = evaluate(PARAMETERS)
    print("student | hours | sleep | score")
    print(*rows, sep="\n")
    print(f"Rows: {len(rows)}/{len(STUDENTS)}; mean: {average}")
    # Optional DataFrame version: python lab-02.py --pandas
    if "--pandas" in sys.argv:
        import pandas as pd

        frame = pd.DataFrame(STUDENTS, columns=["hours", "sleep", "score"])
        frame.insert(0, "student", range(1, len(frame) + 1))
        selected = frame.loc[frame["score"] >= PARAMETERS["minimum"]]
        selected = selected.sort_values(PARAMETERS["sort"], ascending=False, kind="stable")
        print(selected.to_string(index=False))
        print("DataFrame mean:", selected["score"].mean() if len(selected) else None)
    if "--plot" in sys.argv and rows:
        import matplotlib.pyplot as plt
        plt.bar(range(len(rows)), [row[3] for row in rows], tick_label=[row[0] for row in rows])
        plt.xlabel("Student ID in sorted order")
        plt.ylabel("Score")
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        rows, average = evaluate(settings)
        print(f"{name}: {len(rows)} rows, mean={average}, order={[row[0] for row in rows]}")


# --- defense ---
def defense():
    by_score = evaluate({"minimum": 75, "sort": "score"})
    by_sleep = evaluate({"minimum": 75, "sort": "sleep"})
    assert by_score[1] == by_sleep[1] == 87.5
    print("Changing the sort column preserves the rows and mean at a fixed cutoff.")


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
