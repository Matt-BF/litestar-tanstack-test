from litestar import Litestar, get, post
from litestar.config.cors import CORSConfig
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()


class Message(BaseModel):
    message: str


@get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello from Litestar!"}


@get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy", "message": "API is running"}


@get("/api/users")
async def get_users() -> dict[str, list[dict[str, any]]]:
    return {
        "users": [
            {"id": 1, "name": "John Doe", "email": "john@example.com"},
            {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
        ]
    }


@post("/api/message")
async def create_message(data: Message) -> dict[str, str]:
    return {"received": data.message, "status": "success"}


cors_config = CORSConfig(
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = Litestar(
    route_handlers=[root, health_check, get_users, create_message],
    cors_config=cors_config,
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
