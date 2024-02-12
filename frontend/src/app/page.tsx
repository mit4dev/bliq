import { ErrorBoundary } from "react-error-boundary";
import DefaultErrorFallback from "./components/ErrorFallback";
import RideOptionList from "./components/RideOptionList";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen py-4 container mx-auto w-full px-4 sm:px-0 md:w-2/3 lg:w-1/2">
      <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
        <RideOptionList />
      </ErrorBoundary>
    </section>
  );
}
