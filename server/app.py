from flask import Flask
from flask_restful import Resource, Api
from flask.ext.restful.utils import cors
import json
import random
import requests
from predictor import Predictor



app = Flask(__name__)
api = Api(app, decorators=[cors.crossdomain(origin="*")])



# p = Predictor()



class Predictions(Resource):

	def get(self):
		# prediction = p.predict()

		with open('./data/stations.json') as data_file:
			stations = json.load(data_file)

		predictions = []
		for i, station in enumerate(stations):
			predictions.append({
				'id': i,
				'name': station['name'],
				'lat': station['latitude'],
				'lng': station['longitude'],
				'capacity': station['dpcapacity'],
				'prediction': 9*random.random() #prediction.tolist()[0]
			})

		return predictions



class Forecast(Resource):

	def get(self):
		return json.loads(requests.get('https://api.forecast.io/forecast/53b2466f3793d7f9f048831394011b21/41.88917683,-87.63850577').content)



api.add_resource(Predictions, '/predictions')
api.add_resource(Forecast, '/forecast')



if __name__ == "__main__":
	app.run(debug=True)