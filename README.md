# SVM LAB

Kazakh six-section interactive learning site, inspired by the user's IRIS LAB.

Static entry: `dist/index.html`. No remote runtime dependencies.

Recompute numerical assets with Python 3, numpy and scikit-learn 1.8.0:

```sh
python generate_data.py
```

Student code: `dist/svm_iris.py`, plus `dist/SVM_Lab.ipynb`.

The binary lab exports fitted SVC support vectors, dual coefficients and kernel parameters. Browser evaluation is exact for those fitted models; changing controls selects a precomputed fitted model. Iris inference implements sklearn/libsvm's three-class one-versus-one decision aggregation. Baseline test accuracy is 29/30. Five-fold CV on train selects C=1, gamma=0.1 in the configured grid, with CV accuracy .975 and held-out test accuracy 29/30. Test is never used for parameter selection.

Validation: all 150 Iris predictions match sklearn, every synthetic kernel model reproduces its training accuracy, and the standalone student code was executed. Browser QA covers the six chapters, controls, confusion matrix, CV selection and dialogs.
