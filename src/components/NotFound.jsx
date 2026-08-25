import { useRouteMeta } from "../seo/useRouteMeta";

const NotFound = () => {
  useRouteMeta();
  return (
    <div className="flex min-h-[100dvh] flex-col justify-center bg-ink px-4 text-gray-100">
      <div className="mx-auto w-full max-w-6xl">
        <p className="label">404</p>
        <h1 className="headline mt-6 max-w-[20ch]">This page does not exist</h1>
        <p className="intro mt-7 max-w-[52ch]">
          The address may have changed, or the link that brought you here is out of
          date.
        </p>
        <a href="/" className="btn-ghost btn-accent mt-10">
          Go to the homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
