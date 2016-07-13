#!venv/bin/python2.7

import os
import copy
import pandas as pd
import json
import datetime
import holidays
import requests
from sklearn.cross_validation import train_test_split
from sklearn.ensemble import RandomForestRegressor

holidays = holidays.UnitedStates()



class Predictor:

	def __init__(self):
		print "Predictor initializing..."
		self.predictions = []

		# read, organize ride data
		print "    reading ride data..."
		ride_path = os.path.join(os.path.dirname(__file__), 'data/excerpt.csv')
		rides = pd.read_csv(ride_path)
		rides.set_index(['index'], drop=True, inplace=True)
		rides.index = pd.to_datetime(rides.index)
		x = rides.iloc[:, 1:]
		y = rides['trip_count']
		train_x, test_x, train_y, test_y = train_test_split(x, y, test_size=0.3, random_state=1)

		# read station data
		print "    redaing station data..."
		station_path = os.path.join(os.path.dirname(__file__), 'data/stations.json')
		with open(station_path) as station_file:
			stations = json.load(station_file)

		# build the random forest
		print "    training forest..."
		forest = self.train_forest(train_x, train_y)

		# generate predictions
		print "    making predictions..."
		self.predictions = self.make_predictions(forest, stations)
		print "done"


	def get_predictions(self):
		return self.predictions


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
                                       verbose=0)
		forest.fit(x, y)
		return forest


	def make_predictions(self, forest, stations):
		predictions = []
		day_data = self.get_current_weather_time()
		for i, station in enumerate(stations):
			if i % 10 is 0:
				print "        predicting for station " + str(i)
			station_query = copy.deepcopy(day_data)
			station_query['latitude'] = [station['latitude']]
			station_query['longitude'] = [station['longitude']]
			station_query['station_id'] = [i]
			predictions.append({
				'id': i,
				'name': station['name'],
				'lat': station['latitude'],
				'lng': station['longitude'],
				'capacity': station['dpcapacity'],
				'prediction': self.predict_station_demand(forest, station_query)
			})
		return predictions


	def get_current_weather_time(self):
		day_data = {}
		# forecast = requests.get('https://api.forecast.io/forecast/53b2466f3793d7f9f048831394011b21/41.88917683,-87.63850577').content['currently']
		forecast = json.loads(requests.get('https://api.forecast.io/forecast/53b2466f3793d7f9f048831394011b21/41.88917683,-87.63850577').content)['currently']
		time = datetime.datetime.fromtimestamp(forecast['time'])
		day_data['precipi']   = [forecast['precipIntensity']]
		day_data['pressurei'] = [forecast['pressure']]
		day_data['hum']       = [forecast['humidity']]
		day_data['tempi']     = [forecast['temperature']]
		day_data['dewpti']    = [forecast['dewPoint']]
		day_data['visi']      = [forecast['visibility']]
		day_data['wspdi']     = [forecast['windSpeed']]
		day_data['hour_6']    = [1 if time.hour > 6 and time.hour < 9 else 0]
		day_data['hour_9']    = [1 if time.hour > 9 and time.hour < 12 else 0]
		day_data['hour_12']   = [1 if time.hour > 12 and time.hour < 15 else 0]
		day_data['hour_15']   = [1 if time.hour > 15 and time.hour < 18 else 0]
		day_data['day_0']     = [1 if time.weekday()+1 % 7 == 0 else 0]
		day_data['day_1']     = [1 if time.weekday()+1 & 7 == 1 else 0]
		day_data['day_2']     = [1 if time.weekday()+1 % 7 == 2 else 0]
		day_data['day_3']     = [1 if time.weekday()+1 % 7 == 3 else 0]
		day_data['day_4']     = [1 if time.weekday()+1 % 7 == 4 else 0]
		day_data['day_5']     = [1 if time.weekday()+1 % 7 == 5 else 0]
		day_data['day_6']     = [1 if time.weekday()+1 % 7 == 6 else 0]
		day_data['weekend_']  = [1 if day_data['day_0'] or day_data['day_6'] else 0]
		day_data['month_1']   = [1 if time.month == 1 else 0]
		day_data['month_2']   = [1 if time.month == 2 else 0]
		day_data['month_3']   = [1 if time.month == 3 else 0]
		day_data['month_4']   = [1 if time.month == 4 else 0]
		day_data['month_5']   = [1 if time.month == 5 else 0]
		day_data['month_6']   = [1 if time.month == 6 else 0]
		day_data['month_7']   = [1 if time.month == 7 else 0]
		day_data['month_8']   = [1 if time.month == 8 else 0]
		day_data['month_9']   = [1 if time.month == 9 else 0]
		day_data['month_10']  = [1 if time.month == 10 else 0]
		day_data['month_11']  = [1 if time.month == 11 else 0]
		day_data['month_12']  = [1 if time.month == 12 else 0]
		day_data['holiday']   = [1 if forecast['time'] in holidays else 0]
		day_data['days_since_first_date'] = [(datetime.date(time.year, time.month, time.day) - datetime.date(2013, 1, 1)).days]
		return day_data


	def predict_station_demand(self, forest, station_query):
		ds = list(zip(station_query['precipi'], station_query['pressurei'], station_query['hum'], station_query['tempi'], station_query['dewpti'], station_query['visi'], station_query['wspdi'], station_query['latitude'], station_query['longitude'], station_query['hour_6'], station_query['hour_9'], station_query['hour_12'], station_query['hour_15'], station_query['day_0'], station_query['day_1'], station_query['day_2'], station_query['day_3'], station_query['day_4'], station_query['day_5'], station_query['day_6'], station_query['weekend_'], station_query['month_1'], station_query['month_2'], station_query['month_3'], station_query['month_4'], station_query['month_5'], station_query['month_6'], station_query['month_7'], station_query['month_8'], station_query['month_9'], station_query['month_10'], station_query['month_11'], station_query['month_12'], station_query['holiday'], station_query['days_since_first_date'], station_query['station_id']))
		df = pd.DataFrame(data=ds, columns=['precipi', 'pressurei', 'hum', 'tempi', 'dewpti', 'visi', 'wspdi', 'latitude', 'longitude', 'hour_6', 'hour_9', 'hour_12', 'hour_15', 'day_0', 'day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6', 'weekend_', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12', 'holiday', 'days_since_first_date', 'station_id'])
		return forest.predict(df)[0]



def run_predictor():
	predictor = Predictor()
	return predictor.get_predictions()




