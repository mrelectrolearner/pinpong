import {Board} from "./Board.js"
import {Bar} from "./Bar.js"
import {Ball} from "./Ball.js"
import {BoardView} from "./BoardView.js"


let board=new Board(800,400);
let bar=new Bar(20,100,40,100,board)
let bar2=new Bar(720,100,40,100,board)
let canvas=document.getElementById("canvas",board)
let board_view=new BoardView(canvas,board);
let ball=new Ball(350,100,10,board)


document.addEventListener("keydown", e=> {
    if(e.key==="ArrowUp"){
        e.preventDefault();
        bar2.up()
    }else if(e.key==="ArrowDown"){
        e.preventDefault();
        bar2.down();
    }else if(e.key==="w"){
        e.preventDefault();
        bar.up()
    }else if(e.key==="s"){
        e.preventDefault();
        bar.down();

    }else if(e.key==="Enter"){
        board.playing=!board.playing
    }

})

board_view.draw();  
window.requestAnimationFrame(controller)


function controller() {
    board_view.play()
   
    window.requestAnimationFrame(controller) 
}

