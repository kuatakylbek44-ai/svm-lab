# Auto MPG — four regression models
# Author: Kuat Akylbek
# Run in the folder containing auto-mpg.data, or allow the official UCI download.

import importlib.util
import subprocess
import sys
packages = {"numpy":"numpy", "pandas":"pandas", "matplotlib":"matplotlib",
            "sklearn":"scikit-learn", "xgboost":"xgboost", "IPython":"ipython"}
missing = [pkg for module, pkg in packages.items() if importlib.util.find_spec(module) is None]
if missing:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", *missing])

import io, json, hashlib, platform, urllib.request
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn, xgboost
from IPython.display import display
from sklearn.base import clone
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, KFold, GridSearchCV
from sklearn.tree import DecisionTreeRegressor, plot_tree
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor

SEED = 42
SOURCE_URL = "https://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data"
SOURCE_FILE = Path("auto-mpg.data")
if not SOURCE_FILE.exists():
    SOURCE_FILE.write_bytes(urllib.request.urlopen(SOURCE_URL, timeout=30).read())
raw_bytes = SOURCE_FILE.read_bytes()
SOURCE_SHA256 = hashlib.sha256(raw_bytes).hexdigest()
COLUMNS = ["mpg", "cylinders", "displacement", "horsepower", "weight",
           "acceleration", "model_year", "origin", "car_name"]
df = pd.read_csv(io.BytesIO(raw_bytes), sep=r"\s+", names=COLUMNS, na_values="?")
FEATURES = ["cylinders", "displacement", "horsepower", "weight",
            "acceleration", "model_year", "origin"]
NUMERIC = FEATURES[:-1]
X, y = df[FEATURES], df["mpg"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=SEED)
assert len(df) == 398 and len(X_train) == 318 and len(X_test) == 80
assert df["horsepower"].isna().sum() == 6
assert set(X_train.index).isdisjoint(X_test.index)
assert y.notna().all()
# car_name — идентификатор: он не передаётся модели.
# Пропуски заполняются внутри Pipeline, отдельно в каждом обучающем fold.
preprocessor = ColumnTransformer([
    ("numeric", SimpleImputer(strategy="median"), NUMERIC),
    ("origin", OneHotEncoder(handle_unknown="ignore", sparse_output=False), ["origin"])
], verbose_feature_names_out=False)
def pipeline(estimator):
    return Pipeline([("prepare", clone(preprocessor)), ("model", estimator)])
def metrics(actual, predicted):
    return {"MAE": mean_absolute_error(actual, predicted),
            "RMSE": float(np.sqrt(mean_squared_error(actual, predicted))),
            "R2": r2_score(actual, predicted)}
VERSIONS = {"python":platform.python_version(), "numpy":np.__version__,
            "pandas":pd.__version__, "scikit-learn":sklearn.__version__,
            "xgboost":xgboost.__version__}
OUT = Path("results")
OUT.mkdir(exist_ok=True)
plt.rcParams.update({"figure.dpi":120, "font.family":"DejaVu Sans",
                     "axes.spines.top":False, "axes.spines.right":False})
COLORS = ["#247C64", "#8B70AF", "#BC8134", "#3C7DA6"]

print("Версии:", VERSIONS)
print("Источник:", SOURCE_URL)
print("SHA256:", SOURCE_SHA256)
print("Строки / столбцы:", df.shape)
print("Train:", len(X_train), "Test:", len(X_test))
print("Пропуски:", df.isna().sum().to_dict())
display(df.head(10))
df.to_csv("auto_mpg.csv", index=False, float_format="%.10g")
fig, ax = plt.subplots(figsize=(8, 4.5))
for color, origin, label in zip(COLORS, [1,2,3], ["USA", "Europe", "Japan"]):
    mask = X_train["origin"] == origin
    ax.scatter(X_train.loc[mask,"weight"], y_train.loc[mask],
               label=label, color=color, alpha=0.75, s=24)
ax.set(xlabel="Вес автомобиля, lb", ylabel="MPG — мили на галлон",
       title="318 обучающих автомобилей: вес и MPG")
ax.legend(title="Origin")
ax.grid(alpha=0.15)
fig.tight_layout()
fig.savefig(OUT / "01_training_data.png")
plt.show()


