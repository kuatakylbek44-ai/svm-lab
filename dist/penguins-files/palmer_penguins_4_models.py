# Palmer Penguins: four model comparison
# Author: Kuat Akylbek
# Run from the directory containing penguins.csv.
# Install: pip install numpy pandas matplotlib seaborn scikit-learn xgboost ipython


# %%
import importlib.util
import subprocess
import sys

packages = {"numpy": "numpy", "pandas": "pandas", "matplotlib": "matplotlib",
            "seaborn": "seaborn", "sklearn": "scikit-learn", "xgboost": "xgboost", "IPython": "ipython"}
missing = [package for module, package in packages.items()
           if importlib.util.find_spec(module) is None]
if missing:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", *missing])

import io
import json
import hashlib
import platform
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import sklearn
import xgboost
from IPython.display import display, Markdown
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.validation import check_X_y, check_array, check_is_fitted
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV, KFold
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.dummy import DummyClassifier, DummyRegressor
from sklearn.metrics import (accuracy_score, f1_score, precision_score, recall_score,
    classification_report, confusion_matrix, ConfusionMatrixDisplay,
    mean_absolute_error, mean_squared_error, r2_score)
from xgboost import XGBClassifier, XGBRegressor

SEED = 42
OUT = Path("results")
OUT.mkdir(exist_ok=True)
sns.set_theme(style="whitegrid", font="DejaVu Sans")
plt.rcParams.update({"figure.dpi": 120, "axes.spines.top": False, "axes.spines.right": False})
COLORS = ["#137C72", "#7956A5", "#D78B32", "#3D79AF"]
VERSIONS = {"python": platform.python_version(), "numpy": np.__version__,
            "pandas": pd.__version__, "scikit-learn": sklearn.__version__,
            "xgboost": xgboost.__version__}
print(VERSIONS)

# %%
DATA_URL = "https://raw.githubusercontent.com/allisonhorst/palmerpenguins/main/inst/extdata/penguins.csv"
local_csv = Path("penguins.csv")
if local_csv.exists():
    raw_bytes = local_csv.read_bytes()
else:
    import urllib.request
    raw_bytes = urllib.request.urlopen(DATA_URL, timeout=30).read()
    local_csv.write_bytes(raw_bytes)

df = pd.read_csv(io.BytesIO(raw_bytes))
DATA_SHA256 = hashlib.sha256(raw_bytes).hexdigest()
FEATURES = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
assert set(FEATURES + ["species"]).issubset(df.columns)
print("Бастапқы жол саны:", len(df), "| Баған саны:", df.shape[1])
print("CSV SHA256:", DATA_SHA256)
display(df.head())
display(df.isna().sum().rename("Бос мәндер").to_frame())
display(df["species"].value_counts().rename("Пингвин саны").to_frame())

# %%
clean = df.dropna(subset=FEATURES + ["species"]).copy()
print("Алынған жолдар:", len(df) - len(clean))
print("Қалған жолдар:", len(clean))
encoder = LabelEncoder()
y = encoder.fit_transform(clean["species"])
X = clean[FEATURES].copy()
CLASS_NAMES = encoder.classes_.tolist()

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=SEED, stratify=y
)
assert set(X_train.index).isdisjoint(X_test.index)
assert len(X_train) + len(X_test) == len(clean)
assert set(np.unique(y_train)) == set(np.unique(y_test)) == {0, 1, 2}

split_table = pd.DataFrame({
    "Барлығы": np.bincount(y, minlength=3),
    "Train": np.bincount(y_train, minlength=3),
    "Test": np.bincount(y_test, minlength=3)
}, index=CLASS_NAMES)
display(split_table)
print(f"Train: {len(X_train)}, Test: {len(X_test)}")

train_eda = X_train.assign(species=encoder.inverse_transform(y_train))
display(train_eda.groupby("species")[FEATURES].mean().round(2))
display(X_train.describe().round(2))

