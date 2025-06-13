import { Link, Outlet } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute({
  component: Todos,
});

function Todos() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");

  const addTodoMutation = useMutation({
    mutationFn: (todo: string) =>
      fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Date.now(), title: todo, done: false }),
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
          });
        }
        return res.json();
      }),
    onSuccess: (updateTodos) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo(""); // Clear input after successful mutation
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("/api/todos").then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }),
  });

  return (
    <div>
      <h1>Todos</h1>
      <p>This is the Todos page.</p>
      {/* Display todos */}
      {isLoading && <p>Loading todos...</p>}
      {error && <p>Error loading todos: {(error as Error).message}</p>}
      {data && (
        <ul>
          {data.map((todo: { id: number; title: string; done: boolean }) => (
            <li key={todo.id}>
              {todo.title} {todo.done ? "(done)" : "(pending)"}
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
          onClick={() => addTodoMutation.mutate(newTodo)}
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
          Error sending todo: {addTodoMutation.error.message}
        </p>
      )}
      {addTodoMutation.isSuccess && addTodoMutation.data && (
        <p style={{ color: "green" }}>
          Todo sent! Received: "{addTodoMutation.data.received}" Status:{" "}
        </p>
      )}
      {/* End mutation state feedback */}

      <Link to="/">Go back to Home</Link>
      <Outlet />
    </div>
  );
}
