import { Link, Outlet } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as v from "valibot";
import { $api } from "../main";
import type { components } from "@/lib/api/v1.d.ts";

type Todo = components["schemas"]["Todo"];

export const Route = createFileRoute({
  component: Todos,
  loader: async () => {
    const res = await fetch("/api/todos");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json() as Promise<Todo[]>;
  },
  errorComponent: ({ error }) => (
    <div>
      <h1 className="mb-3 text-3xl font-bold">Error</h1>
      <p className="text-red-600">An error occurred: {error.message}</p>
    </div>
  ),
});

function Todos() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");

  // Use the generated mutation hook directly
  const addTodoMutation = $api.useMutation("post", "/api/todos", {
    onSuccess: () => {
      // Invalidate the 'todos' query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] });
      setNewTodo(""); // Clear input after successful mutation
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
  });

  const { data, error, isLoading } = $api.useQuery("get", "/api/todos");

  const deleteTodoMutation = $api.useMutation(
    "delete",
    "/api/todos/{todo_id}",
    {
      onSuccess: () => {
        // Invalidate the 'todos' query to refetch the list
        queryClient.invalidateQueries({ queryKey: ["get", "/api/todos"] });
      },
    },
  );

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">Todos</h1>
      <p className="text-gray-600">This is the Todos page.</p>
      {/* Display todos */}
      {isLoading && <p>Loading todos...</p>}
      {error && <p>Error loading todos: {(error as Error).message}</p>}
      {data && (
        <ul>
          {data.map((todo: Todo) => (
            <li key={todo.id}>
              {todo.title} {todo.done ? "(done)" : "(pending)"}
              <button
                onClick={() =>
                  deleteTodoMutation.mutate({
                    params: { path: { todo_id: todo.id } },
                  })
                }
                disabled={deleteTodoMutation.isPending}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Add input and button */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo"
        />
        <button
          onClick={() =>
            addTodoMutation.mutate({
              body: { id: Date.now(), title: newTodo, done: false },
            })
          }
          disabled={addTodoMutation.isPending || newTodo.trim() === ""}
        >
          {addTodoMutation.isPending ? "Sending..." : "Send Todo"}
        </button>
      </div>
      {/* End input and button */}

      {/* Display mutation state feedback */}
      {addTodoMutation.isPending && <p>Sending todo...</p>}
      {addTodoMutation.isError && (
        <p style={{ color: "red" }}>
          Error sending todo: {addTodoMutation.error.detail}
        </p>
      )}
      {addTodoMutation.isSuccess && addTodoMutation.data && (
        <p style={{ color: "green" }}>Todo sent! Received</p>
      )}
      {/* End mutation state feedback */}

      <Link to="/">Go back to Home</Link>
      <Outlet />
    </div>
  );
}
