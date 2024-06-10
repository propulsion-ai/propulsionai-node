# File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

from typing import List, Optional

from pydantic import Field as FieldInfo

from .._models import BaseModel

__all__ = ["ModelChatResponse", "Choice", "ChoiceMessage", "ToolCall", "Usage"]


class ChoiceMessage(BaseModel):
    content: Optional[str] = None

    role: Optional[str] = None


class Choice(BaseModel):
    index: Optional[int] = None

    message: Optional[ChoiceMessage] = None


class ToolCall(BaseModel):
    arguments: Optional[object] = None

    function_name: Optional[str] = FieldInfo(alias="functionName", default=None)

    response: Optional[object] = None


class Usage(BaseModel):
    completion_tokens: Optional[int] = None

    prompt_tokens: Optional[int] = None

    total_tokens: Optional[int] = None


class ModelChatResponse(BaseModel):
    id: Optional[str] = None

    choices: Optional[List[Choice]] = None

    created: Optional[int] = None

    model: Optional[str] = None

    object: Optional[str] = None

    tool_calls: Optional[List[ToolCall]] = FieldInfo(alias="toolCalls", default=None)

    usage: Optional[Usage] = None
