import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ModeToggle />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
