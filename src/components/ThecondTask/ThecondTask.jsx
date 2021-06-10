import React, { useState } from 'react'

const ThecondTask = () => {
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [disable, setDisable] = useState(true)
    const [showStart, setShowStart] = useState('none')
    const [path, setPath] = useState([])

    const maze = [
        ['#','#','#','#','#','#','#','#','#'],
        ['#','+','+','+','#','+','+','+','#'],
        ['#','+','#','+','#','+','#','+','#'],
        ['+','+','#','+','0','+','#','+','#'],
        ['#','#','#','+','#','#','#','+','#'],
        ['#','#','+','+','#','#','#','#','#'],
        ['#','#','+','#','#','#','#','#','#'],
        ['#','#','#','#','#','#','#','#','#']
    ]

    let startPoint = {x:0, y:0}
    let currentPoint = {x:0, y:0}

    for(let i=0; i<maze.length; i++){
        if(maze[i].indexOf('0')!==-1){
            startPoint.x = maze[i].indexOf('0')
            startPoint.y = i
            currentPoint = {x:startPoint.x, y:startPoint.y}
            break
        }
    }

    const findStart = () => {
        setX(startPoint.x)
        setY(startPoint.y)
        setDisable(false)
        setShowStart('block')
    }
    
    let route = []
    let deadPoints = []

    //look arond functions
    const lookUp = () => {
        if (maze[currentPoint.y-1] === undefined) {
            return 'EXIT'
        }
        if(deadPoints.length !== 0){    //checking for deadpoints
            for(let i=0; i<deadPoints.length; i++){
                if (deadPoints[i].y === currentPoint.y-1 && deadPoints[i].x === currentPoint.x){    //checking if next point is deadpoint
                    return false;
                }
            }
        }
        
        return maze[currentPoint.y-1][currentPoint.x]==='+' ?  true : false; 
    }
    const lookRight = () => {
        if (maze[currentPoint.y][currentPoint.x+1] === undefined) {
            return 'EXIT'
        }
        if(deadPoints.length !== 0){
            for(let i=0; i<deadPoints.length; i++){
                if (deadPoints[i].y === currentPoint.y && deadPoints[i].x === currentPoint.x+1){
                    return false;
                }
            }
        }
        return maze[currentPoint.y][currentPoint.x+1]==='+' ?  true : false
    }
    const lookDown = () => {
        if (maze[currentPoint.y+1] === undefined) {
            return 'EXIT'
        }
        if(deadPoints.length !== 0){
            for(let i=0; i<deadPoints.length; i++){
                if (deadPoints[i].y === currentPoint.y+1 && deadPoints[i].x === currentPoint.x){
                    return false;
                }
            }
        }
        
        return maze[currentPoint.y+1][currentPoint.x]==='+' ?  true : false 
    }
    const lookLeft = () => {
        if (maze[currentPoint.y][currentPoint.x-1] === undefined) {
            return 'EXIT'
        }
        if(deadPoints.length !== 0){
            for(let i=0; i<deadPoints.length; i++){
                if (deadPoints[i].y === currentPoint.y && deadPoints[i].x === currentPoint.x-1){
                    return false;
                }
            }
        }
        
        return maze[currentPoint.y][currentPoint.x-1]==='+' ?  true : false
    }
    // move functions
    const moveUp = () => {
        currentPoint.y -= 1 
        route.push('Up')
        if(lookLeft()==='EXIT' || lookUp()==='EXIT' || lookRight()==='EXIT'){
            return setPath(route);
        } else if(lookLeft()){
            return moveLeft()
        } else if (lookUp()) {
            return moveUp()
        } else if (lookRight()) {
            return moveRight()
        } else {
            deadPoints.push(currentPoint)
            currentPoint = {x:x, y:y}
            route = []
            return findExit()
        }
    }
    const moveRight = () => {
        currentPoint.x += 1
        route.push('Right')
        if(lookUp()==='EXIT' || lookRight()==='EXIT' || lookDown()==='EXIT'){
            return setPath(route);
        } else if(lookUp()){
            return moveUp()
        } else if (lookRight()) {
            return moveRight()
        } else if (lookDown()) {
            return moveDown()
        } else {
            deadPoints.push(currentPoint)
            currentPoint = {x:x, y:y}
            route = []
            return findExit()
        }
    }
    const moveDown = () => {
        currentPoint.y += 1
        route.push('Down')
        if(lookRight()==='EXIT' || lookDown()==='EXIT' || lookLeft()==='EXIT'){
            return setPath(route);
        } else if(lookRight()){
            return moveRight()
        } else if (lookDown()) {
            return moveDown()
        } else if (lookLeft()) {
            return moveLeft()
        } else {
            deadPoints.push(currentPoint)
            currentPoint = {x:x, y:y}
            route = []
            return findExit()
        }
    }
    const moveLeft = () => {
        currentPoint.x -= 1
        route.push('Left')
        if(lookDown()==='EXIT' || lookLeft()==='EXIT' || lookUp()==='EXIT'){
            return setPath(route);
        } else if(lookDown()){
            return moveDown()
        } else if (lookLeft()) {
            return moveLeft()
        } else if (lookUp()) {
            return moveUp()
        } else {
            deadPoints.push(currentPoint)
            currentPoint = {x:x, y:y}
            route = []
            return findExit()
        }
    }

    const findExit = () => {
        setDisable(true)
        if(lookRight()){
            return moveRight()
        } else if(lookDown()){
            return moveDown()
        } else if(lookLeft()){
            return moveLeft()
        } else if(lookUp()){
            return moveUp()
        } else{
            return setPath(['Its a trap!!!']);
        }
    }
    return <div style={{maxWidth:'500px', margin:'0 auto', boxShadow:'0 0 10px grey', padding:'10px', borderRadius:'10px'}}>
        <h1 style={{margin: '0 0 15px', textShadow: '5px 5px 5px grey'}}>Task 2</h1>
        <div className='mazeBox'>
            {maze.map((item, index) => (
                <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}} key={index}>{item.map((cell, id) => (
                    <span style={{padding:'0 5px', margin:'0 5px', fontSize:'25px', fontWeight:'bold'}} key={id}>{cell}</span>
                ))}</div>
            ))}
        </div>
        <label style={{display:`${showStart}`}}>Start in: x={x+1} and y={y+1}</label>
        <button style={{margin:'10px 20px'}} onClick={findStart}>Find start</button>
        <button disabled={disable} onClick={findExit}>Start</button>
        <p>Result: {path.map((item, index)=>(
            <span key={index}> =&gt; {item}</span>
        ))}</p>
    </div>
}

export default ThecondTask