# %%
fig, axes = plt.subplots(1, 2, figsize=(12, 4.5))
sns.scatterplot(data=train_eda, x="bill_length_mm", y="bill_depth_mm",
                hue="species", palette=COLORS[:3], ax=axes[0])
axes[0].set(title="Тұмсық өлшемдері: train", xlabel="Ұзындық, мм", ylabel="Тереңдік, мм")
sns.boxplot(data=train_eda, x="species", y="flipper_length_mm", hue="species",
            palette=COLORS[:3], legend=False, ax=axes[1])
axes[1].set(title="Жүзбе қанат ұзындығы: train", xlabel="Пингвин түрі", ylabel="Ұзындық, мм")
fig.tight_layout()
fig.savefig(OUT / "01_penguins_features.png", bbox_inches="tight")
plt.show()

# %%
class OneHotTreeClassifier(ClassifierMixin, BaseEstimator):
    def __init__(self, max_depth=None, min_samples_leaf=1, random_state=42):
        self.max_depth = max_depth
        self.min_samples_leaf = min_samples_leaf
        self.random_state = random_state

    def fit(self, X, y):
        X_array, y_array = check_X_y(X, y)
        self.classes_, class_indices = np.unique(y_array, return_inverse=True)
        self.n_features_in_ = X_array.shape[1]
        one_hot = np.eye(len(self.classes_))[class_indices]
        self.regressor_ = DecisionTreeRegressor(
            criterion="squared_error", max_depth=self.max_depth,
            min_samples_leaf=self.min_samples_leaf, random_state=self.random_state
        )
        self.regressor_.fit(X_array, one_hot)
        return self

    def predict_proba(self, X):
        check_is_fitted(self, "regressor_")
        X_array = check_array(X)
        return self.regressor_.predict(X_array)

    def predict(self, X):
        return self.classes_[np.argmax(self.predict_proba(X), axis=1)]

# %%
tree_grid = {"max_depth": [2, 3, 4, None], "min_samples_leaf": [1, 2]}
model_specs = {
    "Decision Tree Classifier": (
        DecisionTreeClassifier(criterion="gini", random_state=SEED), tree_grid),
    "Random Forest": (
        RandomForestClassifier(random_state=SEED, n_jobs=1),
        {"n_estimators": [100, 300], "max_depth": [4, None], "min_samples_leaf": [1, 2]}),
    "XGBoost Classifier": (
        XGBClassifier(objective="multi:softprob", num_class=3,
                      eval_metric="mlogloss", tree_method="hist",
                      random_state=SEED, n_jobs=1),
        {"n_estimators": [100, 200], "max_depth": [2, 3], "learning_rate": [0.05, 0.1]}),
    "Decision Tree Regressor (one-hot)": (
        OneHotTreeClassifier(random_state=SEED), tree_grid)
}
cv = list(StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED).split(X_train, y_train))
searches = {}
cv_rows = []
for name, (estimator, params) in model_specs.items():
    search = GridSearchCV(estimator, params, cv=cv,
                          scoring={"accuracy": "accuracy", "f1_macro": "f1_macro"},
                          refit="accuracy", n_jobs=1, error_score="raise",
                          return_train_score=True)
    search.fit(X_train, y_train)
    searches[name] = search
    i = search.best_index_
    cv_rows.append({"Модель": name,
                    "CV Accuracy": search.best_score_,
                    "CV std": search.cv_results_["std_test_accuracy"][i],
                    "CV Macro-F1": search.cv_results_["mean_test_f1_macro"][i],
                    "Параметрлер": json.dumps(search.best_params_, ensure_ascii=False)})
    print(name, "| CV:", round(search.best_score_, 4), "|", search.best_params_)
cv_results = pd.DataFrame(cv_rows)
display(cv_results.round(4))
cv_winners = cv_results.loc[np.isclose(cv_results["CV Accuracy"], cv_results["CV Accuracy"].max()), "Модель"].tolist()
print("Тек train-CV бойынша таңдалған үздік модель(дер):", ", ".join(cv_winners))

