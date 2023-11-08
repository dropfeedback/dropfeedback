import { Link } from "@remix-run/react";

export default function Docs() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Welcome to Documents!</h1>
      <br />
      <div className="flex flex-col gap-2">
        <Link className="text-blue-600" to="/">
          {"->"} Home
        </Link>
        <Link className="text-blue-600" to="/dashboard">
          {"->"} Dashboard
        </Link>
      </div>
    </div>
  );
}
