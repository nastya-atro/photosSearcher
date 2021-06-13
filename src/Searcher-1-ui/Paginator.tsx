import React, { useState } from 'react';
import s from './Paginator.module.css'
import cn from "classnames"

type PropsType={
    totalPhotosCount: number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    portionSize?: number
}

const Paginator:React.FC<PropsType> = ({ totalPhotosCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pageNumber = Math.ceil(totalPhotosCount / pageSize)

    let page:Array<number> = [];

    for (let i = 1; i <= pageNumber; i++) {
        page.push(i)
    }

    let portionCount = Math.ceil(pageNumber / portionSize);
    let [numberPortion, setnumberPortion] = useState(1)
    let leftPortionPageNumber = (numberPortion - 1) * portionSize + 1;
    let rightPortionPageNumber = numberPortion * portionSize;


    return (
        <div className={s.paginator}>
            {numberPortion > 1 && <button onClick={() => { setnumberPortion(numberPortion - 1) }}>
                <i className="fas fa-angle-double-left"></i>
            </button>}
            {page
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={cn({
                        [s.activePage]: currentPage === p
                    }, s.pageNumber)}
                        key={p}
                        onClick={(e) => { onPageChanged(p) }}
                    >{p} </span>
                })}
            {numberPortion < portionCount && <button onClick={() => { setnumberPortion(numberPortion + 1) }}>
                <i className="fas fa-angle-double-right"></i>
            </button>}
        </div>
    )
}

export default Paginator