"""Week 13 SÖJ: CNN architectures — Akylbek and Almas.

Install: pip install tensorflow numpy
Run: python cnn-architectures.py --model lenet
Choices: lenet, alexnet, vgg16, inception, residual, resnet50.

Scope:
- lenet/alexnet are teaching variants, not exact historical reproductions.
- inception is one GoogLeNet/Inception-v1 3a block, not InceptionV3.
- residual is one educational basic residual block, not full ResNet50.
- vgg16/resnet50 use Keras Applications WITHOUT the classifier.
Weights are random. No dataset download, training, accuracy or recognition
result is claimed. One synthetic forward pass checks compatible shapes.
"""

# %% setup
import os
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
os.environ.setdefault("TF_NUM_INTRAOP_THREADS", "2")
os.environ.setdefault("TF_NUM_INTEROP_THREADS", "2")

import argparse
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

keras.utils.set_random_seed(13)


# %% lenet
def make_lenet():
    """Teaching LeNet variant: full channel connections, fixed average pooling,
    tanh activations, softmax output. The original used trainable subsampling,
    partial C3 connectivity, and an RBF output."""
    return keras.Sequential([
        layers.Input((32, 32, 1)),
        layers.Conv2D(6, 5, activation="tanh", name="C1"),
        layers.AveragePooling2D(2, name="S2_average"),
        layers.Conv2D(16, 5, activation="tanh", name="C3_full_connections"),
        layers.AveragePooling2D(2, name="S4_average"),
        layers.Conv2D(120, 5, activation="tanh", name="C5"),
        layers.Flatten(),
        layers.Dense(84, activation="tanh", name="F6"),
        layers.Dense(10, activation="softmax", name="teaching_softmax"),
    ], name="LeNet_teaching_variant")


# %% alexnet
def make_alexnet():
    """Teaching AlexNet variant with the common 227x227 input convention.
    Full channel connections: no original two-GPU grouping or LRN.
    Dropout affects training only; the demo calls training=False."""
    return keras.Sequential([
        layers.Input((227, 227, 3)),
        layers.Conv2D(96, 11, strides=4, activation="relu"),
        layers.MaxPooling2D(3, strides=2),
        layers.Conv2D(256, 5, padding="same", activation="relu"),
        layers.MaxPooling2D(3, strides=2),
        layers.Conv2D(384, 3, padding="same", activation="relu"),
        layers.Conv2D(384, 3, padding="same", activation="relu"),
        layers.Conv2D(256, 3, padding="same", activation="relu"),
        layers.MaxPooling2D(3, strides=2),
        layers.Flatten(),
        layers.Dense(4096, activation="relu"),
        layers.Dropout(0.5),
        layers.Dense(4096, activation="relu"),
        layers.Dropout(0.5),
        layers.Dense(1000, activation="softmax"),
    ], name="AlexNet_teaching_variant")


# %% vgg
def make_vgg16():
    # Original complete VGG16 has 13 Conv + 3 Dense layers.
    # include_top=False removes those 3 Dense layers.
    # 64x64 is used for a lightweight structural demonstration, not ImageNet.
    # Global average pooling produces 512 features, NOT class probabilities.
    return keras.applications.VGG16(
        weights=None, include_top=False, input_shape=(64, 64, 3), pooling="avg"
    )


# %% inception
def inception_v1_3a(x):
    """One original-style Inception-v1 3a block.
    All four outputs preserve H and W, then concatenate their channels."""
    branch1 = layers.Conv2D(64, 1, activation="relu", name="branch1_1x1")(x)

    branch3 = layers.Conv2D(96, 1, activation="relu", name="branch3_reduce")(x)
    branch3 = layers.Conv2D(128, 3, padding="same", activation="relu",
                           name="branch3_3x3")(branch3)

    branch5 = layers.Conv2D(16, 1, activation="relu", name="branch5_reduce")(x)
    branch5 = layers.Conv2D(32, 5, padding="same", activation="relu",
                           name="branch5_5x5")(branch5)

    branch_pool = layers.MaxPooling2D(3, strides=1, padding="same",
                                     name="branch_pool")(x)
    branch_pool = layers.Conv2D(32, 1, activation="relu",
                               name="branch_pool_projection")(branch_pool)
    # 64 + 128 + 32 + 32 = 256 output channels.
    return layers.Concatenate(axis=-1, name="concatenate_channels")(
        [branch1, branch3, branch5, branch_pool]
    )


def make_inception():
    x = layers.Input((28, 28, 192))
    return keras.Model(x, inception_v1_3a(x), name="Inception_v1_3a_block")


# %% resnet
def residual_block(x, filters, stride=1):
    """Educational ResNet-v1 basic block: two 3x3 convolutions.
    Full ResNet50 instead uses 1x1 -> 3x3 -> 1x1 bottleneck blocks."""
    shortcut = x
    y = layers.Conv2D(filters, 3, strides=stride, padding="same",
                      use_bias=False)(x)
    y = layers.BatchNormalization()(y)
    y = layers.Activation("relu")(y)
    y = layers.Conv2D(filters, 3, padding="same", use_bias=False)(y)
    y = layers.BatchNormalization()(y)

    # Add requires matching H, W and C on both paths.
    if stride != 1 or x.shape[-1] != filters:
        shortcut = layers.Conv2D(filters, 1, strides=stride,
                                 use_bias=False)(shortcut)
        shortcut = layers.BatchNormalization()(shortcut)
    y = layers.Add()([y, shortcut])
    return layers.Activation("relu")(y)


def make_residual():
    x = layers.Input((32, 32, 16))
    return keras.Model(x, residual_block(x, 16), name="Residual_basic_block")


def make_resnet50():
    # Keras ResNet50 without its final classifier; 2048 output features.
    return keras.applications.ResNet50(
        weights=None, include_top=False, input_shape=(64, 64, 3), pooling="avg"
    )


# %% compare
BUILDERS = {
    "lenet": make_lenet,
    "alexnet": make_alexnet,
    "vgg16": make_vgg16,
    "inception": make_inception,
    "residual": make_residual,
    "resnet50": make_resnet50,
}


def inspect_model(name="lenet", verbose=True):
    """Construct ONE model and run a synthetic input through it.
    Do not interpret random outputs as learned predictions."""
    keras.backend.clear_session()
    keras.utils.set_random_seed(13)
    model = BUILDERS[name]()
    if verbose:
        model.summary()

    input_shape = tuple(int(d) for d in model.input_shape[1:])
    # The leading 1 is batch size: one synthetic example.
    example = np.random.default_rng(13).normal(size=(1,) + input_shape).astype("float32")
    output = model(example, training=False).numpy()
    assert np.isfinite(output).all(), "Non-finite forward output"
    if name in ("lenet", "alexnet"):
        np.testing.assert_allclose(output.sum(axis=1), 1.0, atol=1e-5)
    result = {
        "model": name,
        "input_shape": list(example.shape),
        "output_shape": list(output.shape),
        "parameters": model.count_params(),
        "status": "Random weights; synthetic forward pass only; not trained",
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", choices=list(BUILDERS), default="lenet")
    args = parser.parse_args()
    inspect_model(args.model)

