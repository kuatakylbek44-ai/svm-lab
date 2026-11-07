# ML LAB · Машиналық оқыту — Ақылбек & Алмас

Static learning site for the Machine Learning course: a hub with student profiles,
topics and datasets, plus interactive labs. Entry point: `dist/index.html`
(the repository root redirects there for GitHub Pages).

## Structure

- `dist/index.html` — hub: heroes, student profiles (`profiles.json`), topics, datasets.
- `dist/svm.html` — SVM lab (6 chapters, Iris prediction, CV results).
- `dist/penguins.html` — Palmer Penguins lab (Decision Tree, Random Forest, XGBoost, Regressor).
- `dist/autompg.html` — Auto MPG regression lab (4 models, MAE/RMSE/R²).
- `dist/unsupervised.html` — K-Means, PCA, DBSCAN, t-SNE lab (new.csv, 2240 customers).
- `dist/imbalanced.html` — imbalanced-data lab (oversampling, SMOTE, class weights).
- `dist/iris.html` — Iris dataset table with search, filter and CSV download.

Each page exists in Kazakh (`*.html`), Russian (`*.ru.html`) and English (`*.en.html`);
`language.js` switches between them. Theme and full-screen controls come from `site-view.js`.
All numerical results are precomputed in Python and replayed in the browser;
notebooks, scripts and CSV/ZIP files are available from the labs.

The site is a mirror of the published ML LAB build. Keep `dist/` as the served root.
