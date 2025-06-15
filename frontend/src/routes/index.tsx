import { Link } from "@tanstack/react-router";
import logo from "../logo.svg";
import "../App.css";

export const Route = createFileRoute({
  loader: async () => {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json() as Promise<{ id: number; name: string; email: string }[]>;
  },
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  return (
    <div>
      <header className="flex min-h-screen flex-col items-center justify-center text-xl text-primary">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="transition-colors hover:text-blue-700"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="transition-colors hover:text-blue-700"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        <div>test</div>
        <ul>
          {data.map((user: { id: number; name: string; email: string }) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
        <Link
          to="/todos"
          className="mt-4 rounded-2xl bg-primary px-4 py-2 text-secondary transition-colors hover:bg-blue-600"
        >
          Go to Todos
        </Link>
      </header>
    </div>
  );
}
