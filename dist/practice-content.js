window.PRACTICE_CONTENT = {
  1: {
    kk: {
      minutes: 45,
      dataset: { name: "Google Colab · Python", detail: "Бұл жұмыс сыртқы датасетсіз орындалады: барлық мысалдар мен жаттығулар notebook ішінде.", meta: "Сыртқы файл қажет емес" },
      goals: ["Colab интерфейсін, notebook ұяшықтарын және орындау ретін түсіну.", "Python айнымалылары, тізімдер, жолдар, шарттар және циклдерді қолдану.", "Функция жазу және қарапайым график салу."],
      steps: ["Colab-ты ашып, notebook файлын жүктеңіз.", "Ұяшықтарды ретімен орындап, айнымалылардың кейінгі ұяшықтарда сақталуын тексеріңіз.", "relu, sum_of_squares және find_max функцияларын жазыңыз.", "Matplotlib-те relu және softplus функцияларының графигін салыңыз."],
      code: { title: "Python функциялары", note: "Функцияны анықтап, оны әртүрлі кіріс мәндерінде тексеріңіз.", source: `def relu(x):
    return max(0, x)

def sum_of_squares(numbers):
    total = 0
    for number in numbers:
        total += number ** 2
    return total

print(relu(-3), relu(5))
print(sum_of_squares([1, 2, 3, 4]))` },
      files: [{ label: "1-Google-Colab-Python.ipynb", href: "practice-files/1-Google-Colab-Python.ipynb", meta: "Jupyter Notebook · 38 KB" }],
      lab: "",
      note: "Ұяшықты өткізіп жіберсеңіз, кейінгі кодта NameError болуы мүмкін. Notebook-ты жоғарыдан төмен қарай орындаңыз."
    },
    ru: {
      minutes: 45,
      dataset: { name: "Google Colab · Python", detail: "Работа выполняется без внешнего датасета: все примеры и упражнения находятся внутри notebook.", meta: "Внешний файл не нужен" },
      goals: ["Разобраться в интерфейсе Colab, ячейках notebook и порядке выполнения.", "Применить переменные, списки, строки, условия и циклы Python.", "Написать функцию и построить простой график."],
      steps: ["Откройте Colab и загрузите notebook.", "Выполните ячейки по порядку и проверьте, что переменные доступны дальше.", "Напишите функции relu, sum_of_squares и find_max.", "Постройте графики relu и softplus в Matplotlib."],
      code: { title: "Функции Python", note: "Определите функцию и проверьте её на разных входных значениях.", source: `def relu(x):
    return max(0, x)

def sum_of_squares(numbers):
    total = 0
    for number in numbers:
        total += number ** 2
    return total

print(relu(-3), relu(5))
print(sum_of_squares([1, 2, 3, 4]))` },
      files: [{ label: "1-Google-Colab-Python.ipynb", href: "practice-files/1-Google-Colab-Python.ipynb", meta: "Jupyter Notebook · 38 KB" }],
      lab: "",
      note: "Если пропустить ячейку, следующий код может выдать NameError. Выполняйте notebook сверху вниз."
    },
    en: {
      minutes: 45,
      dataset: { name: "Google Colab · Python", detail: "No external dataset is required: every example and exercise lives inside the notebook.", meta: "No external file needed" },
      goals: ["Understand the Colab interface, notebook cells and execution order.", "Use Python variables, lists, strings, conditions and loops.", "Write a function and draw a simple plot."],
      steps: ["Open Colab and upload the notebook.", "Run the cells in order and check that variables persist across cells.", "Write relu, sum_of_squares and find_max functions.", "Plot relu and softplus with Matplotlib."],
      code: { title: "Python functions", note: "Define each function and test it with different inputs.", source: `def relu(x):
    return max(0, x)

def sum_of_squares(numbers):
    total = 0
    for number in numbers:
        total += number ** 2
    return total

print(relu(-3), relu(5))
print(sum_of_squares([1, 2, 3, 4]))` },
      files: [{ label: "1-Google-Colab-Python.ipynb", href: "practice-files/1-Google-Colab-Python.ipynb", meta: "Jupyter Notebook · 38 KB" }],
      lab: "",
      note: "Skipping a cell can cause a NameError later. Run the notebook from top to bottom."
    }
  },
  2: {
    kk: {
      minutes: 60,
      dataset: { name: "NumPy · Pandas · Scikit-learn", detail: "Notebook wine reviews CSV-ін қолданады, ал жергілікті жаттығулар fruits және animals DataFrame-терін құрады. CSV жолын өз ортаңызға сәйкес өзгертіңіз.", meta: "Notebook ішіндегі деректер" },
      goals: ["NumPy массивін құру, кесу, маскалау және векторлық амалдарды орындау.", "Pandas DataFrame/Series құрып, CSV файлын оқу.", "Scikit-learn сызықтық регрессиясын үйрету және Matplotlib-те нәтижені көру."],
      steps: ["NumPy массивін, shape және dtype мәндерін тексеріңіз.", "Кесу және Boolean маска арқылы элементтерді таңдаңыз.", "DataFrame құрып, CSV файлын оқыңыз.", "X және y бөліп, LinearRegression моделін үйретіңіз.", "Болжамды scatter графигінде көрсетіңіз."],
      code: { title: "DataFrame және регрессия", note: "Модельді train жиынында үйретіп, test жиынында болжам жасаңыз.", source: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3], [4]])
y = np.array([2.0, 4.1, 5.9, 8.2])

df = pd.DataFrame({"x": X.ravel(), "y": y})
model = LinearRegression().fit(df[["x"]], df["y"])
print(model.coef_, model.intercept_)
print(model.predict([[5]]))` },
      files: [{ label: "2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", href: "practice-files/2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", meta: "Jupyter Notebook · 388 KB" }],
      lab: "",
      note: "CSV файлының жолы әр ортада өзгереді. Colab-та файлды сол жақтағы Files панеліне жүктеңіз."
    },
    ru: {
      minutes: 60,
      dataset: { name: "NumPy · Pandas · Scikit-learn", detail: "Notebook использует CSV wine reviews, а локальные упражнения создают DataFrame fruits и animals. Путь к CSV зависит от вашей среды.", meta: "Данные внутри notebook" },
      goals: ["Создавать массивы NumPy, применять срезы, маски и векторные операции.", "Создавать DataFrame/Series Pandas и читать CSV.", "Обучать линейную регрессию Scikit-learn и видеть результат в Matplotlib."],
      steps: ["Проверьте массив NumPy, его shape и dtype.", "Выберите элементы через срезы и Boolean-маску.", "Создайте DataFrame и прочитайте CSV.", "Разделите X и y, обучите LinearRegression.", "Покажите прогноз на scatter-графике."],
      code: { title: "DataFrame и регрессия", note: "Обучайте модель на train и делайте прогноз на test.", source: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3], [4]])
y = np.array([2.0, 4.1, 5.9, 8.2])

df = pd.DataFrame({"x": X.ravel(), "y": y})
model = LinearRegression().fit(df[["x"]], df["y"])
print(model.coef_, model.intercept_)
print(model.predict([[5]]))` },
      files: [{ label: "2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", href: "practice-files/2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", meta: "Jupyter Notebook · 388 KB" }],
      lab: "",
      note: "Путь к CSV отличается в разных средах. В Colab загрузите файл через панель Files."
    },
    en: {
      minutes: 60,
      dataset: { name: "NumPy · Pandas · Scikit-learn", detail: "The notebook uses a wine reviews CSV, while the local exercises create fruits and animals DataFrames. Change the CSV path for your environment.", meta: "Data inside the notebook" },
      goals: ["Create NumPy arrays, use slicing, masks and vectorized operations.", "Build Pandas DataFrame/Series objects and read a CSV.", "Train a Scikit-learn linear regression and inspect it with Matplotlib."],
      steps: ["Inspect a NumPy array, its shape and dtype.", "Select elements with slicing and a Boolean mask.", "Create a DataFrame and read a CSV.", "Split X and y, then train LinearRegression.", "Show predictions on a scatter plot."],
      code: { title: "DataFrame and regression", note: "Fit on the train set and predict on the test set.", source: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

X = np.array([[1], [2], [3], [4]])
y = np.array([2.0, 4.1, 5.9, 8.2])

df = pd.DataFrame({"x": X.ravel(), "y": y})
model = LinearRegression().fit(df[["x"]], df["y"])
print(model.coef_, model.intercept_)
print(model.predict([[5]]))` },
      files: [{ label: "2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", href: "practice-files/2-NumPy-Pandas-Sklearn-Matplotlib.ipynb", meta: "Jupyter Notebook · 388 KB" }],
      lab: "",
      note: "CSV paths differ by environment. In Colab, upload the file through the Files panel."
    }
  },
  3: {
    kk: {
      minutes: 60,
      dataset: { name: "Seaborn: tips және penguins", detail: "Notebook Seaborn-ның кірістірілген tips және penguins жиындарын қолданады. Iris.csv бұл жұмысқа міндетті емес.", meta: "Кірістірілген деректер" },
      goals: ["Matplotlib-те line, scatter, bar және histogram графиктерін салу.", "Subplots арқылы бірнеше графикті бір фигураға біріктіру.", "Seaborn-ның relplot, displot, catplot және pairplot функцияларымен EDA жасау."],
      steps: ["tips деректерін жүктеп, info және describe шығарыңыз.", "total_bill және tip арасындағы байланысты scatter арқылы көрсетіңіз.", "total_bill үлестірімін histogram, күн бойынша салыстыруды boxplot арқылы көрсетіңіз.", "2×2 subplots ішінде негізгі EDA графиктерін біріктіріңіз.", "Әр графикке қорытынды жазыңыз."],
      code: { title: "Seaborn EDA", note: "Графиктің түрін таңдамас бұрын айнымалы типтерін анықтаңыз.", source: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")
tips = sns.load_dataset("tips")

sns.scatterplot(data=tips, x="total_bill", y="tip", hue="time")
plt.title("Total bill vs tip")
plt.show()

sns.boxplot(data=tips, x="day", y="total_bill")
plt.show()` },
      files: [{ label: "3-Matplotlib-Seaborn-EDA.ipynb", href: "practice-files/3-Matplotlib-Seaborn-EDA.ipynb", meta: "Jupyter Notebook · 2.0 MB" }],
      lab: "penguins.html",
      note: "Қорытындыны графиктен ғана емес, сандық көрсеткіштермен бірге жазыңыз."
    },
    ru: {
      minutes: 60,
      dataset: { name: "Seaborn: tips и penguins", detail: "Notebook использует встроенные наборы tips и penguins из Seaborn. Iris.csv для этой работы не обязателен.", meta: "Встроенные данные" },
      goals: ["Строить line, scatter, bar и histogram графики в Matplotlib.", "Объединять несколько графиков в одну фигуру через subplots.", "Выполнять EDA через relplot, displot, catplot и pairplot Seaborn."],
      steps: ["Загрузите tips и выведите info и describe.", "Покажите связь total_bill и tip на scatter-графике.", "Покажите распределение total_bill на histogram, а сравнение по дням — на boxplot.", "Соберите основные EDA-графики в сетку 2×2.", "Запишите вывод по каждому графику."],
      code: { title: "Seaborn EDA", note: "Сначала определите типы переменных, затем выбирайте тип графика.", source: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")
tips = sns.load_dataset("tips")

sns.scatterplot(data=tips, x="total_bill", y="tip", hue="time")
plt.title("Total bill vs tip")
plt.show()

sns.boxplot(data=tips, x="day", y="total_bill")
plt.show()` },
      files: [{ label: "3-Matplotlib-Seaborn-EDA.ipynb", href: "practice-files/3-Matplotlib-Seaborn-EDA.ipynb", meta: "Jupyter Notebook · 2.0 MB" }],
      lab: "penguins.html",
      note: "Записывайте вывод не только по графику, но и вместе с числовыми показателями."
    },
    en: {
      minutes: 60,
      dataset: { name: "Seaborn: tips and penguins", detail: "The notebook uses Seaborn's built-in tips and penguins datasets. Iris.csv is not required for this work.", meta: "Built-in datasets" },
      goals: ["Draw line, scatter, bar and histogram charts in Matplotlib.", "Combine several charts into one figure with subplots.", "Run EDA with Seaborn relplot, displot, catplot and pairplot."],
      steps: ["Load tips and print info and describe.", "Show the total_bill and tip relationship with a scatter plot.", "Show the total_bill distribution with a histogram and day comparison with a boxplot.", "Combine the main EDA charts into a 2×2 grid.", "Write a conclusion for each chart."],
      code: { title: "Seaborn EDA", note: "Identify variable types before choosing a chart type.", source: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")
tips = sns.load_dataset("tips")

sns.scatterplot(data=tips, x="total_bill", y="tip", hue="time")
plt.title("Total bill vs tip")
plt.show()

sns.boxplot(data=tips, x="day", y="total_bill")
plt.show()` },
      files: [{ label: "3-Matplotlib-Seaborn-EDA.ipynb", href: "practice-files/3-Matplotlib-Seaborn-EDA.ipynb", meta: "Jupyter Notebook · 2.0 MB" }],
      lab: "penguins.html",
      note: "Support each conclusion with numbers, not only with the shape of a chart."
    }
  },
  4: {
    kk: {
      minutes: 55,
      dataset: { name: "Синтетикалық HR-деректер", detail: "Notebook 15 жолдық синтетикалық деректерді генерациялайды: Age, Income, Experience, Education, City және Target. Сыртқы CSV қажет емес.", meta: "Notebook ішінде генерацияланады" },
      goals: ["Дубликаттарды табу және жою.", "IQR әдісімен шығыстарды анықтап, capping қолдану.", "StandardScaler және MinMaxScaler айырмашылығын салыстыру.", "ColumnTransformer және Pipeline арқылы толық preprocessing құру."],
      steps: ["Деректерді құрып, shape және head шығарыңыз.", "duplicated() арқылы дубликаттарды жою.", "Age және Income үшін Q1, Q3, IQR есептеп, шектен тыс мәндерді шектеңіз.", "Екі scaler нәтижесін салыстырыңыз.", "Сандық, ordinal және nominal бағандарды ColumnTransformer-ге біріктіріп, RandomForest моделін үйретіңіз."],
      code: { title: "Толық preprocessing pipeline", note: "Pipeline барлық қадамды бірге сақтайды, сондықтан test деректеріне де сол түрлендіру қолданылады.", source: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

numeric = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("num", numeric, ["Age", "Income", "Experience"]),
    ("cat", categorical, ["Education", "City"])
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(random_state=42))
])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))` },
      files: [{ label: "4-Missing-Values-Pipeline.ipynb", href: "practice-files/4-Missing-Values-Pipeline.ipynb", meta: "Jupyter Notebook · 54 KB" }],
      lab: "autompg.html",
      note: "Pipeline-ды train жиынында fit етіп, test жиынында тек predict немесе transform қолданыңыз."
    },
    ru: {
      minutes: 55,
      dataset: { name: "Синтетические HR-данные", detail: "Notebook генерирует 15 строк: Age, Income, Experience, Education, City и Target. Внешний CSV не нужен.", meta: "Генерируется в notebook" },
      goals: ["Находить и удалять дубликаты.", "Определять выбросы методом IQR и применять capping.", "Сравнивать StandardScaler и MinMaxScaler.", "Строить полный preprocessing через ColumnTransformer и Pipeline."],
      steps: ["Создайте данные и выведите shape и head.", "Удалите дубликаты через duplicated().", "Для Age и Income вычислите Q1, Q3, IQR и ограничьте выбросы.", "Сравните результаты двух scaler.", "Объедините числовые, ordinal и nominal признаки в ColumnTransformer и обучите RandomForest."],
      code: { title: "Полный preprocessing pipeline", note: "Pipeline сохраняет все шаги вместе, поэтому те же преобразования применяются к test.", source: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

numeric = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("num", numeric, ["Age", "Income", "Experience"]),
    ("cat", categorical, ["Education", "City"])
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(random_state=42))
])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))` },
      files: [{ label: "4-Missing-Values-Pipeline.ipynb", href: "practice-files/4-Missing-Values-Pipeline.ipynb", meta: "Jupyter Notebook · 54 KB" }],
      lab: "autompg.html",
      note: "Делайте fit Pipeline только на train, а на test вызывайте predict или transform."
    },
    en: {
      minutes: 55,
      dataset: { name: "Synthetic HR data", detail: "The notebook generates 15 rows: Age, Income, Experience, Education, City and Target. No external CSV is needed.", meta: "Generated inside the notebook" },
      goals: ["Find and remove duplicates.", "Detect outliers with IQR and apply capping.", "Compare StandardScaler and MinMaxScaler.", "Build a complete preprocessing flow with ColumnTransformer and Pipeline."],
      steps: ["Create the data and print shape and head.", "Remove duplicates with duplicated().", "Compute Q1, Q3 and IQR for Age and Income, then cap outliers.", "Compare the two scaler results.", "Combine numeric, ordinal and nominal features in ColumnTransformer and train RandomForest."],
      code: { title: "Full preprocessing pipeline", note: "A Pipeline keeps every step together, so the same transformations are applied to test data.", source: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

numeric = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("num", numeric, ["Age", "Income", "Experience"]),
    ("cat", categorical, ["Education", "City"])
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(random_state=42))
])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))` },
      files: [{ label: "4-Missing-Values-Pipeline.ipynb", href: "practice-files/4-Missing-Values-Pipeline.ipynb", meta: "Jupyter Notebook · 54 KB" }],
      lab: "autompg.html",
      note: "Fit the Pipeline on train only; use predict or transform on test."
    }
  },
  5: {
    kk: {
      minutes: 55,
      dataset: { name: "ex1data1.txt", detail: "Қала халқы мен кәсіпорын пайдасы: екі баған, шамамен 97 жол. Бірінші баған x, екіншісі y.", meta: "TXT · 1.4 KB" },
      goals: ["Бір айнымалысы бар сызықтық регрессияны құру.", "Train/test бөлу және MSE арқылы қатені бағалау.", "Полиномдық белгі қосып, модельді салыстыру."],
      steps: ["ex1data1.txt файлын names=['x', 'y'] арқылы оқыңыз.", "Деректерді 75/25 пропорциясында бөліңіз.", "LinearRegression моделін үйретіп, болжам жасаңыз.", "Train және test MSE мәндерін есептеңіз.", "x² белгісін қосып, полиномдық модельмен салыстырыңыз."],
      code: { title: "Сызықтық регрессия және MSE", note: "Бірінші модельді қарапайым күйінде бағалап, содан кейін күрделендіріңіз.", source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

df = pd.read_csv("ex1data1.txt", names=["x", "y"])
X_train, X_test, y_train, y_test = train_test_split(
    df[["x"]], df["y"], test_size=0.25, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, pred))
print("coef:", model.coef_, "intercept:", model.intercept_)` },
      files: [{ label: "5-Linear-Regression.ipynb", href: "practice-files/5-Linear-Regression.ipynb", meta: "Jupyter Notebook · 244 KB" }, { label: "ex1data1.txt", href: "practice-files/ex1data1.txt", meta: "Деректер · 1.4 KB" }],
      lab: "autompg.html",
      note: "Полиномдық модель train-де жақсы нәтиже беріп, test-те нашарлауы мүмкін. Бұл — артық оқу белгісі."
    },
    ru: {
      minutes: 55,
      dataset: { name: "ex1data1.txt", detail: "Население города и прибыль предприятия: два столбца, около 97 строк. Первый столбец — x, второй — y.", meta: "TXT · 1.4 KB" },
      goals: ["Построить линейную регрессию с одной переменной.", "Разделить train/test и оценить ошибку через MSE.", "Добавить полиномиальный признак и сравнить модели."],
      steps: ["Прочитайте ex1data1.txt с names=['x', 'y'].", "Разделите данные в пропорции 75/25.", "Обучите LinearRegression и сделайте прогноз.", "Вычислите MSE на train и test.", "Добавьте признак x² и сравните с полиномиальной моделью."],
      code: { title: "Линейная регрессия и MSE", note: "Сначала оцените простую модель, затем усложняйте её.", source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

df = pd.read_csv("ex1data1.txt", names=["x", "y"])
X_train, X_test, y_train, y_test = train_test_split(
    df[["x"]], df["y"], test_size=0.25, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, pred))
print("coef:", model.coef_, "intercept:", model.intercept_)` },
      files: [{ label: "5-Linear-Regression.ipynb", href: "practice-files/5-Linear-Regression.ipynb", meta: "Jupyter Notebook · 244 KB" }, { label: "ex1data1.txt", href: "practice-files/ex1data1.txt", meta: "Данные · 1.4 KB" }],
      lab: "autompg.html",
      note: "Полиномиальная модель может улучшить train и ухудшить test. Это признак переобучения."
    },
    en: {
      minutes: 55,
      dataset: { name: "ex1data1.txt", detail: "City population and company profit: two columns, about 97 rows. The first column is x, the second is y.", meta: "TXT · 1.4 KB" },
      goals: ["Build a single-variable linear regression.", "Split train/test and measure error with MSE.", "Add a polynomial feature and compare models."],
      steps: ["Read ex1data1.txt with names=['x', 'y'].", "Split the data 75/25.", "Train LinearRegression and make predictions.", "Compute train and test MSE.", "Add an x² feature and compare it with the polynomial model."],
      code: { title: "Linear regression and MSE", note: "Evaluate the simple model first, then increase complexity.", source: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

df = pd.read_csv("ex1data1.txt", names=["x", "y"])
X_train, X_test, y_train, y_test = train_test_split(
    df[["x"]], df["y"], test_size=0.25, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, pred))
print("coef:", model.coef_, "intercept:", model.intercept_)` },
      files: [{ label: "5-Linear-Regression.ipynb", href: "practice-files/5-Linear-Regression.ipynb", meta: "Jupyter Notebook · 244 KB" }, { label: "ex1data1.txt", href: "practice-files/ex1data1.txt", meta: "Data · 1.4 KB" }],
      lab: "autompg.html",
      note: "A polynomial model can improve train and worsen test. That is a sign of overfitting."
    }
  },
  6: {
    kk: {
      minutes: 60,
      dataset: { name: "Breast Cancer Wisconsin", detail: "Scikit-learn-тың кірістірілген breast_cancer жиыны: 569 үлгі, 30 сандық белгі, 2 класс.", meta: "Scikit-learn кірістірілген деректері" },
      goals: ["Логистикалық регрессияның сигмоида негізін түсіну.", "Бинарлық классификацияда scaling қолдану.", "Confusion matrix, precision, recall, F1 және ROC-AUC есептеу."],
      steps: ["load_breast_cancer() арқылы деректерді жүктеңіз.", "DataFrame құрып, белгілер мен target-ті анықтаңыз.", "75/25 пропорциясында train/test бөліңіз.", "StandardScaler-ді train-де fit етіп, екі жиынды түрлендіріңіз.", "LogisticRegression(max_iter=1000) үйретіп, метрикаларды есептеңіз."],
      code: { title: "Логистикалық регрессия метрикалары", note: "Метрикаларды бір-бірімен салыстырып, әрқайсысының мағынасын түсіндіріңіз.", source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=29, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=1000).fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]
print(classification_report(y_test, pred))
print("ROC-AUC:", roc_auc_score(y_test, proba))` },
      files: [{ label: "6-Logistic-Regression-Sklearn.ipynb", href: "practice-files/6-Logistic-Regression-Sklearn.ipynb", meta: "Jupyter Notebook · 118 KB" }],
      lab: "iris-model.html#1",
      note: "Тек accuracy-ге сүйенбеңіз: кластар теңгерімсіз болса, precision, recall және F1 маңыздырақ."
    },
    ru: {
      minutes: 60,
      dataset: { name: "Breast Cancer Wisconsin", detail: "Встроенный набор breast_cancer из Scikit-learn: 569 образцов, 30 числовых признаков, 2 класса.", meta: "Встроенные данные Scikit-learn" },
      goals: ["Понять сигмоиду в основе логистической регрессии.", "Применить scaling в бинарной классификации.", "Вычислить confusion matrix, precision, recall, F1 и ROC-AUC."],
      steps: ["Загрузите данные через load_breast_cancer().", "Создайте DataFrame и определите признаки и target.", "Разделите train/test в пропорции 75/25.", "Обучите StandardScaler на train и преобразуйте оба набора.", "Обучите LogisticRegression(max_iter=1000) и вычислите метрики."],
      code: { title: "Метрики логистической регрессии", note: "Сравните метрики между собой и объясните смысл каждой.", source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=29, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=1000).fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]
print(classification_report(y_test, pred))
print("ROC-AUC:", roc_auc_score(y_test, proba))` },
      files: [{ label: "6-Logistic-Regression-Sklearn.ipynb", href: "practice-files/6-Logistic-Regression-Sklearn.ipynb", meta: "Jupyter Notebook · 118 KB" }],
      lab: "iris-model.html#1",
      note: "Не ограничивайтесь accuracy: при дисбалансе классов precision, recall и F1 важнее."
    },
    en: {
      minutes: 60,
      dataset: { name: "Breast Cancer Wisconsin", detail: "Scikit-learn's built-in breast_cancer set: 569 samples, 30 numeric features, 2 classes.", meta: "Built-in Scikit-learn data" },
      goals: ["Understand the sigmoid behind logistic regression.", "Apply scaling in binary classification.", "Compute confusion matrix, precision, recall, F1 and ROC-AUC."],
      steps: ["Load the data with load_breast_cancer().", "Create a DataFrame and define features and target.", "Split train/test 75/25.", "Fit StandardScaler on train and transform both sets.", "Train LogisticRegression(max_iter=1000) and compute metrics."],
      code: { title: "Logistic regression metrics", note: "Compare the metrics and explain what each one means.", source: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=29, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(max_iter=1000).fit(X_train, y_train)
pred = model.predict(X_test)
proba = model.predict_proba(X_test)[:, 1]
print(classification_report(y_test, pred))
print("ROC-AUC:", roc_auc_score(y_test, proba))` },
      files: [{ label: "6-Logistic-Regression-Sklearn.ipynb", href: "practice-files/6-Logistic-Regression-Sklearn.ipynb", meta: "Jupyter Notebook · 118 KB" }],
      lab: "iris-model.html#1",
      note: "Do not rely on accuracy alone: with class imbalance, precision, recall and F1 matter more."
    }
  },
  7: {
    kk: {
      minutes: 65,
      dataset: { name: "Iris.csv", detail: "150 үлгі, 4 сандық белгі және 3 класс. Файл practice-files ішінде берілген.", meta: "CSV · 5 KB" },
      goals: ["KNN классификаторын үйрету және бағалау.", "Кросс-валидация арқылы оңтайлы k мәнін таңдау.", "Accuracy, precision, recall, F1, ROC-AUC және confusion matrix түсіндіру.", "Шешім шекарасын визуализациялау."],
      steps: ["Iris.csv оқып, соңғы бағанды target етіп бөліңіз.", "LabelEncoder арқылы кластарды санға айналдырыңыз.", "70/30 train/test бөліп, StandardScaler қолданыңыз.", "KNeighborsClassifier үшін cross_val_score арқылы k таңдаңыз.", "Ең жақсы k бойынша модельді үйретіп, метрикаларды шығарыңыз.", "Екі белгі бойынша шешім шекарасын салыңыз."],
      code: { title: "KNN және кросс-валидация", note: "k мәнін тек train жиынында таңдап, test-ті соңында бағалаңыз.", source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

iris = pd.read_csv("Iris.csv")
X = iris.iloc[:, :-1]
y = LabelEncoder().fit_transform(iris.iloc[:, -1])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

for k in [3, 5, 7, 9]:
    scores = cross_val_score(KNeighborsClassifier(n_neighbors=k), X_train, y_train, cv=5)
    print(k, round(scores.mean(), 3))

model = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))` },
      files: [{ label: "7-Model-Evaluation.ipynb", href: "practice-files/7-Model-Evaluation.ipynb", meta: "Jupyter Notebook · 367 KB" }, { label: "Iris.csv", href: "practice-files/Iris.csv", meta: "Деректер · 5 KB" }],
      lab: "iris-model.html#6",
      note: "k мәнін тақ сандармен салыстырыңыз. Тым кіші k шуға, тым үлкен k шекараны бұрмалауға әкелуі мүмкін."
    },
    ru: {
      minutes: 65,
      dataset: { name: "Iris.csv", detail: "150 образцов, 4 числовых признака и 3 класса. Файл находится в practice-files.", meta: "CSV · 5 KB" },
      goals: ["Обучить и оценить классификатор KNN.", "Выбрать оптимальное k через кросс-валидацию.", "Объяснить accuracy, precision, recall, F1, ROC-AUC и confusion matrix.", "Визуализировать границу решения."],
      steps: ["Прочитайте Iris.csv и отделите последний столбец как target.", "Закодируйте классы через LabelEncoder.", "Разделите 70/30 и примените StandardScaler.", "Выберите k для KNeighborsClassifier через cross_val_score.", "Обучите модель с лучшим k и выведите метрики.", "Постройте границу решения по двум признакам."],
      code: { title: "KNN и кросс-валидация", note: "Выбирайте k только на train, а test оценивайте в конце.", source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

iris = pd.read_csv("Iris.csv")
X = iris.iloc[:, :-1]
y = LabelEncoder().fit_transform(iris.iloc[:, -1])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

for k in [3, 5, 7, 9]:
    scores = cross_val_score(KNeighborsClassifier(n_neighbors=k), X_train, y_train, cv=5)
    print(k, round(scores.mean(), 3))

model = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))` },
      files: [{ label: "7-Model-Evaluation.ipynb", href: "practice-files/7-Model-Evaluation.ipynb", meta: "Jupyter Notebook · 367 KB" }, { label: "Iris.csv", href: "practice-files/Iris.csv", meta: "Данные · 5 KB" }],
      lab: "iris-model.html#6",
      note: "Сравнивайте нечётные k. Слишком маленькое k чувствительно к шуму, слишком большое искажает границу."
    },
    en: {
      minutes: 65,
      dataset: { name: "Iris.csv", detail: "150 samples, 4 numeric features and 3 classes. The file is provided in practice-files.", meta: "CSV · 5 KB" },
      goals: ["Train and evaluate a KNN classifier.", "Choose the optimal k with cross-validation.", "Explain accuracy, precision, recall, F1, ROC-AUC and the confusion matrix.", "Visualize the decision boundary."],
      steps: ["Read Iris.csv and use the last column as the target.", "Encode the classes with LabelEncoder.", "Split 70/30 and apply StandardScaler.", "Choose k for KNeighborsClassifier with cross_val_score.", "Train with the best k and print the metrics.", "Plot the decision boundary using two features."],
      code: { title: "KNN and cross-validation", note: "Choose k on train only and evaluate test at the end.", source: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

iris = pd.read_csv("Iris.csv")
X = iris.iloc[:, :-1]
y = LabelEncoder().fit_transform(iris.iloc[:, -1])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

for k in [3, 5, 7, 9]:
    scores = cross_val_score(KNeighborsClassifier(n_neighbors=k), X_train, y_train, cv=5)
    print(k, round(scores.mean(), 3))

model = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))` },
      files: [{ label: "7-Model-Evaluation.ipynb", href: "practice-files/7-Model-Evaluation.ipynb", meta: "Jupyter Notebook · 367 KB" }, { label: "Iris.csv", href: "practice-files/Iris.csv", meta: "Data · 5 KB" }],
      lab: "iris-model.html#6",
      note: "Compare odd k values. A very small k is sensitive to noise; a very large k blurs the boundary."
    }
  },
  8: {
    kk: {
      minutes: 65,
      dataset: { name: "Breast Cancer · make_circles · loan_data", detail: "Негізгі бөлім breast_cancer және make_circles қолданады. Қосымша тапсырмада loan_data.csv — несие өтінімдері.", meta: "Scikit-learn + CSV · 18 KB" },
      goals: ["Сызықтық SVM және margin ұғымын түсіну.", "RBF ядросымен сызықтық емес шекара құру.", "C және gamma параметрлерінің әсерін салыстыру.", "Несие деректерінде SVM моделін құру."],
      steps: ["breast_cancer-тің алғашқы екі белгісімен сызықтық SVM үйретіңіз.", "make_circles арқылы сызықтық емес деректер жасаңыз.", "SVC(kernel='rbf', C=1, gamma=0.5) моделін үйретіңіз.", "C және gamma мәндерін өзгертіп, шешім шекарасын салыстырыңыз.", "loan_data.csv бойынша EDA, scaling және SVC модельдерін орындаңыз."],
      code: { title: "Сызықтық және RBF SVM", note: "C үлкейгенде модель қателерге қаттырақ жазалайды; gamma шекараның иілуін басқарады.", source: `from sklearn.svm import SVC
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = make_circles(n_samples=500, factor=0.5, noise=0.05, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

model = SVC(kernel="rbf", C=1, gamma=0.5).fit(X_train, y_train)
pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))` },
      files: [{ label: "8-SVM.ipynb", href: "practice-files/8-SVM.ipynb", meta: "Jupyter Notebook · 789 KB" }, { label: "loan_data.csv", href: "practice-files/loan_data.csv", meta: "Қосымша деректер · 18 KB" }],
      lab: "svm.html",
      note: "C үлкейсе margin тарылады және артық оқу қаупі артады. gamma үлкейсе шешім шекарасы жергілікті болады."
    },
    ru: {
      minutes: 65,
      dataset: { name: "Breast Cancer · make_circles · loan_data", detail: "Основная часть использует breast_cancer и make_circles. В дополнительном задании loan_data.csv — кредитные заявки.", meta: "Scikit-learn + CSV · 18 KB" },
      goals: ["Понять линейный SVM и margin.", "Построить нелинейную границу с RBF-ядром.", "Сравнить влияние параметров C и gamma.", "Построить SVM на кредитных данных."],
      steps: ["Обучите линейный SVM на первых двух признаках breast_cancer.", "Создайте нелинейные данные через make_circles.", "Обучите SVC(kernel='rbf', C=1, gamma=0.5).", "Меняйте C и gamma и сравнивайте границы решения.", "Выполните EDA, scaling и SVC на loan_data.csv."],
      code: { title: "Линейный и RBF SVM", note: "С ростом C модель сильнее штрафует ошибки; gamma управляет изгибом границы.", source: `from sklearn.svm import SVC
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = make_circles(n_samples=500, factor=0.5, noise=0.05, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

model = SVC(kernel="rbf", C=1, gamma=0.5).fit(X_train, y_train)
pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))` },
      files: [{ label: "8-SVM.ipynb", href: "practice-files/8-SVM.ipynb", meta: "Jupyter Notebook · 789 KB" }, { label: "loan_data.csv", href: "practice-files/loan_data.csv", meta: "Доп. данные · 18 KB" }],
      lab: "svm.html",
      note: "С ростом C margin сужается и растёт риск переобучения. С ростом gamma граница становится более локальной."
    },
    en: {
      minutes: 65,
      dataset: { name: "Breast Cancer · make_circles · loan_data", detail: "The main part uses breast_cancer and make_circles. The extra task uses loan_data.csv — loan applications.", meta: "Scikit-learn + CSV · 18 KB" },
      goals: ["Understand linear SVM and the margin.", "Build a nonlinear boundary with the RBF kernel.", "Compare the effect of C and gamma.", "Build an SVM model on loan data."],
      steps: ["Train a linear SVM on the first two breast_cancer features.", "Create nonlinear data with make_circles.", "Train SVC(kernel='rbf', C=1, gamma=0.5).", "Change C and gamma and compare decision boundaries.", "Run EDA, scaling and SVC on loan_data.csv."],
      code: { title: "Linear and RBF SVM", note: "A larger C penalizes errors more; gamma controls how sharply the boundary bends.", source: `from sklearn.svm import SVC
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = make_circles(n_samples=500, factor=0.5, noise=0.05, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

model = SVC(kernel="rbf", C=1, gamma=0.5).fit(X_train, y_train)
pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))` },
      files: [{ label: "8-SVM.ipynb", href: "practice-files/8-SVM.ipynb", meta: "Jupyter Notebook · 789 KB" }, { label: "loan_data.csv", href: "practice-files/loan_data.csv", meta: "Extra data · 18 KB" }],
      lab: "svm.html",
      note: "A larger C narrows the margin and raises overfitting risk. A larger gamma makes the boundary more local."
    }
  },
  9: {
    kk: {
      minutes: 75,
      dataset: { name: "Iris · synthetic_text_data · train.csv", detail: "Iris ағаш модельдеріне, synthetic_text_data.csv Naive Bayes-ке, train.csv XGBoost сатылым болжамына қолданылады.", meta: "CSV · 2.1 MB" },
      goals: ["Decision Tree-тің Gini бөлінуін түсіну.", "Random Forest ансамблін құрып, feature importance шығару.", "Naive Bayes-ті мәтіндік деректерде қолдану.", "XGBoost-ты сатылым болжамында үйрету."],
      steps: ["Iris деректерінде DecisionTreeClassifier үйретіп, ағашты көрсетіңіз.", "max_depth мәндерін салыстырып, артық оқуды тексеріңіз.", "RandomForestClassifier үйретіп, feature_importances_ шығарыңыз.", "synthetic_text_data.csv үшін CountVectorizer/TfidfVectorizer және MultinomialNB қолданыңыз.", "train.csv үшін XGBRegressor немесе XGBClassifier үйретіп, MAE/RMSE немесе accuracy есептеңіз."],
      code: { title: "Random Forest және XGBoost", note: "Ағаш модельдерінде max_depth, n_estimators және learning_rate негізгі реттелетін параметрлер.", source: `from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBRegressor

forest = RandomForestClassifier(n_estimators=200, max_depth=5, random_state=42)
forest.fit(X_train, y_train)
print(forest.feature_importances_)

xgb = XGBRegressor(n_estimators=300, learning_rate=0.05, max_depth=4)
xgb.fit(X_train, y_train)
print(xgb.predict(X_test)[:5])` },
      files: [
        { label: "9-Decision-Tree-Classification.ipynb", href: "practice-files/9-Decision-Tree-Classification.ipynb", meta: "Notebook · 1.0 MB" },
        { label: "9-Random-Forest.ipynb", href: "practice-files/9-Random-Forest.ipynb", meta: "Notebook · 1.8 MB" },
        { label: "9-XGBoost.ipynb", href: "practice-files/9-XGBoost.ipynb", meta: "Notebook · 236 KB" },
        { label: "9-Naive-Bayes.ipynb", href: "practice-files/9-Naive-Bayes.ipynb", meta: "Notebook · 215 KB" },
        { label: "synthetic_text_data.csv", href: "practice-files/synthetic_text_data.csv", meta: "Мәтіндік деректер · 8 KB" },
        { label: "train.csv", href: "practice-files/train.csv", meta: "Сатылым деректері · 2.1 MB" }
      ],
      lab: "penguins.html",
      note: "Ағаштар жақсы интерпретацияланады, бірақ артық оқуға бейім. max_depth және min_samples_leaf арқылы шектеңіз."
    },
    ru: {
      minutes: 75,
      dataset: { name: "Iris · synthetic_text_data · train.csv", detail: "Iris используется для деревьев, synthetic_text_data.csv — для Naive Bayes, train.csv — для прогноза продаж XGBoost.", meta: "CSV · 2.1 MB" },
      goals: ["Понять разбиение Gini в Decision Tree.", "Построить Random Forest и вывести feature importance.", "Применить Naive Bayes к текстовым данным.", "Обучить XGBoost для прогноза продаж."],
      steps: ["Обучите DecisionTreeClassifier на Iris и покажите дерево.", "Сравните max_depth и проверьте переобучение.", "Обучите RandomForestClassifier и выведите feature_importances_.", "Для synthetic_text_data.csv используйте CountVectorizer/TfidfVectorizer и MultinomialNB.", "Для train.csv обучите XGBRegressor или XGBClassifier и посчитайте MAE/RMSE или accuracy."],
      code: { title: "Random Forest и XGBoost", note: "В древовидных моделях основные параметры — max_depth, n_estimators и learning_rate.", source: `from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBRegressor

forest = RandomForestClassifier(n_estimators=200, max_depth=5, random_state=42)
forest.fit(X_train, y_train)
print(forest.feature_importances_)

xgb = XGBRegressor(n_estimators=300, learning_rate=0.05, max_depth=4)
xgb.fit(X_train, y_train)
print(xgb.predict(X_test)[:5])` },
      files: [
        { label: "9-Decision-Tree-Classification.ipynb", href: "practice-files/9-Decision-Tree-Classification.ipynb", meta: "Notebook · 1.0 MB" },
        { label: "9-Random-Forest.ipynb", href: "practice-files/9-Random-Forest.ipynb", meta: "Notebook · 1.8 MB" },
        { label: "9-XGBoost.ipynb", href: "practice-files/9-XGBoost.ipynb", meta: "Notebook · 236 KB" },
        { label: "9-Naive-Bayes.ipynb", href: "practice-files/9-Naive-Bayes.ipynb", meta: "Notebook · 215 KB" },
        { label: "synthetic_text_data.csv", href: "practice-files/synthetic_text_data.csv", meta: "Текстовые данные · 8 KB" },
        { label: "train.csv", href: "practice-files/train.csv", meta: "Данные продаж · 2.1 MB" }
      ],
      lab: "penguins.html",
      note: "Деревья хорошо интерпретируются, но склонны к переобучению. Ограничивайте max_depth и min_samples_leaf."
    },
    en: {
      minutes: 75,
      dataset: { name: "Iris · synthetic_text_data · train.csv", detail: "Iris is used for tree models, synthetic_text_data.csv for Naive Bayes, and train.csv for XGBoost sales forecasting.", meta: "CSV · 2.1 MB" },
      goals: ["Understand Gini splits in a Decision Tree.", "Build a Random Forest and inspect feature importance.", "Apply Naive Bayes to text data.", "Train XGBoost for sales forecasting."],
      steps: ["Train DecisionTreeClassifier on Iris and display the tree.", "Compare max_depth values and check overfitting.", "Train RandomForestClassifier and print feature_importances_.", "For synthetic_text_data.csv, use CountVectorizer/TfidfVectorizer and MultinomialNB.", "For train.csv, train XGBRegressor or XGBClassifier and compute MAE/RMSE or accuracy."],
      code: { title: "Random Forest and XGBoost", note: "For tree models, max_depth, n_estimators and learning_rate are the key tuning parameters.", source: `from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBRegressor

forest = RandomForestClassifier(n_estimators=200, max_depth=5, random_state=42)
forest.fit(X_train, y_train)
print(forest.feature_importances_)

xgb = XGBRegressor(n_estimators=300, learning_rate=0.05, max_depth=4)
xgb.fit(X_train, y_train)
print(xgb.predict(X_test)[:5])` },
      files: [
        { label: "9-Decision-Tree-Classification.ipynb", href: "practice-files/9-Decision-Tree-Classification.ipynb", meta: "Notebook · 1.0 MB" },
        { label: "9-Random-Forest.ipynb", href: "practice-files/9-Random-Forest.ipynb", meta: "Notebook · 1.8 MB" },
        { label: "9-XGBoost.ipynb", href: "practice-files/9-XGBoost.ipynb", meta: "Notebook · 236 KB" },
        { label: "9-Naive-Bayes.ipynb", href: "practice-files/9-Naive-Bayes.ipynb", meta: "Notebook · 215 KB" },
        { label: "synthetic_text_data.csv", href: "practice-files/synthetic_text_data.csv", meta: "Text data · 8 KB" },
        { label: "train.csv", href: "practice-files/train.csv", meta: "Sales data · 2.1 MB" }
      ],
      lab: "penguins.html",
      note: "Trees are interpretable but prone to overfitting. Limit max_depth and min_samples_leaf."
    }
  },
  10: {
    kk: {
      minutes: 75,
      dataset: { name: "new.csv · imbalanced data", detail: "new.csv клиенттерді сегменттеуге арналған. 10-апта СОӨЖ-і теңгерімсіз деректерді, docx мини-жобаларды сипаттайды.", meta: "CSV · 222 KB + DOCX" },
      goals: ["K-Means алгоритмін қолмен және Scikit-learn арқылы түсіну.", "Elbow және silhouette арқылы кластер санын таңдау.", "PCA арқылы екі өлшемде визуализациялау.", "Клиент сегменттерін профильдеп, атау беру."],
      steps: ["new.csv оқып, қажетті сандық белгілерді таңдаңыз.", "StandardScaler қолданыңыз.", "K-Means үшін elbow және silhouette графиктерін салыңыз.", "Оңтайлы k бойынша модельді үйретіп, cluster центрлерін шығарыңыз.", "PCA-ны 2 компонентке келтіріп, кластерлерді визуализациялаңыз.", "Әр кластерді орташа мәндері бойынша атаңыз."],
      code: { title: "K-Means және PCA", note: "Кластер нөмірі өзі мағына бермейді; оны орташа профиль арқылы түсіндіріңіз.", source: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

df = pd.read_csv("new.csv")
X = StandardScaler().fit_transform(df.select_dtypes("number"))

model = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = model.fit_predict(X)

pca = PCA(n_components=2)
points = pca.fit_transform(X)
print(pca.explained_variance_ratio_)
print(labels[:10])` },
      files: [
        { label: "10-Unsupervised-Clustering.ipynb", href: "practice-files/10-Unsupervised-Clustering.ipynb", meta: "Notebook · 750 KB" },
        { label: "10-Customer-Segmentation.ipynb", href: "practice-files/10-Customer-Segmentation.ipynb", meta: "Notebook · 628 KB" },
        { label: "new.csv", href: "practice-files/new.csv", meta: "Клиент деректері · 222 KB" },
        { label: "10-Clustering-Mini-Projects.docx", href: "practice-files/10-Clustering-Mini-Projects.docx", meta: "Мини-жобалар · DOCX" }
      ],
      lab: "unsupervised.html",
      note: "Кластер санын тек көзбен емес, elbow және silhouette көрсеткіштерімен негіздеңіз."
    },
    ru: {
      minutes: 75,
      dataset: { name: "new.csv · imbalanced data", detail: "new.csv предназначен для сегментации клиентов. СРО 10-й недели описывает дисбаланс классов, docx — мини-проекты.", meta: "CSV · 222 KB + DOCX" },
      goals: ["Понять K-Means вручную и через Scikit-learn.", "Выбирать число кластеров через elbow и silhouette.", "Визуализировать данные в двух измерениях через PCA.", "Профилировать и называть клиентские сегменты."],
      steps: ["Прочитайте new.csv и выберите числовые признаки.", "Примените StandardScaler.", "Постройте elbow и silhouette графики для K-Means.", "Обучите модель с оптимальным k и выведите центры кластеров.", "Сведите PCA к 2 компонентам и визуализируйте кластеры.", "Назовите каждый кластер по средним значениям."],
      code: { title: "K-Means и PCA", note: "Номер кластера сам по себе ничего не значит; объясняйте его через средний профиль.", source: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

df = pd.read_csv("new.csv")
X = StandardScaler().fit_transform(df.select_dtypes("number"))

model = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = model.fit_predict(X)

pca = PCA(n_components=2)
points = pca.fit_transform(X)
print(pca.explained_variance_ratio_)
print(labels[:10])` },
      files: [
        { label: "10-Unsupervised-Clustering.ipynb", href: "practice-files/10-Unsupervised-Clustering.ipynb", meta: "Notebook · 750 KB" },
        { label: "10-Customer-Segmentation.ipynb", href: "practice-files/10-Customer-Segmentation.ipynb", meta: "Notebook · 628 KB" },
        { label: "new.csv", href: "practice-files/new.csv", meta: "Данные клиентов · 222 KB" },
        { label: "10-Clustering-Mini-Projects.docx", href: "practice-files/10-Clustering-Mini-Projects.docx", meta: "Мини-проекты · DOCX" }
      ],
      lab: "unsupervised.html",
      note: "Обосновывайте число кластеров не только визуально, но и через elbow и silhouette."
    },
    en: {
      minutes: 75,
      dataset: { name: "new.csv · imbalanced data", detail: "new.csv is used for customer segmentation. The week 10 self-study task covers class imbalance; the docx describes mini-projects.", meta: "CSV · 222 KB + DOCX" },
      goals: ["Understand K-Means both manually and with Scikit-learn.", "Choose the number of clusters with elbow and silhouette.", "Visualize in two dimensions with PCA.", "Profile and name customer segments."],
      steps: ["Read new.csv and select numeric features.", "Apply StandardScaler.", "Plot elbow and silhouette charts for K-Means.", "Train with the optimal k and print cluster centers.", "Reduce PCA to 2 components and visualize clusters.", "Name each cluster from its average profile."],
      code: { title: "K-Means and PCA", note: "A cluster number has no meaning by itself; explain it through its average profile.", source: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

df = pd.read_csv("new.csv")
X = StandardScaler().fit_transform(df.select_dtypes("number"))

model = KMeans(n_clusters=4, random_state=42, n_init=10)
labels = model.fit_predict(X)

pca = PCA(n_components=2)
points = pca.fit_transform(X)
print(pca.explained_variance_ratio_)
print(labels[:10])` },
      files: [
        { label: "10-Unsupervised-Clustering.ipynb", href: "practice-files/10-Unsupervised-Clustering.ipynb", meta: "Notebook · 750 KB" },
        { label: "10-Customer-Segmentation.ipynb", href: "practice-files/10-Customer-Segmentation.ipynb", meta: "Notebook · 628 KB" },
        { label: "new.csv", href: "practice-files/new.csv", meta: "Customer data · 222 KB" },
        { label: "10-Clustering-Mini-Projects.docx", href: "practice-files/10-Clustering-Mini-Projects.docx", meta: "Mini-projects · DOCX" }
      ],
      lab: "unsupervised.html",
      note: "Justify the number of clusters with elbow and silhouette, not only by eye."
    }
  },
  11: {
    kk: {
      minutes: 75,
      dataset: { name: "MNIST", detail: "70 000 қолжазба цифр, 28×28 пиксель, 10 класс. Keras деректерді автоматты жүктейді.", meta: "Кірістірілген MNIST" },
      goals: ["TensorFlow/Keras-та Sequential модель құру.", "MNIST деректерін normalize ету.", "Softmax, sparse_categorical_crossentropy және accuracy қолдану.", "Модельді evaluate және predict арқылы тексеру."],
      steps: ["mnist.load_data() арқылы train/test жүктеңіз.", "Пиксельдерді 255-ке бөліп, 0–1 аралығына келтіріңіз.", "Flatten, Dense(128, relu), Dense(10, softmax) қабаттарын қосыңыз.", "model.compile және model.fit орындаңыз.", "model.evaluate арқылы test дәлдігін шығарыңыз.", "Бірнеше суреттің болжамын көрсетіңіз."],
      code: { title: "MNIST нейрондық желісі", note: "Softmax 10 класқа ықтималдық қайтарады; ең үлкен ықтималдық — болжам.", source: `import tensorflow as tf

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train / 255.0
x_test = x_test / 255.0

model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)
model.fit(x_train, y_train, epochs=3, validation_split=0.1)
print(model.evaluate(x_test, y_test))` },
      files: [{ label: "11-Neural-Networks.ipynb", href: "practice-files/11-Neural-Networks.ipynb", meta: "Jupyter Notebook · 1.1 MB" }],
      lab: "",
      note: "MNIST-те 10 класс бар. Егер шығыс қабатында softmax болса, loss ретінде sparse_categorical_crossentropy қолданыңыз."
    },
    ru: {
      minutes: 75,
      dataset: { name: "MNIST", detail: "70 000 рукописных цифр, 28×28 пикселей, 10 классов. Keras загружает данные автоматически.", meta: "Встроенный MNIST" },
      goals: ["Построить Sequential модель в TensorFlow/Keras.", "Нормализовать данные MNIST.", "Применить softmax, sparse_categorical_crossentropy и accuracy.", "Проверить модель через evaluate и predict."],
      steps: ["Загрузите train/test через mnist.load_data().", "Разделите пиксели на 255, чтобы получить диапазон 0–1.", "Добавьте слои Flatten, Dense(128, relu), Dense(10, softmax).", "Выполните model.compile и model.fit.", "Выведите test accuracy через model.evaluate.", "Покажите прогнозы для нескольких изображений."],
      code: { title: "Нейросеть на MNIST", note: "Softmax возвращает вероятности для 10 классов; наибольшая вероятность — прогноз.", source: `import tensorflow as tf

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train / 255.0
x_test = x_test / 255.0

model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)
model.fit(x_train, y_train, epochs=3, validation_split=0.1)
print(model.evaluate(x_test, y_test))` },
      files: [{ label: "11-Neural-Networks.ipynb", href: "practice-files/11-Neural-Networks.ipynb", meta: "Jupyter Notebook · 1.1 MB" }],
      lab: "",
      note: "В MNIST 10 классов. Если на выходе softmax, используйте loss sparse_categorical_crossentropy."
    },
    en: {
      minutes: 75,
      dataset: { name: "MNIST", detail: "70,000 handwritten digits, 28×28 pixels, 10 classes. Keras downloads the data automatically.", meta: "Built-in MNIST" },
      goals: ["Build a Sequential model in TensorFlow/Keras.", "Normalize the MNIST data.", "Use softmax, sparse_categorical_crossentropy and accuracy.", "Check the model with evaluate and predict."],
      steps: ["Load train/test with mnist.load_data().", "Divide pixels by 255 to get the 0–1 range.", "Add Flatten, Dense(128, relu), Dense(10, softmax) layers.", "Run model.compile and model.fit.", "Print test accuracy with model.evaluate.", "Show predictions for several images."],
      code: { title: "MNIST neural network", note: "Softmax returns probabilities for 10 classes; the largest probability is the prediction.", source: `import tensorflow as tf

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train / 255.0
x_test = x_test / 255.0

model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)
model.fit(x_train, y_train, epochs=3, validation_split=0.1)
print(model.evaluate(x_test, y_test))` },
      files: [{ label: "11-Neural-Networks.ipynb", href: "practice-files/11-Neural-Networks.ipynb", meta: "Jupyter Notebook · 1.1 MB" }],
      lab: "",
      note: "MNIST has 10 classes. If the output layer uses softmax, use sparse_categorical_crossentropy as the loss."
    }
  }
};
