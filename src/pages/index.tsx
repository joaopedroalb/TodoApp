import styles from './Home.module.scss'

import { CreateTask } from '../Components/CreateTask'
import useWindowDimensions from '../contexts/useWindowDimensions'
import {useTask } from '../contexts/TaskContext'
import {useState} from 'react'

import FooterController from '../Components/FooterController'
import FooterMobile from '../Components/FooterMobile'

export default function Home() {
  const [filter,setFilter] = useState(0)
  const { currentTaskList,changeStateTask,isDark,changeMode } = useTask();
  const { width } = useWindowDimensions();

  return (
    <div className={isDark? styles.containerDark:styles.containerLight}>
      <div className={styles.containerHeader}></div>
      <div className={styles.containerBody}>

        <div className={styles.containerHeaderInfo}>
          <h1>TODO</h1>
          <img src={isDark?"icon-sun.svg":"icon-moon.svg"} onClick={()=>changeMode()}/>
        </div>
        <CreateTask />
        <br /><br />
        <div className={styles.listContainer}>
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
          <FooterController filter={filter} setFilter={setFilter}/>
        </div>
        {!width? "":width<=600? (<FooterMobile filter={filter} setFilter={setFilter}/>):""}
      </div>
    </div>
  )
}
