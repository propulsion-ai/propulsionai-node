# Chat

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# Dataset

Types:

- <code><a href="./src/resources/dataset/dataset.ts">DatasetCreateResponse</a></code>

Methods:

- <code title="post /dataset">client.dataset.<a href="./src/resources/dataset/dataset.ts">create</a>({ ...params }) -> DatasetCreateResponse</code>

## Item

Types:

- <code><a href="./src/resources/dataset/item.ts">ItemCreateResponse</a></code>

Methods:

- <code title="post /dataset/item">client.dataset.item.<a href="./src/resources/dataset/item.ts">create</a>({ ...params }) -> ItemCreateResponse</code>

# Knowledgebase

Types:

- <code><a href="./src/resources/knowledgebase/knowledgebase.ts">Knowledgebase</a></code>

Methods:

- <code title="post /knowledgebase">client.knowledgebase.<a href="./src/resources/knowledgebase/knowledgebase.ts">create</a>({ ...params }) -> Knowledgebase</code>

## File

Types:

- <code><a href="./src/resources/knowledgebase/file.ts">File</a></code>
- <code><a href="./src/resources/knowledgebase/file.ts">FileDeleteResponse</a></code>

Methods:

- <code title="delete /knowledgebase/{knowledgebase_id}/file/{file_id}">client.knowledgebase.file.<a href="./src/resources/knowledgebase/file.ts">delete</a>(knowledgebaseId, fileId) -> FileDeleteResponse</code>
- <code title="post /knowledgebase/{knowledgebase_id}/file">client.knowledgebase.file.<a href="./src/resources/knowledgebase/file.ts">upload</a>(knowledgebaseId, { ...params }) -> File</code>
