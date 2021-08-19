import styles from './index.module.scss'

import {useTask } from '../../contexts/TaskContext'

export default function FooterController(props:{filter:number,setFilter(int:number):any}){
    const {taskLeft,clearTaskFinished } = useTask();

    const msgItemsLeft = (qtd:number) =>{
        if(qtd<=0) return "All done"
  
        if(qtd == 1) return "1 item left"
  
        return qtd+" items left"
    }

    return(
        <div className={styles.footerAfterList}>
            <label>{msgItemsLeft(taskLeft)}</label>
            <div className={styles.filterContainer}>
                <label onClick={()=>props.setFilter(0)} className={props.filter==0?styles.selectedFilter:""}>All</label>
                <label onClick={()=>props.setFilter(1)} className={props.filter==1?styles.selectedFilter:""}>Active</label>
                <label onClick={()=>props.setFilter(2)} className={props.filter==2?styles.selectedFilter:""}>Completed</label>
            </div>
            <label onClick={()=>clearTaskFinished()} className={styles.clearLbl}>Clear Completed</label>
        </div>
    )
}