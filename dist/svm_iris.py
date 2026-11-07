# SVM LAB — Google Colab-та бір ұяшыққа көшіріп орындаңыз.
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# 1. Деректер: 150 гүл, 4 белгі, 3 класс.
iris = load_iris()
X, y = iris.data, iris.target
print('X:', X.shape, 'y:', y.shape)
print('Кластар:', iris.target_names)

# 2. Оқытуға 80%, соңғы тексеруге 20%.
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Масштабтау тек train деректерінен үйреніледі.
# Pipeline CV ішінде де деректердің ағып кетуін болдырмайды.
model = Pipeline([
    ('scale', StandardScaler()),
    ('svm', SVC(kernel='rbf', C=1, gamma='scale'))
])
model.fit(X_train, y_train)

# 4. Базалық модельдің болжамы және бағасы.
y_pred = model.predict(X_test)
print('Базалық test accuracy:', accuracy_score(y_test, y_pred))
print('Қателер матрицасы:\n', confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print('Әр кластағы тірек векторлары:', model.named_steps['svm'].n_support_)

# 5. Жаңа гүл: белгілердің реті Iris деректеріндегідей.
new_flower = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(new_flower)
print('Жаңа гүл:', iris.target_names[prediction[0]])

# 6. C мен gamma-ны тек train ішіндегі CV арқылы таңдаймыз.
param_grid = {
    'svm__C': [0.1, 1, 10, 100],
    'svm__gamma': [0.01, 0.1, 1, 10]
}
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
search = GridSearchCV(model, param_grid, cv=cv, scoring='accuracy')
search.fit(X_train, y_train)
print('Үздік параметрлер:', search.best_params_)
print('Орташа CV accuracy:', search.best_score_)

# Таңдау аяқталған соң ғана test арқылы қорытынды бағалаймыз.
best_model = search.best_estimator_
final_pred = best_model.predict(X_test)
print('Таңдалған модельдің test accuracy:', accuracy_score(y_test, final_pred))
# Бұл шағын test бөлігіне қатысты нәтиже, болашаққа кепілдік емес.
