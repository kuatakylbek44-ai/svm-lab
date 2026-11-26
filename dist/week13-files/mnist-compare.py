"""Week 13 MNIST comparison — Akylbek, Almas and Nurdaulet.

Install: pip install tensorflow numpy
Run: python mnist-compare.py

Five SMALL teaching variants preserve selected architectural ideas.
They are NOT original LeNet-5, AlexNet, VGG16, GoogLeNet or ResNet50.
All use the SAME fixed MNIST subset, input normalization, optimizer,
batch size and five epochs. One seed/run is not an architecture benchmark.
No pretrained weights, early stopping or test-based model selection.

MNIST attribution: Yann LeCun and Corinna Cortes; derived from NIST.
Dataset source: https://keras.io/api/datasets/mnist/
Dataset license: CC BY-SA 3.0, https://creativecommons.org/licenses/by-sa/3.0/
The exported sample pixels are unmodified MNIST images.
"""

# %% setup
import os
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
os.environ.setdefault("TF_NUM_INTRAOP_THREADS", "4")
os.environ.setdefault("TF_NUM_INTEROP_THREADS", "2")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("TF_ENABLE_ONEDNN_OPTS", "0")

import json
import time
from pathlib import Path
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

SEED = 13
EPOCHS = 5
BATCH = 64
LEARNING_RATE = 0.001
OUT = Path(os.environ.get("MNIST_COMPARE_OUT", "mnist-comparison.json"))
keras.utils.set_random_seed(SEED)
tf.config.experimental.enable_op_determinism()
print("TensorFlow:", tf.__version__)


# %% data
cache_path = os.environ.get("MNIST_COMPARE_CACHE")
if cache_path:
    with np.load(cache_path) as cache:
        raw_train, label_train = cache["x_train"], cache["y_train"]
        raw_test, label_test = cache["x_test"], cache["y_test"]
else:
    (raw_train, label_train), (raw_test, label_test) = keras.datasets.mnist.load_data()

# Selection is fixed BEFORE models are trained. All classes have equal counts.
rng = np.random.default_rng(SEED)
train_indices, val_indices, test_indices, display_indices = [], [], [], []
for digit in range(10):
    train_class = rng.permutation(np.flatnonzero(label_train == digit))[:1000]
    test_class = rng.permutation(np.flatnonzero(label_test == digit))[:200]
    train_indices.extend(train_class[:900].tolist())
    val_indices.extend(train_class[900:].tolist())
    test_indices.extend(test_class.tolist())
    display_indices.extend(test_class[:6].tolist())
train_indices = rng.permutation(train_indices)
val_indices = np.array(val_indices)
test_indices = np.array(test_indices)
display_indices = np.array(display_indices)
assert not set(train_indices) & set(val_indices)
assert set(display_indices).issubset(set(test_indices))

def normalize(images):
    return images.astype("float32")[..., None] / 255.0

x_train, y_train = normalize(raw_train[train_indices]), label_train[train_indices]
x_val, y_val = normalize(raw_train[val_indices]), label_train[val_indices]
x_test, y_test = normalize(raw_test[test_indices]), label_test[test_indices]
x_display = normalize(raw_test[display_indices])
assert all(np.bincount(y_train, minlength=10) == 900)
assert all(np.bincount(y_val, minlength=10) == 100)
assert all(np.bincount(y_test, minlength=10) == 200)

def dataset(x, y, shuffle=False):
    ds = tf.data.Dataset.from_tensor_slices((x, y))
    if shuffle:
        # A new dataset per model restarts the same seeded shuffle sequence.
        ds = ds.shuffle(len(x), seed=SEED, reshuffle_each_iteration=True)
    options = tf.data.Options()
    options.threading.private_threadpool_size = 2
    options.experimental_deterministic = True
    return ds.batch(BATCH).with_options(options).prefetch(1)

samples = [
    dict(index=int(i), label=int(label_test[i]), pixels=raw_test[i].reshape(-1).tolist())
    for i in display_indices
]
metadata = dict(
    name="MNIST", train=9000, validation=1000, test=2000,
    full_train=60000, full_test=10000, seed=SEED, epochs=EPOCHS,
    batch_size=BATCH, learning_rate=LEARNING_RATE, optimizer="Adam",
    normalization="float32 / 255; range [0, 1]", input_shape=[28, 28, 1],
    source_url="https://keras.io/api/datasets/mnist/",
    license="CC BY-SA 3.0",
    license_url="https://creativecommons.org/licenses/by-sa/3.0/",
    attribution="MNIST: Yann LeCun and Corinna Cortes; derived from NIST.",
    selection="Seed 13: 1000/class official training -> 900 train + 100 validation; "
              "200/class official test. First 6 of each selected test class displayed "
              "before any training. One run; small architecture-inspired models.",
    train_indices=train_indices.tolist(), validation_indices=val_indices.tolist(),
    test_indices=test_indices.tolist()
)
print("Shared split:", x_train.shape, x_val.shape, x_test.shape)
print("Shared displayed test images:", len(samples))


