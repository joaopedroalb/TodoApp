import styles from './Home.module.scss'

import { CreateTask } from '../Components/CreateTask'
import useWindowDimensions from '../contexts/useWindowDimensions'
import {useTask } from '../contexts/TaskContext'
import {useState} from 'react'

import FooterController from '../Components/FooterController'
import FooterMobile from '../Components/FooterMobile'

export default function Home() {
  const [filter,setFilter] = useState(0)
  const { currentTaskList,changeStateTask,taskLeft,clearTaskFinished } = useTask();
  const { height, width } = useWindowDimensions();

  return (
    <div className={styles.containerDark}>
      <div className={styles.containerHeader}></div>
      <div className={styles.containerBody}>

        <div className={styles.containerHeaderInfo}>
          <h1>TODO</h1>
          <img src="icon-sun.svg" />
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
        {!width? "":width<=600? (<FooterMobile/>):""}
      </div>
    </div>
  )
}
