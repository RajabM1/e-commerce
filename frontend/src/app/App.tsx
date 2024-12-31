import { Suspense } from "react";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Suspense>
    );
};
