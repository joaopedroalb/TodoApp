import { createContext, useState, ReactNode, useContext } from 'react';

type TaskItem ={
    title:string,
    isDone:boolean
};

type TaskContextData={
    taskList: TaskItem[];
    addTask:(task:TaskItem)=>void;

};

export const TaskContext = createContext({} as TaskContextData)

type TaskContextProviderProps = {
    children:ReactNode
}

export function TaskContextProvider({children}:TaskContextProviderProps) {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);

    function addTask(task:TaskItem){
       setTaskList([...taskList,task])
    }

    return(
        <TaskContext.Provider value={{
            taskList,
            addTask,
        }}>
        {children}
        </TaskContext.Provider>
    )
}

export const useTask = () =>{
    return useContext(TaskContext)
}