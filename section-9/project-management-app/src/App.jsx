import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

{/* <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>  */}

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(newTask) {
    const taskId = Math.random();

    setProjectState(prev => {
      const newTaskWithId = {
        task: newTask,
        projectId: prev.selectedProjectId,
        id: taskId
      }

      return {
        ...prev,
        tasks: [...prev.tasks, newTaskWithId]
      }
    })
  }

  function handleDeleteTask(deleteTaskId) {
    setProjectState(prev => {
      return {
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== deleteTaskId)
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null,
      }
    })
  }

  function handleAddProject(newProjectData) {
    const projectId = Math.random();

    setProjectState(prev => {
      const newProject = {
        ...newProjectData,
        id: projectId
      }

      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]

      }
    })
  }

  function handleCancel(){
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: id,
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(p => p.id !== prev.selectedProjectId),
        tasks: prev.tasks.filter(t => t.projectId !== prev.selectedProjectId)
      }
    })
  }

  console.log(projectState);

  let content;

  if (projectState.selectedProjectId === null){
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancel}/>
  } else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  } else {
    // content = <SelectedProject project={projectState.projects.filter(p => p.id == projectState.selectedProjectId)[0]}/>
    content = <SelectedProject tasks={projectState.tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} project={projectState.projects.find(p => p.id === projectState.selectedProjectId)}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar selectedProjectId={projectState.selectedProjectId} projects={projectState.projects} onStartAddProject={handleStartAddProject} onSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
