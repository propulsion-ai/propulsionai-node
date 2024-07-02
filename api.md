# Models

Types:

- <code><a href="./src/resources/models.ts">ModelChatResponse</a></code>
- <code><a href="./src/resources/models.ts">ModelEpResponse</a></code>

Methods:

- <code title="post /api/v1/{model_id}/run">client.models.<a href="./src/resources/models.ts">chat</a>(modelId, { ...params }) -> ModelChatResponse</code>
- <code title="post /api/v1/chat/{deployment_tag}">client.models.<a href="./src/resources/models.ts">ep</a>(deploymentTag, { ...params }) -> ModelEpResponse</code>

# Datasets

## Tasks

Methods:

- <code title="post /api/v1/dataset/{dataset_id}/task">client.datasets.tasks.<a href="./src/resources/datasets/tasks.ts">create</a>(datasetId, { ...params }) -> void</code>
