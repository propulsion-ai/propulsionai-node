# File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

from __future__ import annotations

import os
from typing import Any, cast

import pytest

from tests.utils import assert_matches_type
from propulsionai import PropulsionAI, AsyncPropulsionAI
from propulsionai.types import ModelChatResponse

base_url = os.environ.get("TEST_API_BASE_URL", "http://127.0.0.1:4010")


class TestModels:
    parametrize = pytest.mark.parametrize("client", [False, True], indirect=True, ids=["loose", "strict"])

    @parametrize
    def test_method_chat(self, client: PropulsionAI) -> None:
        model = client.models.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        )
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    def test_method_chat_with_all_params(self, client: PropulsionAI) -> None:
        model = client.models.chat(
            "string",
            messages=[
                {
                    "role": "system",
                    "content": "string",
                },
                {
                    "role": "system",
                    "content": "string",
                },
                {
                    "role": "system",
                    "content": "string",
                },
            ],
            model="string",
            stream=True,
            wait=True,
            max_tokens=0,
            n=1,
            temperature=1,
            tool_choice="none",
            tools=[
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
            ],
            top_p=1,
        )
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    def test_raw_response_chat(self, client: PropulsionAI) -> None:
        response = client.models.with_raw_response.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        )

        assert response.is_closed is True
        assert response.http_request.headers.get("X-Stainless-Lang") == "python"
        model = response.parse()
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    def test_streaming_response_chat(self, client: PropulsionAI) -> None:
        with client.models.with_streaming_response.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        ) as response:
            assert not response.is_closed
            assert response.http_request.headers.get("X-Stainless-Lang") == "python"

            model = response.parse()
            assert_matches_type(ModelChatResponse, model, path=["response"])

        assert cast(Any, response.is_closed) is True

    @parametrize
    def test_path_params_chat(self, client: PropulsionAI) -> None:
        with pytest.raises(ValueError, match=r"Expected a non-empty value for `model_id` but received ''"):
            client.models.with_raw_response.chat(
                "",
                messages=[{}, {}, {}],
                model="string",
                stream=True,
            )


class TestAsyncModels:
    parametrize = pytest.mark.parametrize("async_client", [False, True], indirect=True, ids=["loose", "strict"])

    @parametrize
    async def test_method_chat(self, async_client: AsyncPropulsionAI) -> None:
        model = await async_client.models.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        )
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    async def test_method_chat_with_all_params(self, async_client: AsyncPropulsionAI) -> None:
        model = await async_client.models.chat(
            "string",
            messages=[
                {
                    "role": "system",
                    "content": "string",
                },
                {
                    "role": "system",
                    "content": "string",
                },
                {
                    "role": "system",
                    "content": "string",
                },
            ],
            model="string",
            stream=True,
            wait=True,
            max_tokens=0,
            n=1,
            temperature=1,
            tool_choice="none",
            tools=[
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
                {
                    "type": "function",
                    "function": {
                        "description": "string",
                        "name": "string",
                        "parameters": {"foo": "bar"},
                    },
                },
            ],
            top_p=1,
        )
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    async def test_raw_response_chat(self, async_client: AsyncPropulsionAI) -> None:
        response = await async_client.models.with_raw_response.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        )

        assert response.is_closed is True
        assert response.http_request.headers.get("X-Stainless-Lang") == "python"
        model = await response.parse()
        assert_matches_type(ModelChatResponse, model, path=["response"])

    @parametrize
    async def test_streaming_response_chat(self, async_client: AsyncPropulsionAI) -> None:
        async with async_client.models.with_streaming_response.chat(
            "string",
            messages=[{}, {}, {}],
            model="string",
            stream=True,
        ) as response:
            assert not response.is_closed
            assert response.http_request.headers.get("X-Stainless-Lang") == "python"

            model = await response.parse()
            assert_matches_type(ModelChatResponse, model, path=["response"])

        assert cast(Any, response.is_closed) is True

    @parametrize
    async def test_path_params_chat(self, async_client: AsyncPropulsionAI) -> None:
        with pytest.raises(ValueError, match=r"Expected a non-empty value for `model_id` but received ''"):
            await async_client.models.with_raw_response.chat(
                "",
                messages=[{}, {}, {}],
                model="string",
                stream=True,
            )