# %%
# Один и тот же список пяти folds используется для всех моделей.
cv = list(KFold(n_splits=5, shuffle=True, random_state=SEED).split(X_train))
specs = {
    "dt": ("Decision Tree", DecisionTreeRegressor(random_state=SEED),
           {"model__max_depth":[3,5,8,None], "model__min_samples_leaf":[1,4]}),
    "rf": ("Random Forest", RandomForestRegressor(random_state=SEED, n_jobs=1),
           {"model__n_estimators":[100,300], "model__max_depth":[None,8],
            "model__min_samples_leaf":[1,2]}),
    "gb": ("Gradient Boosting", GradientBoostingRegressor(random_state=SEED),
           {"model__n_estimators":[100,200], "model__max_depth":[2,3],
            "model__learning_rate":[0.05,0.1]}),
    "xgb": ("XGBoost", XGBRegressor(objective="reg:squarederror", tree_method="hist",
                                   random_state=SEED, n_jobs=1),
            {"model__n_estimators":[100,200], "model__max_depth":[2,3],
             "model__learning_rate":[0.05,0.1]})
}
searches = {}
cv_rows = []
for key, (name, estimator, grid) in specs.items():
    search = GridSearchCV(pipeline(estimator), grid, cv=cv,
                          scoring="neg_root_mean_squared_error", refit=True,
                          n_jobs=1, error_score="raise", return_train_score=True)
    search.fit(X_train, y_train)
    searches[key] = search
    i = search.best_index_
    cv_rows.append({"id":key, "Model":name, "CV RMSE":-search.best_score_,
                    "CV std":search.cv_results_["std_test_score"][i],
                    "Parameters":json.dumps(search.best_params_, ensure_ascii=False)})
    print(name, "CV RMSE =", round(-search.best_score_, 4), search.best_params_)
cv_table = pd.DataFrame(cv_rows)
cv_winner = cv_table.loc[cv_table["CV RMSE"].idxmin(), "id"]
print("Модель, выбранная только по train-CV:", specs[cv_winner][0])
display(cv_table)
cv_table.to_csv(OUT / "cross_validation.csv", index=False)


# %%
# После выбора параметров все модели один раз сравниваются на одинаковом test.
predictions = {}
result_rows = []
for key, search in searches.items():
    fitted = search.best_estimator_
    pred = fitted.predict(X_test)
    predictions[key] = pred
    score = metrics(y_test, pred)
    result_rows.append({"id":key, "Model":specs[key][0],
                        "Train RMSE":metrics(y_train, fitted.predict(X_train))["RMSE"],
                        "CV RMSE":-search.best_score_, **score})
results = pd.DataFrame(result_rows)
baseline = DummyRegressor(strategy="mean").fit(X_train, y_train)
baseline_pred = baseline.predict(X_test)
baseline_scores = metrics(y_test, baseline_pred)
print("Baseline — всегда среднее train:", baseline_scores)
display(results.round(4))
results.to_csv(OUT / "model_comparison.csv", index=False)
test_winner = results.loc[results["RMSE"].idxmin(), "id"]
print("Минимальный RMSE на этом test:", specs[test_winner][0])
test_table = df.loc[X_test.index].copy()
test_table.insert(0, "csv_row", X_test.index + 2)
for key, pred in predictions.items():
    test_table[f"{key}_predicted_mpg"] = pred
    test_table[f"{key}_absolute_error"] = np.abs(pred - y_test.to_numpy())
test_table.to_csv(OUT / "test_predictions.csv", index=False)
display(test_table.head(10))
# Все 80 отдельных прогнозов доступны в test_predictions.csv.


# %%
fig, ax = plt.subplots(figsize=(9, 4.5))
xs = np.arange(len(results))
ax.bar(xs-0.18, results["CV RMSE"], width=0.36, label="Train-CV RMSE", color="#A9C8A3")
bars = ax.bar(xs+0.18, results["RMSE"], width=0.36, label="Test RMSE", color=COLORS)
for bar, value in zip(bars, results["RMSE"]):
    ax.text(bar.get_x()+bar.get_width()/2, value+0.08, f"{value:.2f}", ha="center", fontsize=10)
ax.axhline(baseline_scores["RMSE"], ls="--", color="#899782", label="Dummy baseline")
ax.set(xticks=xs, xticklabels=results["Model"], ylabel="RMSE, MPG — меньше лучше",
       title="Auto MPG: четыре регрессионные модели")
ax.legend()
fig.tight_layout()
fig.savefig(OUT / "02_rmse_comparison.png")
plt.show()