# %%
baseline = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
baseline_accuracy = accuracy_score(y_test, baseline.predict(X_test))
print(f"Қарапайым baseline Accuracy: {baseline_accuracy:.2%}")

predictions, result_rows = {}, []
for name, search in searches.items():
    model = search.best_estimator_
    pred = model.predict(X_test)
    predictions[name] = pred
    result_rows.append({
        "Модель": name,
        "Train Accuracy (%)": 100 * accuracy_score(y_train, model.predict(X_train)),
        "CV Accuracy (%)": 100 * search.best_score_,
        "Test Accuracy (%)": 100 * accuracy_score(y_test, pred),
        "Macro-F1": f1_score(y_test, pred, average="macro", zero_division=0),
        "Дұрыс": int(np.sum(pred == y_test)),
        "Қате": int(np.sum(pred != y_test)),
        "Test саны": len(y_test)
    })
results = pd.DataFrame(result_rows).sort_values(
    ["Test Accuracy (%)", "Macro-F1"], ascending=False, kind="stable").reset_index(drop=True)
display(results.round(3))
results.to_csv(OUT / "classification_comparison.csv", index=False, encoding="utf-8-sig")
cv_results.to_csv(OUT / "cross_validation.csv", index=False, encoding="utf-8-sig")

best_accuracy = results["Test Accuracy (%)"].max()
test_winners = results.loc[np.isclose(results["Test Accuracy (%)"], best_accuracy), "Модель"].tolist()
print("Осы test бойынша ең жоғары Accuracy:", ", ".join(test_winners))
print(f"Дәлдік: {best_accuracy:.2f}%")
print("Тең Accuracy болса, барлық жеңімпаз бірге көрсетіледі.")

# %%
fig, ax = plt.subplots(figsize=(11, 5))
short_names = {"Decision Tree Classifier": "Decision Tree\nClassifier",
               "Random Forest": "Random Forest", "XGBoost Classifier": "XGBoost\nClassifier",
               "Decision Tree Regressor (one-hot)": "Decision Tree Regressor\n(one-hot + argmax)"}
xs = np.arange(len(results))
ax.bar(xs-0.19, results["CV Accuracy (%)"], width=0.38, label="Train ішіндегі CV", color="#B6D5CE")
bars = ax.bar(xs+0.19, results["Test Accuracy (%)"], width=0.38, label="Бөлек test", color=COLORS)
for bar, (_, row) in zip(bars, results.iterrows()):
    ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+1,
            f'{row["Test Accuracy (%)"]:.2f}%\n{row["Дұрыс"]}/{row["Test саны"]}',
            ha="center", va="bottom", fontsize=9)
ax.axhline(baseline_accuracy*100, color="#8B9697", linestyle="--", label="Dummy baseline")
ax.set(xticks=xs, xticklabels=[short_names[x] for x in results["Модель"]],
       ylim=(0, 110), yticks=np.arange(0, 101, 20), ylabel="Accuracy, %", title="Пингвин түрін болжау: төрт модель")
ax.legend(loc="lower right")
fig.tight_layout()
fig.savefig(OUT / "02_model_comparison.png", bbox_inches="tight")
plt.show()

# %%
fig, axes = plt.subplots(2, 2, figsize=(11, 9))
for (name, pred), ax in zip(predictions.items(), axes.flat):
    cm = confusion_matrix(y_test, pred, labels=[0, 1, 2])
    ConfusionMatrixDisplay(cm, display_labels=CLASS_NAMES).plot(
        ax=ax, cmap="GnBu", colorbar=False, values_format="d")
    ax.set(title=short_names[name].replace("\n", " "), xlabel="Болжам", ylabel="Нақты түр")
fig.tight_layout()
fig.savefig(OUT / "03_confusion_matrices.png", bbox_inches="tight")
plt.show()

for name, pred in predictions.items():
    print("\n" + name)
    print(classification_report(y_test, pred, labels=[0, 1, 2],
                                target_names=CLASS_NAMES, digits=3, zero_division=0))

