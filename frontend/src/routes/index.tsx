import { Link } from "@tanstack/react-router";
import logo from "../logo.svg";
import "../App.css";

import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute({
  component: Home,
});

function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("/api/users").then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }),
  });

  return (
    <div>
      <header className="flex min-h-screen flex-col items-center justify-center text-xl text-white">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-500 transition-colors hover:text-blue-700"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-blue-500 transition-colors hover:text-blue-700"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        <div>test</div>
        {isLoading && <p>Loading users...</p>}
        {error && <p>Error loading users: {(error as Error).message}</p>}
        {data && (
          <ul>
            {data.map((user: { id: number; name: string; email: string }) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/todos"
          className="mt-4 rounded-2xl bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Go to Todos
        </Link>
      </header>
    </div>
  );
}