fig, axes = plt.subplots(2, 2, figsize=(10, 8))
for (key, pred), ax, color in zip(predictions.items(), axes.flat, COLORS):
    ax.scatter(y_test, pred, color=color, s=24, alpha=0.75)
    ax.plot([8,48],[8,48], "--", color="#9AAB90")
    ax.set(title=specs[key][0], xlabel="Настоящий MPG", ylabel="Прогноз MPG", xlim=(8,48), ylim=(8,48))
    ax.grid(alpha=0.15)
fig.suptitle("80 test автомобилей: ближе к диагонали — меньше ошибка")
fig.tight_layout()
fig.savefig(OUT / "03_actual_vs_predicted.png")
plt.show()


# %%
tree_pipeline = searches["dt"].best_estimator_
tree_model = tree_pipeline.named_steps["model"]
transformed_names = tree_pipeline.named_steps["prepare"].get_feature_names_out().tolist()
fig, ax = plt.subplots(figsize=(16, 7))
plot_tree(tree_model, feature_names=transformed_names, max_depth=2,
          filled=True, rounded=True, fontsize=9, ax=ax)
ax.set_title("Decision Tree Regressor: верхние уровни дерева; value = MPG")
fig.tight_layout()
fig.savefig(OUT / "04_decision_tree.png")
plt.show()

forest = searches["rf"].best_estimator_.named_steps["model"]
importance = np.r_[forest.feature_importances_[:6], forest.feature_importances_[6:].sum()]
order = np.argsort(importance)
fig, ax = plt.subplots(figsize=(8, 4.5))
ax.barh(np.array(FEATURES)[order], importance[order], color="#247C64")
ax.set(title="Random Forest: важность признаков", xlabel="Уменьшение impurity (не причинное влияние)")
fig.tight_layout()
fig.savefig(OUT / "05_feature_importance.png")
plt.show()


# %%
STAGES = {}
STAGE_ROUNDS = {}
for key in ["gb", "xgb"]:
    fitted = searches[key].best_estimator_
    model = fitted.named_steps["model"]
    transformed = fitted.named_steps["prepare"].transform(X_test)
    rounds = [n for n in [1,5,10,25,50,100,200] if n <= model.n_estimators]
    if rounds[-1] != model.n_estimators:
        rounds.append(model.n_estimators)
    STAGE_ROUNDS[key] = rounds
    if key == "gb":
        all_stages = list(model.staged_predict(transformed))
        values = np.column_stack([all_stages[n-1] for n in rounds])
    else:
        values = np.column_stack([model.predict(transformed, iteration_range=(0,n)) for n in rounds])
    assert np.allclose(values[:,-1], predictions[key])
    STAGES[key] = values

sample_index = 0
fig, ax = plt.subplots(figsize=(8, 4.5))
for key, color in [("gb", COLORS[2]), ("xgb", COLORS[3])]:
    ax.plot(STAGE_ROUNDS[key], STAGES[key][sample_index], marker="o", color=color, label=specs[key][0])
ax.axhline(y_test.iloc[sample_index], ls="--", color="#506D4E", label="Настоящий MPG")
ax.set(title=f"Один автомобиль: {df.loc[X_test.index[sample_index], 'car_name']}",
       xlabel="Число boosting rounds", ylabel="Прогноз MPG")
ax.legend()
fig.tight_layout()
fig.savefig(OUT / "06_boosting_stages.png")
plt.show()

# Новый пример не использовался при выборе параметров; его реальный MPG неизвестен.
new_car = pd.DataFrame([[4, 120.0, 90.0, 2500.0, 15.0, 80, 3]], columns=FEATURES)
print("Новый автомобиль: прогноз MPG")
for key, search in searches.items():
    print(specs[key][0], round(float(search.best_estimator_.predict(new_car)[0]), 2))

winner_row = results.loc[results["id"] == test_winner].iloc[0]
conclusion = (f"По train-CV выбрана {specs[cv_winner][0]}. "
              f"Минимальный test RMSE у {specs[test_winner][0]}: {winner_row['RMSE']:.3f} MPG. "
              "Это результат конкретного разбиения 318/80, а не гарантия на будущих автомобилях. "
              "MPG — мили на галлон: больше MPG означает лучшую топливную экономичность. "
              "MAE и RMSE — ошибки в MPG; R² не является процентом правильных ответов.")
print(conclusion)
(OUT / "conclusion_ru.txt").write_text(conclusion, encoding="utf-8")

