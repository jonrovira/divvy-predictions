from flask import Flask
from flask_restful import Resource, Api
from flask.ext.restful.utils import cors
import json
from predictor import Predictor



app = Flask(__name__)
api = Api(app, decorators=[cors.crossdomain(origin="*")])



p = Predictor()



class Predictions(Resource):

	def get(self):
		prediction = p.predict()

		with open('stations.json') as data_file:
			stations = json.load(data_file)

		predictions = []
		for station in stations:
			predictions.append({
				'id': station['id'],
				'lat': station['lat'],
				'lng': station['lng'],
				'prediction': prediction.tolist()[0]
			})

		return predictions



api.add_resource(Predictions, '/')



if __name__ == "__main__":
	app.run(debug=True)