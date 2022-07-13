from flask import Flask, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

BEARER_TOKEN = "sess-6Wqq6szgzNRRFQOQXITwxpkhJ5EjGbPISEED3xfm"

picture_urls = {}


@app.route("/dalle/create", methods=["GET"])
def create_dalle():
    print(request.args)

    prompt = request.args['prompt']
    print('prompt is', prompt)

    response = requests.post("https://labs.openai.com/api/labs/tasks",
                             headers={
                                 'accept': "*/*",
                                 "accept-language": "en-US,en;q=0.9",
                                 'authorization': "Bearer " + BEARER_TOKEN,
                                 "content-type": "application/json",
                                 "sec-fetch-dest": "empty",
                                 "sec-fetch-mode": "cors",
                                 "sec-fetch-site": "same-origin",
                                 "sec-gpc": "1",
                             },
                             json={
                                 "task_type": "text2im",
                                 "prompt": {
                                     "caption": prompt,
                                     "batch_size": 6
                                 }
                             })
    raw_response = response.text
    print('create_dalle', raw_response)
    try:
        result = json.loads(raw_response)
    except:
        print('Cannot load parse raw response', raw_response)
        return 'Error', 500

    return result


@app.route('/dalle/task', methods=['GET'])
def get_dalle():
    print(request.args)
    task_id = request.args['id']

    response = requests.get("https://labs.openai.com/api/labs/tasks/" +
                            task_id,
                            headers={
                                'accept': "*/*",
                                "accept-language": "en-US,en;q=0.9",
                                'authorization': "Bearer " + BEARER_TOKEN,
                                "content-type": "application/json",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "sec-gpc": "1",
                            })
    raw_response = response.text
    print('get_dalle', raw_response)
    try:
        result = json.loads(raw_response)
    except:
        print('Cannot load parse raw response', raw_response)
        return 'Error', 500

    return result


@app.route('/picture/set', methods=['PUT'])
def set_picture():
    pic_id = request.args['id']
    pic_url = request.args['url']

    picture_urls[pic_id] = pic_url

    return 'OK'


@app.route('/picture/get', methods=['GET'])
def get_picture():
    pic_id = request.args['id']

    return picture_urls.get(pic_id, '')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
