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
    clearTaskFinished:()=>void;
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
        console.log(id);
        taskList[id].isDone = !taskList[id].isDone;
        setTaskLeft(taskList.filter(item=>!item.isDone).length);
    }

    function clearTaskFinished(){
        let index = 0;
        taskList.filter(item=>!item.isDone).map(item=>{
            item.id = index;
            index++;
        })
        setTaskList(taskList.filter(item=>!item.isDone))
    }

    
    return(
        <TaskContext.Provider value={{
            taskList,
            taskLeft,
            addTask,
            changeStateTask,
            clearTaskFinished
        }}>
        {children}
        </TaskContext.Provider>
    )
}

export const useTask = () =>{
    return useContext(TaskContext)
}