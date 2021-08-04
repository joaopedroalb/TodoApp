import { createContext, useState, ReactNode, useContext } from 'react';

type TaskItem ={
    id:number,
    title:string,
    isDone:boolean
};

type TaskContextData={
    taskList: TaskItem[];
    taskLeft:number;
    addTask:(task:TaskItem)=>void;
    changeStateTask:(id:number)=>void;
};

export const TaskContext = createContext({} as TaskContextData)

type TaskContextProviderProps = {
    children:ReactNode
}

export function TaskContextProvider({children}:TaskContextProviderProps) {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);
    const [taskLeft,setTaskLeft] = useState(0);

    function addTask(task:TaskItem){
       setTaskList([...taskList,task])
       setTaskLeft(taskLeft+1);

    }
    
    function changeStateTask(id:number){
        taskList[id].isDone = !taskList[id].isDone;
        setTaskLeft(taskList.filter(item=>!item.isDone).length);
    }

    
    return(
        <TaskContext.Provider value={{
            taskList,
            taskLeft,
            addTask,
            changeStateTask
        }}>
        {children}
        </TaskContext.Provider>
    )
}

export const useTask = () =>{
    return useContext(TaskContext)
}