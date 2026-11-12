"""ML LAB 11: Training a 2–4–1 network for XOR. Python 3. Optional: --plot with matplotlib."""

import sys
from math import exp, log, tanh
from statistics import mean

PARAMETERS = {'epochs': 0, 'input': 2}
BASELINE = {'epochs': 0, 'input': 2}

XOR = [(0, 0, 0), (0, 1, 1), (1, 0, 1), (1, 1, 0)]


def train(updates):
    seed = 42

    def initial():
        nonlocal seed
        seed = (1664525 * seed + 1013904223) % 2**32
        return seed / 2**32 * 2 - 1

    hidden = [[initial() for _ in range(3)] for _ in range(4)]
    output = [initial() for _ in range(5)]
    losses = []
    for step in range(updates + 1):
        h = [[tanh(b + wx*x + wy*y) for b, wx, wy in hidden] for x, y, _ in XOR]
        p = [1 / (1 + exp(-(output[0] + sum(a*w for a, w in zip(row, output[1:]))))) for row in h]
        losses.append(mean(-log(max(1e-12, prob if actual else 1-prob))
                           for prob, (_, _, actual) in zip(p, XOR)))
        if step == updates:
            return p, losses, h, hidden, output
        out_grad, hidden_grad = [0.0]*5, [[0.0]*3 for _ in range(4)]
        for row, prob, (x, y, actual) in zip(h, p, XOR):
            error = prob - actual
            out_grad[0] += error
            for j, activation in enumerate(row):
                out_grad[j+1] += error * activation
                delta = error * output[j+1] * (1 - activation**2)
                for k, value in enumerate((1, x, y)):
                    hidden_grad[j][k] += delta * value
        output = [value - .15*grad for value, grad in zip(output, out_grad)]
        hidden = [[value - .15*grad for value, grad in zip(row, grads)]
                  for row, grads in zip(hidden, hidden_grad)]


def evaluate(settings):
    p, losses, h, hidden, output = train(10 * settings["epochs"])
    correct = sum(int(prob >= .5) == actual for prob, (_, _, actual) in zip(p, XOR))
    return p, losses, correct, h, hidden, output


# --- overview ---
def overview():
    print("XOR truth table: x1 | x2 | expected output")
    print(*XOR, sep="\n")
    print("Two inputs, four tanh hidden units, one sigmoid output.")


# --- experiment ---
def experiment():
    p, losses, correct, activations, hidden, output = evaluate(PARAMETERS)
    i = PARAMETERS["input"] - 1
    print(f"Epoch {10 * PARAMETERS['epochs']}, loss={losses[-1]:.6f}, correct={correct}/4")
    for (x, y, actual), probability in zip(XOR, p):
        print(x, y, actual, f"P(1)={probability:.2%}", int(probability >= .5))
    print("Selected hidden activations:", activations[i])
    print("Selected probability:", p[i])
    print("Hidden weights:", hidden)
    print("Output weights:", output)
    if "--plot" in sys.argv:
        import matplotlib.pyplot as plt
        plt.plot(range(len(losses)), losses)
        plt.scatter(len(losses)-1, losses[-1])
        plt.xlabel("Training steps")
        plt.ylabel("Binary cross-entropy")
        plt.show()


# --- results ---
def results():
    for name, settings in [("Baseline", BASELINE), ("Current", PARAMETERS)]:
        p, losses, correct, *_ = evaluate(settings)
        print(f"{name}: loss={losses[-1]:.6f}, correct={correct}/4, P(1)={p[settings['input']-1]:.2%}")


# --- defense ---
def defense():
    _, before, _, *_ = evaluate({"epochs": 0})
    _, after, correct, *_ = evaluate({"epochs": 200})
    assert after[-1] < before[-1] and correct == 4
    print("The 4/4 score describes the four training rows used in the demonstration.")


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
