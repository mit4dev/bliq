export function Footer() {
  return (
    <footer className="flex h-20 text-xs font-semibold bg-gray-50">
      <div className="container flex flex-col m-auto items-center justify-center">
        <p>Mustafa İrfan TARI @2024</p>

        <a href="https://www.github.com/mit4dev" target="_blank">
          Github{" "}
          <span className="cursor-pointer text-xs px-1 py-0.5 bg-slate-200 rounded-md">
            mit4dev
          </span>
        </a>
      </div>
    </footer>
  );
}
