import styles from './Home.module.scss'

import { CreateTask } from '../Components/CreateTask'
import useWindowDimensions from '../contexts/useWindowDimensions'
import {useTask } from '../contexts/TaskContext'
import {useState} from 'react'

import FooterController from '../Components/FooterController'
import FooterMobile from '../Components/FooterMobile'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Home() {
  const [filter,setFilter] = useState(0)
  const { currentTaskList,changeStateTask,isDark,changeMode,handleOnDrag } = useTask();
  const { width } = useWindowDimensions();

  return (
    <div className={isDark? styles.containerDark:styles.containerLight}>
      <div className={styles.containerHeader}></div>
      <div className={styles.containerBody}>

        <div className={styles.containerHeaderInfo}>
          <h1>TODO</h1>
          <img src={isDark?"icon-sun.svg":"icon-moon.svg"} onClick={()=>changeMode()} className={styles.logoMode}/>
        </div>
        <CreateTask />
        <br /><br />
        <div className={styles.listContainer}>
          
          {filter==0?
          (<DragDropContext onDragEnd={handleOnDrag}>
            <Droppable droppableId="tasks">
              {(provided)=>(
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {(currentTaskList(0).map((item,index)=>{
                    return (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided)=>(
                          <li {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef} onClick={()=>changeStateTask(item.id)}>
                          <input type="checkbox" className={styles.checkAround} checked={item.isDone}/>
                          {item.isDone? (<label className={styles.finishedTask}><s>{item.title}</s></label>):<label className={styles.notFinishedTask}>{item.title}</label>}
                        </li>
                        )}
                        
                      </Draggable>
                    )
                  }))}
                  {provided.placeholder}
              </ul>
              )}
            </Droppable>
          </DragDropContext>):(
            <ul>
            {(currentTaskList(filter).map(item=>{
                return (
                  <li key={item.id} onClick={()=>changeStateTask(item.id)}>
                    <input type="checkbox" className={styles.checkAround} checked={item.isDone}/>
                    {item.isDone? (<label className={styles.finishedTask}><s>{item.title}</s></label>):<label className={styles.notFinishedTask}>{item.title}</label>}
                  </li>
                )
              }))}
          </ul>
          )}

          <FooterController filter={filter} setFilter={setFilter}/>
        </div>
        {!width? "":width<=600? (<FooterMobile filter={filter} setFilter={setFilter}/>):""}
      </div>
    </div>
  )
}
