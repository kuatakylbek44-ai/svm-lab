from sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans
X = [[20], [25], [50], [80], [85]]
hierarchy = AgglomerativeClustering(n_clusters=2, linkage="single")
density = DBSCAN(eps=6, min_samples=2)
centers = KMeans(n_clusters=2, random_state=0, n_init=10)
print("Hierarchical:", hierarchy.fit_predict(X).tolist())
print("DBSCAN:", density.fit_predict(X).tolist())
print("K-Means:", centers.fit_predict(X).tolist())
