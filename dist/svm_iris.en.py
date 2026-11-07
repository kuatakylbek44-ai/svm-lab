# SVM LAB — copy into one Google Colab cell and run.
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# 1. Data: 150 flowers, 4 features, 3 classes.
iris = load_iris()
X, y = iris.data, iris.target
print('X:', X.shape, 'y:', y.shape)
print('Classes:', iris.target_names)

# 2. Use 80% for training and 20% for the final test.
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Fit scaling on training data only.
# The Pipeline also prevents data leakage within CV.
model = Pipeline([
    ('scale', StandardScaler()),
    ('svm', SVC(kernel='rbf', C=1, gamma='scale'))
])
model.fit(X_train, y_train)

# 4. Predict and evaluate the baseline model.
y_pred = model.predict(X_test)
print('Baseline test accuracy:', accuracy_score(y_test, y_pred))
print('Confusion matrix:\n', confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print('Support vectors per class:', model.named_steps['svm'].n_support_)

# 5. A new flower: keep the Iris feature order.
new_flower = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(new_flower)
print('New flower:', iris.target_names[prediction[0]])

# 6. Select C and gamma with CV inside the training set only.
param_grid = {
    'svm__C': [0.1, 1, 10, 100],
    'svm__gamma': [0.01, 0.1, 1, 10]
}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
search = GridSearchCV(model, param_grid, cv=cv, scoring='accuracy')
search.fit(X_train, y_train)
print('Best parameters:', search.best_params_)
print('Mean CV accuracy:', search.best_score_)

# Evaluate on the test set only after selection is complete.
best_model = search.best_estimator_
final_pred = best_model.predict(X_test)
print('Selected model test accuracy:', accuracy_score(y_test, final_pred))
# This result applies to this small test set and does not guarantee future performance.