# %% models
def lenet_style():
    # LeNet idea: tanh convolutions, average pooling, a small dense classifier.
    return keras.Sequential([
        layers.Input((28, 28, 1)),
        layers.Conv2D(6, 5, activation="tanh"),
        layers.AveragePooling2D(2),
        layers.Conv2D(16, 5, activation="tanh"),
        layers.AveragePooling2D(2),
        layers.Flatten(),
        layers.Dense(120, activation="tanh"),
        layers.Dense(84, activation="tanh"),
        layers.Dense(10, activation="softmax"),
    ], name="LeNet_style_small")


def alexnet_style():
    # AlexNet idea: five convolution layers, ReLU, max pooling and dropout.
    # Reduced filters, small kernels/input, no original GPU groups or LRN.
    return keras.Sequential([
        layers.Input((28, 28, 1)),
        layers.Conv2D(16, 5, padding="same", activation="relu"),
        layers.MaxPooling2D(2),
        layers.Conv2D(24, 3, padding="same", activation="relu"),
        layers.MaxPooling2D(2),
        layers.Conv2D(32, 3, padding="same", activation="relu"),
        layers.Conv2D(32, 3, padding="same", activation="relu"),
        layers.Conv2D(24, 3, padding="same", activation="relu"),
        layers.MaxPooling2D(2),
        layers.Flatten(),
        layers.Dense(64, activation="relu"), layers.Dropout(0.4),
        layers.Dense(32, activation="relu"), layers.Dropout(0.4),
        layers.Dense(10, activation="softmax"),
    ], name="AlexNet_style_small")


def vgg_style():
    # VGG idea: repeated 3x3 filters grouped into blocks. Not full VGG16.
    model = keras.Sequential([layers.Input((28, 28, 1))], name="VGG_style_small")
    for filters in (8, 16, 32):
        model.add(layers.Conv2D(filters, 3, padding="same", activation="relu"))
        model.add(layers.Conv2D(filters, 3, padding="same", activation="relu"))
        model.add(layers.MaxPooling2D(2))
    model.add(layers.Flatten())
    model.add(layers.Dense(64, activation="relu"))
    model.add(layers.Dense(10, activation="softmax"))
    return model


def inception_style():
    # Inception idea: parallel 1x1 / 3x3 / 5x5 / pooling branches.
    x = layers.Input((28, 28, 1))
    stem = layers.Conv2D(16, 3, padding="same", activation="relu")(x)
    stem = layers.MaxPooling2D(2)(stem)
    one = layers.Conv2D(8, 1, activation="relu")(stem)
    three = layers.Conv2D(8, 1, activation="relu")(stem)
    three = layers.Conv2D(12, 3, padding="same", activation="relu")(three)
    five = layers.Conv2D(4, 1, activation="relu")(stem)
    five = layers.Conv2D(4, 5, padding="same", activation="relu")(five)
    pool = layers.MaxPooling2D(3, strides=1, padding="same")(stem)
    pool = layers.Conv2D(4, 1, activation="relu")(pool)
    joined = layers.Concatenate()([one, three, five, pool])
    y = layers.MaxPooling2D(2)(joined)
    y = layers.Conv2D(32, 3, padding="same", activation="relu")(y)
    y = layers.MaxPooling2D(2)(y)
    y = layers.Flatten()(y)
    y = layers.Dense(64, activation="relu")(y)
    return keras.Model(x, layers.Dense(10, activation="softmax")(y),
                       name="Inception_style_small")


def residual_block(x, filters):
    # Two 3x3 convolutions plus a shortcut, unlike ResNet50 bottlenecks.
    shortcut = x
    y = layers.Conv2D(filters, 3, padding="same", use_bias=False)(x)
    y = layers.BatchNormalization()(y)
    y = layers.Activation("relu")(y)
    y = layers.Conv2D(filters, 3, padding="same", use_bias=False)(y)
    y = layers.BatchNormalization()(y)
    if x.shape[-1] != filters:
        shortcut = layers.Conv2D(filters, 1, use_bias=False)(shortcut)
        shortcut = layers.BatchNormalization()(shortcut)
    return layers.Activation("relu")(layers.Add()([y, shortcut]))


