"""ML LAB 05: Linear regression, residuals, and MSE. Python 3. Optional: --plot with matplotlib."""

import sys
from statistics import mean

PARAMETERS = {'fit': 'manual', 'slope': 4, 'intercept': 28, 'residuals': False}
BASELINE = {'fit': 'manual', 'slope': 4, 'intercept': 28, 'residuals': False}

DATA = [(1, 34), (2, 46), (3, 47), (4, 63), (5, 65), (6, 78), (7, 83), (8, 89)]
TRAIN, TEST = DATA[:6], DATA[6:]


def evaluate(settings):
    x_bar, y_bar = mean(x for x, _ in TRAIN), mean(y for _, y in TRAIN)
    if settings["fit"] == "ols":
        w = sum((x-x_bar)*(y-y_bar) for x, y in TRAIN) / sum((x-x_bar)**2 for x, _ in TRAIN)
        b = y_bar - w*x_bar
    else:
        w, b = settings["slope"], settings["intercept"]
    rows = [(x, y, w*x+b, y-(w*x+b)) for x, y in DATA]
    return w, b, rows, mean(row[3]**2 for row in rows[:6]), mean(row[3]**2 for row in rows[6:])


# --- overview ---
def overview():
    print("x = study hours, y = exam score")
    print("Train (fit the line):", TRAIN)
    print("Test (evaluate only):", TEST)


# --- experiment ---
def experiment():
    w, b, rows, train_mse, test_mse = evaluate(PARAMETERS)
    print(f"y_hat = {w:.4f} x + {b:.4f}")
    print(f"Train MSE = {train_mse:.4f}; Test MSE = {test_mse:.4f}")
    print("x | actual | prediction | residual")
    print(*rows, sep="\n")
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        plt.scatter(*zip(*TRAIN), color="seagreen", label="Train")
        plt.scatter(*zip(*TEST), color="peru", label="Test")
        plt.plot([0, 8], [b, 8*w+b], color="mediumpurple")
        if PARAMETERS["residuals"]:
            for x, y, predicted, _ in rows:
                plt.plot([x, x], [y, predicted], "--", color="peru")
        plt.legend()
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        w, b, _, train_mse, test_mse = evaluate(settings)
        print(f"{name}: w={w:.4f}, b={b:.4f}, Train MSE={train_mse:.4f}, Test MSE={test_mse:.4f}")


# --- defense ---
def defense():
    manual = evaluate({"fit": "manual", "slope": 4, "intercept": 28})
    fitted = evaluate({"fit": "ols"})
    assert fitted[3] < manual[3]
    print("Least squares minimizes training MSE. The test data was held out.")


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
