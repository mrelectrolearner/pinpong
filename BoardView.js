import {hit} from "./hit.js"
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

            switch(element.kind){
        
                case "circle":
                    ctx.beginPath()
                    ctx.arc(element.x,element.y,element.radius,0,7)
                    ctx.fill()
                    ctx.closePath()
                    break
            }
            
        

    }  

    clean( ){
        this.ctx.clearRect(0,0,this.board.width,this.board.height)
    }
    play(){
        if(this.board.playing){
            this.clean()
            this.draw()
            this.check_collisions()
            this.board.ball.move()

        }
        
    }
    check_collisions(){
        for(let i=this.board.bars.length-1;i>=0;i--){
            let bar=this.board.bars[i]
            if(hit(bar,this.board.ball)){
                this.board.ball.collision(bar)
            }
        }
    }


}
export {BoardView}