import React, { useCallback, useEffect, useState } from "react";


const Try =()=>{
    const [count,setCount] = useState(0)
    useEffect(()=>{
        setCount(100)
    })
    const memoizedCallback = useCallback(()=>setCount(10),[setCount])
    const memoizedValue = useMemo(()=>calculation(count),[count])
    return(
        <div>

        </div>
    )
}
const arrow = ()=>{
    
}
