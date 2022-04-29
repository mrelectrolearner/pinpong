
 
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
        //elements.push(this.ball);
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
        this.y +=this.speed

    }

    up() {
        this.y -=this.speed
    }
    toString(){
        return "x: "+this.x+" y:"+this.y;
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
        
            switch(element.kind){
        
                case "square":
                    ctx.fillRect(element.x,element.y,element.width,element.height)
                    break
            }
        

    }  

    clean( ){
        this.ctx.clearRect(0,0,this.board.width,this.board.height)
    }
    play(){
        this.clean()
        this.draw()
    }


}



let board=new Board(800,400);
let bar=new Bar(20,100,40,100,board)
let bar2=new Bar(720,100,40,100,board)
let canvas=document.getElementById("canvas",board)
let board_view=new BoardView(canvas,board);


document.addEventListener("keydown", e=> {
    if(e.key==="ArrowUp"){
        bar.up()
    }else if(e.key==="ArrowDown"){
        bar.down();
    }else if(e.key==="w"){
        bar2.up()
    }else if(e.key==="s"){
        bar2.down();
    }   
    console.log(bar)
})


window.requestAnimationFrame(controller)
function controller() {
    board_view.play()
   
    window.requestAnimationFrame(controller) 
}

