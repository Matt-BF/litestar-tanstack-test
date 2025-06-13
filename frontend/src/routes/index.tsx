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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
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
        <Link to="/todos">Go to Todos</Link>
      </header>
    </div>
  );
}
