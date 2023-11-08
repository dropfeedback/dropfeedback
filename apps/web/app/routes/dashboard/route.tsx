import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Project List</h1>
      <br />
      <div className="flex flex-col gap-2">
        <Link className="text-blue-600" to="/dashboard/1">
          {"->"} Project 1
        </Link>
        <Link className="text-blue-600" to="/dashboard/2">
          {"->"} Project 2
        </Link>
        <Link className="text-blue-600" to="/dashboard/3">
          {"->"} Project 3
        </Link>
        <Link className="text-blue-600" to="/dashboard/4">
          {"->"} Project 4
        </Link>
      </div>
    </div>
  );
}
