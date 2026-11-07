"""Reproducible scikit-learn models for the browser learning lab."""
import json
from pathlib import Path
import numpy as np
import sklearn
from sklearn.datasets import load_iris, make_moons, make_circles
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

ROOT = Path(__file__).parent
def pack(m):
    return dict(sv=m.support_vectors_.tolist(), dual=m.dual_coef_.tolist(),
                intercept=m.intercept_.tolist(), n=m.n_support_.tolist(),
                support=m.support_.tolist(), kernel=m.kernel, gamma=float(m._gamma),
                degree=m.degree, coef0=m.coef0, classes=m.classes_.tolist())

rng = np.random.RandomState(19)
Xl = np.vstack([rng.normal([-1.25, -.65], [.45, .5], (15, 2)),
                 rng.normal([1.25, .65], [.45, .5], (15, 2))])
yl = np.array([0]*15 + [1]*15)
linear = {}
for noise in [0, 1]:
    X = np.vstack([Xl, [[-.7, -.7]]]) if noise else Xl
    y = np.r_[yl, 1] if noise else yl
    models = {}
    for c in [.1, 1, 100]:
        m = SVC(kernel='linear', C=c).fit(X, y)
        models[str(c)] = dict(**pack(m), w=m.coef_[0].tolist(), accuracy=float(m.score(X,y)))
    linear[str(noise)] = dict(X=X.tolist(), y=y.tolist(), models=models)

Cs = [.1, 1, 10, 100]
gammas = [.01, .1, 1, 10]
labs = {}
for name in ['moons', 'circles']:
    if name == 'moons':
        X, y = make_moons(70, noise=.17, random_state=12)
    else:
        X, y = make_circles(70, noise=.1, factor=.4, random_state=12)
    X = StandardScaler().fit_transform(X)
    models = {}
    for kernel in ['linear', 'rbf', 'poly']:
        for ci, c in enumerate(Cs):
            for gi, g in enumerate(gammas if kernel != 'linear' else [gammas[0]]):
                m = SVC(kernel=kernel, C=c, gamma=g, degree=3, coef0=1).fit(X,y)
                models[f'{kernel}_{ci}_{gi}'] = dict(**pack(m), accuracy=float(m.score(X,y)))
    labs[name] = dict(X=X.tolist(), y=y.tolist(), models=models)

iris = load_iris()
X,y = iris.data, iris.target
tr,te = train_test_split(np.arange(len(y)), test_size=.2, random_state=42, stratify=y)
pipe = Pipeline([('scale',StandardScaler()),('svm',SVC(kernel='rbf',C=1,gamma='scale'))])
pipe.fit(X[tr],y[tr])
pred = pipe.predict(X[te])
scaler = pipe.named_steps['scale']
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid = GridSearchCV(pipe, {'svm__C':Cs,'svm__gamma':gammas}, cv=cv, scoring='accuracy')
grid.fit(X[tr],y[tr])
best_pred = grid.predict(X[te])
data = dict(version=sklearn.__version__,linear=linear,labs=labs,Cs=Cs,gammas=gammas,
    iris=dict(X=X.tolist(),y=y.tolist(),names=iris.target_names.tolist(),
        train=tr.tolist(),test=te.tolist(),model=pack(pipe.named_steps['svm']),
        mean=scaler.mean_.tolist(),scale=scaler.scale_.tolist(),pred=pred.tolist(),
        allPred=pipe.predict(X).tolist(),
        accuracy=float(accuracy_score(y[te],pred)),confusion=confusion_matrix(y[te],pred).tolist(),
        report=classification_report(y[te],pred,output_dict=True),
        cv=[dict(C=p['svm__C'],gamma=p['svm__gamma'],score=float(s),std=float(d)) for p,s,d in zip(grid.cv_results_['params'],grid.cv_results_['mean_test_score'],grid.cv_results_['std_test_score'])],
        best=grid.best_params_,bestCV=float(grid.best_score_),bestAccuracy=float(accuracy_score(y[te],best_pred)),
        support=pipe.named_steps['svm'].n_support_.tolist()))
(ROOT/'dist/data.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
print(json.dumps(dict(base_accuracy=data['iris']['accuracy'],best=data['iris']['best'],bestCV=data['iris']['bestCV'],bestAccuracy=data['iris']['bestAccuracy'],support=data['iris']['support'])))
