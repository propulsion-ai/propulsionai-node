# File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

from __future__ import annotations

from typing import Dict, Union, Iterable, Optional
from typing_extensions import Literal, Required, TypedDict

__all__ = [
    "ModelChatParams",
    "Message",
    "ToolChoice",
    "ToolChoiceChatCompletionNamedToolChoice",
    "ToolChoiceChatCompletionNamedToolChoiceFunction",
    "Tool",
    "ToolFunction",
]


class ModelChatParams(TypedDict, total=False):
    messages: Required[Iterable[Message]]

    model: Required[str]

    stream: Required[bool]

    wait: bool
    """Whether to wait for the response or not."""

    max_tokens: Optional[int]
    """
    The maximum number of [tokens](/tokenizer) that can be generated in the chat
    completion.

    The total length of input tokens and generated tokens is limited by the model's
    context length.
    [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)
    for counting tokens.
    """

    n: Optional[int]
    """How many chat completion choices to generate for each input message.

    Note that you will be charged based on the number of generated tokens across all
    of the choices. Keep `n` as `1` to minimize costs.
    """

    temperature: Optional[float]
    """
    An alternative to sampling with temperature, called nucleus sampling, where the
    model considers the results of the tokens with top_p probability mass. So 0.1
    means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or `temperature` but not both.
    """

    tool_choice: ToolChoice
    """
    Controls which (if any) tool is called by the model. `none` means the model will
    not call any tool and instead generates a message. `auto` means the model can
    pick between generating a message or calling one or more tools. `required` means
    the model must call one or more tools. Specifying a particular tool via
    `{"type": "function", "function": {"name": "my_function"}}` forces the model to
    call that tool.

    `none` is the default when no tools are present. `auto` is the default if tools
    are present.
    """

    tools: Iterable[Tool]
    """A list of tools the model may call.

    Currently, only functions are supported as a tool. Use this to provide a list of
    functions the model may generate JSON inputs for. A max of 128 functions are
    supported.
    """

    top_p: Optional[float]
    """
    An alternative to sampling with temperature, called nucleus sampling, where the
    model considers the results of the tokens with top_p probability mass. So 0.1
    means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or `temperature` but not both.
    """


class Message(TypedDict, total=False):
    content: str

    role: Literal["system", "user", "assistant", "tool"]


class ToolChoiceChatCompletionNamedToolChoiceFunctionTyped(TypedDict, total=False):
    name: Required[str]
    """The name of the function to be called.

    Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length
    of 64.
    """

    description: str
    """
    A description of what the function does, used by the model to choose when and
    how to call the function.
    """

    parameters: Dict[str, object]
    """The parameters the functions accepts, described as a JSON Schema object.

    See the [guide](/docs/guides/function-calling) for examples, and the
    [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
    documentation about the format.

    Omitting `parameters` defines a function with an empty parameter list.
    """


ToolChoiceChatCompletionNamedToolChoiceFunction = Union[
    ToolChoiceChatCompletionNamedToolChoiceFunctionTyped, Dict[str, object]
]


class ToolChoiceChatCompletionNamedToolChoice(TypedDict, total=False):
    function: Required[ToolChoiceChatCompletionNamedToolChoiceFunction]

    type: Required[Literal["function"]]


ToolChoice = Union[Literal["none", "auto", "required"], ToolChoiceChatCompletionNamedToolChoice]


class ToolFunctionTyped(TypedDict, total=False):
    name: Required[str]
    """The name of the function to be called.

    Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length
    of 64.
    """

    description: str
    """
    A description of what the function does, used by the model to choose when and
    how to call the function.
    """

    parameters: Dict[str, object]
    """The parameters the functions accepts, described as a JSON Schema object.

    See the [guide](/docs/guides/function-calling) for examples, and the
    [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
    documentation about the format.

    Omitting `parameters` defines a function with an empty parameter list.
    """


ToolFunction = Union[ToolFunctionTyped, Dict[str, object]]


class Tool(TypedDict, total=False):
    function: Required[ToolFunction]

    type: Required[Literal["function"]]
    """The type of the tool. Currently, only `function` is supported."""
