import { createContext, useState, ReactNode, useContext } from 'react';

type TaskItem ={
    id:number,
    title:string,
    isDone:boolean
};

type TaskContextData={
    isDark:boolean;
    taskList: TaskItem[];
    taskLeft:number;
    changeMode:()=>void;
    addTask:(task:TaskItem)=>void;
    changeStateTask:(id:number)=>void;
    clearTaskFinished:()=>void;
    currentTaskList:(status:number)=>TaskItem[]
};

export const TaskContext = createContext({} as TaskContextData)

type TaskContextProviderProps = {
    children:ReactNode
}

export function TaskContextProvider({children}:TaskContextProviderProps) {
    const [taskList, setTaskList] = useState<TaskItem[]>([]);
    const [taskLeft,setTaskLeft] = useState(0);
    const [isDark,setIsDark] = useState(true);

    function changeMode(){
        setIsDark(!isDark);
    }

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

    const currentTaskList = (status:number) =>{
        if(status==1)
            return taskList.filter(item=>(!item.isDone))

        if(status==2)
            return taskList.filter(item=>(item.isDone))

        return taskList
    }

    
    return(
        <TaskContext.Provider value={{
            isDark,
            taskList,
            taskLeft,
            changeMode,
            addTask,
            changeStateTask,
            clearTaskFinished,
            currentTaskList
        }}>
        {children}
        </TaskContext.Provider>
    )
}

export const useTask = () =>{
    return useContext(TaskContext)
}