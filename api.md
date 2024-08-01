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
- <code><a href="./src/resources/knowledgebase/file.ts">KnowledgebaseFileUploadResponse</a></code>
- <code><a href="./src/resources/knowledgebase/file.ts">FileDeleteResponse</a></code>

Methods:

- <code title="post /knowledgebase/{knowledgebase_code}/file">client.knowledgebase.file.<a href="./src/resources/knowledgebase/file.ts">create</a>(knowledgebaseCode, { ...params }) -> File</code>
- <code title="delete /knowledgebase/{knowledgebase_code}/file/{file_id}">client.knowledgebase.file.<a href="./src/resources/knowledgebase/file.ts">delete</a>(knowledgebaseCode, fileId) -> FileDeleteResponse</code>
- <code title="post /knowledgebase/{knowledgebase_code}/file">client.knowledgebase.file.<a href="./src/resources/knowledgebase/file.ts">upload</a>(knowledgebaseCode, { ...params }) -> File</code>

## Item

Types:

- <code><a href="./src/resources/knowledgebase/item.ts">KnowledgebaseItemResponse</a></code>

Methods:

- <code title="post /knowledgebase/{knowledgebase_code}/item">client.knowledgebase.item.<a href="./src/resources/knowledgebase/item.ts">create</a>(knowledgebaseCode, { ...params }) -> KnowledgebaseItemResponse</code>