prediction_table = X_test.copy()
prediction_table.insert(0, "CSV жолы (тақырыппен)", X_test.index+2)
prediction_table["Нақты түр"] = encoder.inverse_transform(y_test)
for name, pred in predictions.items():
    prediction_table[name] = encoder.inverse_transform(pred)
prediction_table["Кемінде бір модель қателесті"] = np.any(
    np.column_stack([p != y_test for p in predictions.values()]), axis=1)
display(prediction_table.head(10))
print("Кемінде бір модель қателескен үлгілер:")
display(prediction_table[prediction_table["Кемінде бір модель қателесті"]])
prediction_table.to_csv(OUT / "test_predictions.csv", index=False, encoding="utf-8-sig")

# %%
tree_model = searches["Decision Tree Classifier"].best_estimator_
root_feature = FEATURES[tree_model.tree_.feature[0]]
root_threshold = float(tree_model.tree_.threshold[0])
print(f"Түбір шарты: {root_feature} <= {root_threshold:.3f}")
print("Толық ағаш тереңдігі:", tree_model.get_depth())
fig, ax = plt.subplots(figsize=(15, 7))
plot_tree(tree_model, feature_names=FEATURES, class_names=CLASS_NAMES,
          filled=True, rounded=True, max_depth=3, fontsize=8, ax=ax)
ax.set_title("Decision Tree: алғашқы үш деңгей")
fig.tight_layout()
fig.savefig(OUT / "04_decision_tree.png", bbox_inches="tight")
plt.show()

depth_search = pd.DataFrame(searches["Decision Tree Classifier"].cv_results_)
depth_table = depth_search[["param_max_depth", "param_min_samples_leaf", "mean_train_accuracy", "mean_test_accuracy"]].copy()
depth_table.columns = ["max_depth", "min_samples_leaf", "Train fold Accuracy", "Validation fold Accuracy"]
display(depth_table.round(4))

rf = searches["Random Forest"].best_estimator_
importance = pd.Series(rf.feature_importances_, index=FEATURES).sort_values()
fig, ax = plt.subplots(figsize=(8, 4))
importance.plot.barh(ax=ax, color=COLORS[0])
ax.set(title="Random Forest: белгілердің маңыздылығы", xlabel="Impurity-based importance", ylabel="")
fig.tight_layout()
fig.savefig(OUT / "05_feature_importance.png", bbox_inches="tight")
plt.show()
print("Бұл маңыздылық осы модельге қатысты; себеп-салдар байланысын білдірмейді.")

# %%
new_penguin = pd.DataFrame([{
    "bill_length_mm": 45.0,
    "bill_depth_mm": 14.5,
    "flipper_length_mm": 215.0,
    "body_mass_g": 5000.0
}], columns=FEATURES)
display(new_penguin)
for name, search in searches.items():
    predicted_class = int(search.best_estimator_.predict(new_penguin)[0])
    print(f"{name}: {CLASS_NAMES[predicted_class]}")

# %%
REG_FEATURES = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm"]
RX_train, RX_test = clean.loc[X_train.index, REG_FEATURES], clean.loc[X_test.index, REG_FEATURES]
ry_train, ry_test = clean.loc[X_train.index, "body_mass_g"], clean.loc[X_test.index, "body_mass_g"]
reg_specs = {
    "Decision Tree Regressor": (DecisionTreeRegressor(random_state=SEED), tree_grid),
    "XGBoost Regressor": (XGBRegressor(objective="reg:squarederror", tree_method="hist",
                                      random_state=SEED, n_jobs=1),
                          {"max_depth": [2, 3], "n_estimators": [100, 200], "learning_rate": [0.05, 0.1]})
}
reg_cv = KFold(n_splits=5, shuffle=True, random_state=SEED)
reg_predictions, reg_rows = {}, []
for name, (model, grid) in reg_specs.items():
    search = GridSearchCV(model, grid, cv=reg_cv,
                          scoring="neg_root_mean_squared_error", n_jobs=1, error_score="raise")
    search.fit(RX_train, ry_train)
    pred = search.predict(RX_test)
    reg_predictions[name] = pred
    reg_rows.append({"Модель": name, "CV RMSE (г)": -search.best_score_,
                     "Test MAE (г)": mean_absolute_error(ry_test, pred),
                     "Test RMSE (г)": np.sqrt(mean_squared_error(ry_test, pred)),
                     "Test R²": r2_score(ry_test, pred),
                     "Параметрлер": json.dumps(search.best_params_, ensure_ascii=False)})
