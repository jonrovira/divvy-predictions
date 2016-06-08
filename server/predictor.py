import os
import pandas as pd
from sklearn.cross_validation import train_test_split
from sklearn.ensemble import RandomForestRegressor


class Predictor:

	def __init__(self):
		path_to_data = os.path.join(os.path.dirname(__file__), 'excerpt.csv')
		data = self.get_data(path_to_data)
		train_x, train_y, test_x, test_y = self.split_data(data)
		self.forest = self.train_forest(train_x, train_y)



	def get_data(self, path):
		data = pd.read_csv(path)
		data.set_index(['index'], drop=True, inplace=True)
		data.index = pd.to_datetime(data.index)
		return data



	def split_data(self, data):
		x = data.iloc[:, 1:]
		y = data['trip_count']
		return train_test_split(x, y, test_size=0.3, random_state=1)



	def train_forest(self, x, y):
		forest = RandomForestRegressor(n_estimators=500, 
                                       criterion='mse',
                                       max_depth=None,
                                       min_samples_split=2,
                                       min_samples_leaf=25,
                                       max_features='auto',
                                       max_leaf_nodes=None,
                                       bootstrap=True,
                                       oob_score=False,
                                       n_jobs= -1,
                                       random_state=None,
                                       verbose=2)
		forest.fit(x, y)
		return forest



	def predict(self, x):
		return self.forest


