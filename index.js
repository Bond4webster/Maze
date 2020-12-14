const X = 0; // wall
const _ = 1; // pass
const maze = [
    [X,X,X,X,X,X,X,X,X,X,X,X],
    [X,_,X,_,_,X,_,_,X,_,_,X],
    [X,_,X,X,_,X,_,X,X,_,_,X],
    [_,_,X,_,_,_,_,_,_,_,_,X],
    [X,_,X,_,X,_,X,X,X,_,X,X],
    [X,_,_,_,X,_,_,_,X,_,_,X],
    [X,X,X,X,X,X,X,X,X,X,_,X],
    [X,X,_,_,_,X,X,X,_,_,_,X],
    [X,_,_,X,_,_,_,_,_,X,X,X],
    [X,_,X,X,X,X,X,X,X,X,X,X]
];


function walk(maze,coord){

    const {x,y} = coord
    const pathArr = []

    function path(maze,pathArr,x,y){
        if(x<0||y<0 ||x>maze.length-1 || y>maze[x].length-1) return
        if(maze[x][y]===0)return
        pathArr.push({x,y})
        maze[x][y] = 0
        path(maze,pathArr,x,y+1)
        path(maze,pathArr,x,y-1)
        path(maze,pathArr,x+1,y)
        path(maze,pathArr,x-1,y)
        return
    }

    path(maze,pathArr,x,y)


    pathArr.shift()

    const ind = pathArr.findIndex(e=>e.x===0 ||e.y===0 ||e.x===maze.length-1 || e.y===maze[x].length-1)
    if(ind === -1) return 'There is no way out in the maze'
    pathArr.splice(ind+1,pathArr.length-ind)

    const revArr = pathArr.reverse()

    let newPath = [revArr[0]]
    revArr.forEach((e)=>{
        maze[newPath[0].x][newPath[0].y] = 2 // finish point
        const item = newPath[newPath.length-1]
        maze[x][y]=2 // start point
        if((item.x===e.x && Math.abs(item.y-e.y)===1) || (item.y===e.y && Math.abs(item.x-e.x)===1)){
            newPath.push(e)
            maze[e.x][e.y] = 1
        }
    })

    console.log(maze)
}
walk(maze,{x:3,y:0})