reg_results = pd.DataFrame(reg_rows).sort_values("Test RMSE (г)").reset_index(drop=True)
display(reg_results.round(3))
reg_results.to_csv(OUT / "regression_comparison.csv", index=False, encoding="utf-8-sig")
reg_dummy = DummyRegressor().fit(RX_train, ry_train)
print("Орташа массаны болжайтын baseline RMSE:",
      round(np.sqrt(mean_squared_error(ry_test, reg_dummy.predict(RX_test))), 2), "г")

fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
for (name, pred), ax, color in zip(reg_predictions.items(), axes, COLORS[:2]):
    ax.scatter(ry_test, pred, alpha=.75, color=color)
    limits = [min(ry_test.min(), pred.min())-100, max(ry_test.max(), pred.max())+100]
    ax.plot(limits, limits, "--", color="#788585", label="Мінсіз болжам")
    ax.set(title=name, xlabel="Нақты масса, г", ylabel="Болжанған масса, г", xlim=limits, ylim=limits)
    ax.legend()
fig.tight_layout()
fig.savefig(OUT / "06_regression_predictions.png", bbox_inches="tight")
plt.show()

# %%
top = results.iloc[0]
best_names = ", ".join(test_winners)
reg_top = reg_results.iloc[0]
summary = (
    f"**Пингвин түрін тану:** {best_names} осы тестте ең жоғары Accuracy көрсетті: "
    f"**{best_accuracy:.2f}%**, яғни {len(y_test)} пингвиннің **{int(top['Дұрыс'])}** түрін дұрыс тапты.\n\n"
    f"Train ішіндегі 5-fold CV бойынша үздік нәтиже: **{', '.join(cv_winners)}**. "
    "CV нәтижесі мен test нәтижесінің реті әртүрлі болуы мүмкін.\n\n"
    f"**Дене массасын болжау:** ең аз test RMSE көрсеткен модель — **{reg_top['Модель']}**. "
    f"MAE = **{reg_top['Test MAE (г)']:.2f} г**, RMSE = **{reg_top['Test RMSE (г)']:.2f} г**, "
    f"R² = **{reg_top['Test R²']:.3f}**.\n\n"
    "Бұл қорытынды тек осы белгілер, параметр торы және random_state=42 бөлінісіне қатысты. "
    "Test-те бірнеше модельді салыстыру зерттеу қорытындысын береді; келесі өндірістік таңдауды "
    "растау үшін жаңа тәуелсіз дерек қажет."
)
display(Markdown(summary))
(OUT / "conclusion_kk.txt").write_text(summary, encoding="utf-8")
manifest = {"source": DATA_URL, "sha256": DATA_SHA256, "versions": VERSIONS,
            "seed": SEED, "raw_rows": len(df), "usable_rows": len(clean),
            "train_rows": len(X_train), "test_rows": len(X_test),
            "features": FEATURES, "classes": CLASS_NAMES,
            "train_csv_indices": X_train.index.tolist(), "test_csv_indices": X_test.index.tolist(),
            "cv_winners": cv_winners, "test_winners": test_winners,
            "classification": results.to_dict(orient="records"),
            "regression": reg_results.to_dict(orient="records")}
(OUT / "experiment.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
assert all(row["Дұрыс"] + row["Қате"] == row["Test саны"] for row in result_rows)
assert all(len(pred) == len(y_test) for pred in predictions.values())
print("Барлық модель бірдей test үлгілерімен бағаланды. Нәтижелер results бумасына сақталды.")
