"""ML LAB 07: Classification metrics and confusion matrix. Python 3. Optional: --plot with matplotlib."""

import sys

PARAMETERS = {'threshold': 60}
BASELINE = {'threshold': 60}

TEST = [(95, 1), (88, 1), (79, 0), (75, 1), (67, 1), (58, 0),
        (50, 1), (44, 0), (39, 1), (32, 0), (21, 0), (12, 0)]


def ratio(a, b):
    return a / b if b else None


def evaluate(settings):
    rows = [(score, actual, int(score >= settings["threshold"])) for score, actual in TEST]
    tp = sum(actual == predicted == 1 for _, actual, predicted in rows)
    tn = sum(actual == predicted == 0 for _, actual, predicted in rows)
    fp = sum(actual == 0 and predicted == 1 for _, actual, predicted in rows)
    fn = sum(actual == 1 and predicted == 0 for _, actual, predicted in rows)
    metrics = {
        "Accuracy": (tp+tn) / len(rows), "Precision": ratio(tp, tp+fp),
        "Recall": ratio(tp, tp+fn), "F1": ratio(2*tp, 2*tp+fp+fn),
    }
    return rows, [[tp, fn], [fp, tn]], metrics


def report(metrics):
    return ", ".join(f"{key}={value:.2%}" if value is not None else f"{key}=undefined"
                     for key, value in metrics.items())


# --- overview ---
def overview():
    print("Fixed test data: model score in percent and actual binary class")
    print(*TEST, sep="\n")


# --- experiment ---
def experiment():
    rows, matrix, metrics = evaluate(PARAMETERS)
    print("Rows: actual [1, 0]. Columns: predicted [1, 0].")
    print(*matrix, sep="\n")
    print(report(metrics))
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        for score, actual, predicted in rows:
            plt.scatter(score, actual, color="seagreen" if actual == predicted else "peru")
        plt.axvline(PARAMETERS["threshold"], color="purple", linestyle="--")
        plt.xlabel("Model score (%)")
        plt.yticks([0, 1], ["Actual 0", "Actual 1"])
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        _, matrix, metrics = evaluate(settings)
        print(f"{name}: threshold={settings['threshold']}%, matrix={matrix}; {report(metrics)}")


# --- defense ---
def defense():
    _, _, high = evaluate({"threshold": 80})
    _, _, low = evaluate({"threshold": 25})
    assert high["Accuracy"] == low["Accuracy"]
    assert high["Precision"] > low["Precision"] and high["Recall"] < low["Recall"]
    print("The same accuracy can hide very different precision and recall.")


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
