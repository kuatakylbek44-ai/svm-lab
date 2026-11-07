# SVM LAB — скопируйте в одну ячейку Google Colab и выполните.
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# 1. Данные: 150 цветков, 4 признака, 3 класса.
iris = load_iris()
X, y = iris.data, iris.target
print('X:', X.shape, 'y:', y.shape)
print('Классы:', iris.target_names)

# 2. 80% для обучения, 20% для итогового теста.
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Масштабирование обучается только на train.
# Pipeline предотвращает утечку данных и внутри CV.
model = Pipeline([
    ('scale', StandardScaler()),
    ('svm', SVC(kernel='rbf', C=1, gamma='scale'))
])
model.fit(X_train, y_train)

# 4. Прогноз и оценка базовой модели.
y_pred = model.predict(X_test)
print('Базовая test accuracy:', accuracy_score(y_test, y_pred))
print('Матрица ошибок:\n', confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print('Опорные векторы каждого класса:', model.named_steps['svm'].n_support_)

# 5. Новый цветок: порядок признаков как в Iris.
new_flower = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(new_flower)
print('Новый цветок:', iris.target_names[prediction[0]])

# 6. Выбираем C и gamma только по CV внутри train.
param_grid = {
    'svm__C': [0.1, 1, 10, 100],
    'svm__gamma': [0.01, 0.1, 1, 10]
}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
search = GridSearchCV(model, param_grid, cv=cv, scoring='accuracy')
search.fit(X_train, y_train)
print('Лучшие параметры:', search.best_params_)
print('Средняя CV accuracy:', search.best_score_)

# Оцениваем на test только после завершения выбора.
best_model = search.best_estimator_
final_pred = best_model.predict(X_test)
print('Test accuracy выбранной модели:', accuracy_score(y_test, final_pred))
# Результат относится к этому небольшому тесту и не гарантирует будущее качество.
