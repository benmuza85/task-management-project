// src/components/KanbanBoard.js
const KanbanBoard = ({ tasks, setTasks, selectedProject }) => {

  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.project === selectedProject)
    : tasks;



  const handleDragStart = (e, taskId, currentStatus) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('currentStatus', currentStatus);
  };

  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    if (currentStatus !== newStatus) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        const updatedTask = await response.json();

        // Update the task state after moving it to a new column
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <section className="p-4">
      <h2 className="text-lg text-blue-400 font-semibold mb-4">Kanban Board</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* To Do Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'To Do')}
        >
          <h3 className="text-md font-semibold mb-2">To Do</h3>
          {filteredTasks
            .filter((task) => task.status === 'To Do')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'To Do')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>

        {/* In Progress Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'In Progress')}
        >
          <h3 className="text-md font-semibold mb-2">In Progress</h3>
          {filteredTasks
            .filter((task) => task.status === 'In Progress')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'In Progress')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>

        {/* Done Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'Done')}
        >
          <h3 className="text-md font-semibold mb-2">Done</h3>
          {filteredTasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'Done')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
