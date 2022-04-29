
 
class Board{
    constructor(width, height) {
    this.width=width;
    this.height=height;
    this.playing=false;
    this.game_over=false;
    this.bars=[];
    this.ball=null
    }


    get elements(){
        let elements=this.bars;
        elements.push(this.ball);
        return elements;
            
    
    }
}

class Bar{
    constructor(x,y,width,height,board){
    this.x=x
    this.y=y
    this.width=width
    this.height=height
    this.board=board
    this.board.bars.push(this)
    this.kind= "square"
    this.speed=10

}

    down(){

    }

    up() {
        
    }
}

class BoardView{
    constructor(canvas,board){
    this.canvas=canvas;
    this.canvas.width=board.width;
    this.canvas.height=board.height;
    this.board=board;
    this.ctx=canvas.getContext("2d");
    }

    draw() {
        for (let index = this.board.elements.length-1; index>=0;index--) {
           let  el=this.board.elements[index]
           this.drawElement(this.ctx,el)
            
        }
        
    }
    drawElement(ctx,element) {
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
        
                case "square":
                    ctx.fillRect(element.x,element.y,element.width,element.height)
                    break
            }
        }

    } 


}







window.addEventListener("load",main)



function main(){
    
    let board=new Board(800,400);
    let bar=new Bar(20,100,40,100,board)
    let bar2=new Bar(720,100,40,100,board)
    let canvas=document.getElementById("canvas",board)
    let board_view=new BoardView(canvas,board);
    board_view.draw()

    
      
}