def resnet_style():
    x = layers.Input((28, 28, 1))
    y = layers.Conv2D(16, 3, padding="same", activation="relu")(x)
    y = layers.MaxPooling2D(2)(y)
    y = residual_block(y, 16)
    y = layers.MaxPooling2D(2)(y)
    y = residual_block(y, 32)
    y = layers.MaxPooling2D(2)(y)
    y = layers.Flatten()(y)
    y = layers.Dense(64, activation="relu")(y)
    return keras.Model(x, layers.Dense(10, activation="softmax")(y),
                       name="ResNet_style_small")


BUILDERS = {
    "lenet": (lenet_style, "LeNet-style", "Conv6/5 tanh > AvgPool > Conv16/5 tanh > AvgPool > Dense120 > Dense84 > 10"),
    "alexnet": (alexnet_style, "AlexNet-style", "5 Conv ReLU (16/24/32/32/24) > MaxPool > Dense64/32 + Dropout > 10"),
    "vgg": (vgg_style, "VGG-style", "2xConv8 > Pool > 2xConv16 > Pool > 2xConv32 > Pool > Dense64 > 10"),
    "inception": (inception_style, "Inception-style", "Conv16 > Pool > 4 parallel branches > concat28 > Pool > Conv32 > Pool > Dense64 > 10"),
    "resnet": (resnet_style, "ResNet-style", "Conv16 > Pool > residual16 > Pool > residual32 > Pool > Dense64 > 10"),
}
print("Five small teaching models; no original-network benchmark.")


# %% training
models = []
for model_id, (builder, name, architecture) in BUILDERS.items():
    started = time.perf_counter()
    keras.backend.clear_session()
    keras.utils.set_random_seed(SEED)
    model = builder()
    assert model.count_params() <= 150000
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
        loss="sparse_categorical_crossentropy", metrics=["accuracy"]
    )

    probabilities = []
    def record():
        probabilities.append(model(x_display, training=False).numpy())

    class Trace(keras.callbacks.Callback):
        def on_epoch_end(self, epoch, logs=None):
            record()

    record()  # Epoch 0: random, untrained weights.
    print("\nTRAIN", model_id, "parameters:", model.count_params(), flush=True)
    history = model.fit(
        dataset(x_train, y_train, shuffle=True),
        validation_data=dataset(x_val, y_val),
        epochs=EPOCHS, callbacks=[Trace()], verbose=2
    ).history
    loss, _ = model.evaluate(dataset(x_test, y_test), verbose=0)
    test_probabilities = np.concatenate([
        model(batch, training=False).numpy() for batch, _ in dataset(x_test, y_test)
    ])
    predictions = test_probabilities.argmax(axis=1)
    correct = int(np.count_nonzero(predictions == y_test))
    matrix = np.zeros((10, 10), dtype=int)
    np.add.at(matrix, (y_test, predictions), 1)
    trace = np.asarray(probabilities)
    assert trace.shape == (EPOCHS + 1, len(samples), 10)
    np.testing.assert_allclose(trace.sum(axis=2), 1, atol=1e-5)
    assert matrix.sum() == len(y_test)
    trainable = int(sum(np.prod(weight.shape) for weight in model.trainable_weights))
    item = dict(
        id=model_id, name=name, parameters=model.count_params(),
        trainable_parameters=trainable,
        accuracy=correct / len(y_test), correct=correct, loss=float(loss),
        history={key: [float(v) for v in values] for key, values in history.items()},
        matrix=matrix.tolist(), probabilities=trace.round(7).tolist(),
        architecture=architecture,
        measured_seconds=round(time.perf_counter() - started, 2)
    )
    models.append(item)
    print("RESULT", model_id, f"{correct}/{len(y_test)}",
          f"accuracy={item['accuracy']:.2%}", flush=True)


# %% export
result = dict(
    dataset=metadata, samples=samples, models=models,
    tensorflow=tf.__version__,
    scope="Small teaching variants; five fixed epochs on one balanced MNIST subset. "
          "One seed/run; this is not a benchmark of the original named architectures."
)
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")),
               encoding="utf-8")
print("\nFinal held-out test results (same 2000 examples):")
for item in models:
    print(f"{item['name']:17s} {item['correct']:4d}/2000 "
          f"{item['accuracy']:.2%}  parameters={item['parameters']:,}")
print("Saved:", OUT)

