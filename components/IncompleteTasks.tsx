// components/IncompleteTasks.tsx
export default function IncompleteTasks({ tasks }: { tasks: any[] }) {
  const incomplete = tasks.filter((t) => t.status !== "DONE");

  return (
    <div className="space-y-4 text-black">
      <h3 className="font-bold text-red-600">
        Pending Actions ({incomplete.length})
      </h3>
      {incomplete.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white border-l-4 border-red-500 shadow-sm rounded-r-lg flex justify-between"
        >
          <div>
            <p className="font-bold">{task.title}</p>
            <p className="text-xs text-gray-500">{task.project?.title}</p>
          </div>
          <div className="text-right text-xs">
            <p className="text-gray-400 italic">Status: {task.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
