from litestar import Litestar, get, post, delete
from litestar.config.cors import CORSConfig
import os
from dotenv import load_dotenv
import uvicorn
from dataclasses import dataclass


load_dotenv()


@dataclass
class Todo:
    id: int
    title: str
    done: bool


@dataclass
class User:
    id: int
    name: str
    email: str


TODO_LIST: list[Todo] = [
    Todo(id=1, title="Buy groceries", done=False),
    Todo(id=2, title="Walk the dog", done=True),
    Todo(id=3, title="Read a book", done=False),
]


@get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy", "message": "API is running"}


@get("/api/users")
async def get_users() -> list[User]:
    return [
        User(id=1, name="John Doe", email="john@example.com"),
        User(id=2, name="Jane Smith", email="jane@example.com"),
    ]


@get("/api/todos")
async def get_todos() -> list[Todo]:
    return TODO_LIST


@post("/api/todos")
async def add_todo(data: Todo) -> list[Todo]:
    TODO_LIST.append(data)
    return TODO_LIST


@delete("/api/todos/{todo_id:int}")
async def delete_todo(todo_id: int) -> None:
    global TODO_LIST
    TODO_LIST = [todo for todo in TODO_LIST if todo.id != todo_id]


cors_config = CORSConfig(
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app: Litestar = Litestar(
    route_handlers=[health_check, get_users, get_todos, add_todo, delete_todo],
    cors_config=cors_config,
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
