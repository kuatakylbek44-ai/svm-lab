"""Week 11: hierarchical clustering and DBSCAN on the same 31 points.

Install: python -m pip install numpy scipy scikit-learn matplotlib
Run: python cluster-sroj.py
"""

# %% data
import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import cut_tree, dendrogram, linkage
from sklearn.cluster import DBSCAN

theta = np.linspace(0, np.pi, 14)
arc = np.column_stack((np.cos(theta), np.sin(theta)))
points = np.round(np.vstack((arc, [1, .5] - arc, [[-1.3, -.8], [2.4, 1.05], [.5, 1.55]])), 3)

# Change these parameters to reproduce a setting from the lab.
METHOD, K = "average", 5
EPS, MIN_PTS = .34, 3

# %% hierarchy
tree = linkage(points, method=METHOD, metric="euclidean")
hierarchical_labels = cut_tree(tree, n_clusters=K).ravel()
print(f"Hierarchical: {METHOD}, clusters={len(set(hierarchical_labels))}")
print("First merge distances:", np.round(tree[:5, 2], 3))

# %% dbscan
db = DBSCAN(eps=EPS, min_samples=MIN_PTS, metric="euclidean").fit(points)
density_labels = db.labels_
core = np.isin(np.arange(len(points)), db.core_sample_indices_)
noise = density_labels == -1
border = ~noise & ~core
clusters = len(set(density_labels) - {-1})
print(f"DBSCAN: eps={EPS}, MinPts={MIN_PTS}, clusters={clusters}")
print(f"Core={core.sum()}, border={border.sum()}, noise={noise.sum()}")
index = 0
neighbors = np.flatnonzero(np.linalg.norm(points - points[index], axis=1) <= EPS + 1e-10)
print(f"P{index + 1} neighbors (including itself):", (neighbors + 1).tolist())

# %% compare
fig, axes = plt.subplots(1, 3, figsize=(14, 4))
for ax, labels, title in [
    (axes[0], hierarchical_labels, "Hierarchical"),
    (axes[1], density_labels, "DBSCAN"),
]:
    for label in sorted(set(labels)):
        chosen = labels == label
        ax.scatter(*points[chosen].T, label=f"Cluster {label + 1}" if label >= 0 else "Noise",
                   marker="x" if label == -1 else "o")
    ax.set(title=title, xlabel="x", ylabel="y", aspect="equal")
    ax.legend(fontsize=7, loc="best")
dendrogram(tree, ax=axes[2], no_labels=True, color_threshold=0)
axes[2].set(title=f"Dendrogram · {METHOD}", xlabel="Points", ylabel="Merge distance")
fig.tight_layout()
fig.savefig("sroj11-clustering.png", dpi=160)
plt.show()
