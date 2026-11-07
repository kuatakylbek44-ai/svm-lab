# ML LAB — Imbalanced Data
# Standalone experiment: all five methods, default threshold 0.5.

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs, make_moons, make_classification
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.metrics import silhouette_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import NearestNeighbors
X,y=make_classification(n_samples=1000,n_features=20,n_informative=3,n_redundant=1,weights=[.9,.1],flip_y=0,class_sep=1.3,random_state=42)
a,b,c,d=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
sc=StandardScaler().fit(a);sa=sc.transform(a);sb=sc.transform(b)
rng=np.random.default_rng(42);pos=np.flatnonzero(c==1);neg=np.flatnonzero(c==0)
over=np.r_[neg,rng.choice(pos,len(neg),replace=True)]
under=np.r_[pos,rng.choice(neg,len(pos),replace=False)]
minor=sa[pos];nn=NearestNeighbors(n_neighbors=6).fit(minor).kneighbors(minor,return_distance=False)[:,1:]
new=[]
for _ in range(len(neg)-len(pos)):
    i=rng.integers(len(pos));j=rng.choice(nn[i])
    new.append(minor[i]+rng.random()*(minor[j]-minor[i]))
for name,xx,yy,weight in [('base',sa,c,None),('over',sa[over],c[over],None),('under',sa[under],c[under],None),('smote',np.vstack([sa,new]),np.r_[c,np.ones(len(new),int)],None),('weighted',sa,c,'balanced')]:
    model=RandomForestClassifier(n_estimators=100,random_state=42,class_weight=weight).fit(xx,yy)
    threshold=.5
    predicted=(model.predict_proba(sb)[:,1]>=threshold).astype(int)
    print(name,np.bincount(yy))
    print(confusion_matrix(d,predicted,labels=[0,1]))
    print(classification_report(d,predicted,zero_division=0))
# Resample TRAIN only. Keep test unchanged. Class 1 is the minority (10%).
# Threshold on the site is a teaching experiment: choose production thresholds on validation data.
