from flask import Flask
from flask_restful import Resource, Api
import json
from predictor import Predictor



app = Flask(__name__)
api = Api(app)



p = Predictor()



class HelloWorld(Resource):
	def get(self):
		prediction = p.predict()
		return json.dumps(prediction.tolist())



api.add_resource(HelloWorld, '/')



if __name__ == "__main__":
	app.run(debug=True)