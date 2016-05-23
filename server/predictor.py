import gc
import numpy as np
from sklearn.datasets.samples_generator import make_regression
from sklearn.ensemble.forest import RandomForestRegressor



class Predictor:

	def __init__(self):
		n_train = int(1e3)
		n_test = int(1e2)
		n_features = int(1e2)

		self.x_train, self.y_train, self.x_test, self.y_test = self.generate_dataset(n_train, n_test, n_features)
		self.forest = RandomForestRegressor().fit(self.x_train, self.y_train)



	def predict(self):
		return self.forest.predict(self.x_test[[0]])



	def generate_dataset(self, n_train, n_test, n_features, noise=0.1):
	    print n_train, n_test, n_features

	    X, y, coef = make_regression(n_samples=n_train + n_test,
	                                 n_features=n_features, noise=noise, coef=True)
	    X_train = X[:n_train]
	    y_train = y[:n_train]
	    X_test = X[n_train:]
	    y_test = y[n_train:]
	    idx = np.arange(n_train)
	    np.random.seed(13)
	    np.random.shuffle(idx)
	    X_train = X_train[idx]
	    y_train = y_train[idx]

	    std = X_train.std(axis=0)
	    mean = X_train.mean(axis=0)
	    X_train = (X_train - mean) / std
	    X_test = (X_test - mean) / std

	    std = y_train.std(axis=0)
	    mean = y_train.mean(axis=0)
	    y_train = (y_train - mean) / std
	    y_test = (y_test - mean) / std

	    gc.collect()

	    return X_train, y_train, X_test, y_test