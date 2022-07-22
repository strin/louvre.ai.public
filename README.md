# Louvre.ai: Museum with Generative AI Art

## Backend

To start the backend, go to `/backend` folder.

```
BEARER_TOKEN=<BEARER_TOKEN> ./run.sh
```

You can get the bearer token from your openai labs browser sessions.

Look for requests that start with `/api/labs/tasks` and header field `authorization: `

## Frontend

To start frontend, go to `/frontend` folder.

```
yarn start
```

## NGROK

```
ngrok http --region=us --hostname=louvre.ngrok.io 3000
```

## Usage

Once both frontend and backend are started,

- Main portal `https://louvre.ngrok.io`

- Load picture frames `https://louvre.ngrok.io/picture?id=0`

## DALL-E API (Beta)

We reverse engineered DALL-E's API. The API involves two endpoints:

```
POST https://labs.openai.com/api/labs/tasks

PAYLOAD

{"task_type":"text2im","prompt":{"caption":"<prompt>","batch_size":4}}

RESPONSE

{
  "object": "task",
  "id": "task-aqclg2BcWs0rq0ak5Z2A0N4d",
  "created": 1658470785,
  "task_type": "text2im",
  "status": "pending",
  "status_information": {},
  "prompt_id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
  "prompt": {
    "id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
    "object": "prompt",
    "created": 1658470785,
    "prompt_type": "CaptionPrompt",
    "prompt": {
      "caption": "skiing on big mars"
    },
    "parent_generation_id": null
  }
}


creates a new DALL E task with prompt. The latest API only allows no more than 4 photos at a time.
```

```
GET https://labs.openai.com/api/labs/tasks/<task_id>

RESPONSE

{
  "object": "task",
  "id": "task-aqclg2BcWs0rq0ak5Z2A0N4d",
  "created": 1658470785,
  "task_type": "text2im",
  "status": "pending",
  "status_information": {},
  "prompt_id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
  "prompt": {
    "id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
    "object": "prompt",
    "created": 1658470785,
    "prompt_type": "CaptionPrompt",
    "prompt": {
      "caption": "skiing on big mars"
    },
    "parent_generation_id": null
  }
}

OR

{
  "object": "task",
  "id": "task-aqclg2BcWs0rq0ak5Z2A0N4d",
  "created": 1658470785,
  "task_type": "text2im",
  "status": "succeeded",
  "status_information": {},
  "prompt_id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
  "generations": {
    "object": "list",
    "data": [
      {
        "id": "generation-pu02b1fvkSxuzaXiBzNaIoo1",
        "object": "generation",
        "created": 1658470796,
        "generation_type": "ImageGeneration",
        "generation": {
          "image_path": "<image_url>"
        },
        "task_id": "task-aqclg2BcWs0rq0ak5Z2A0N4d",
        "prompt_id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
        "is_public": false
      },
    ]
  },
  "prompt": {
    "id": "prompt-gkSonb5Qii4ASRGxSWsTwQBq",
    "object": "prompt",
    "created": 1658470785,
    "prompt_type": "CaptionPrompt",
    "prompt": {
      "caption": "<prompt>"
    },
    "parent_generation_id": null
  }
}
```
