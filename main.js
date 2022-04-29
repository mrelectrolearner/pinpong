
 
class Board{
    constructor(width, height) {
    this.width=width;
    this.height=height;
    this.playing=false;
    this.game_over=false;
    this.bars=[];
    this.ball=null
    this.playing=false
    }


    get elements(){
        let elements=this.bars.map(bar=>{return bar});
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
        this.y +=this.speed

    }

    up() {
        this.y -=this.speed
    }
    toString(){
        return "x: "+this.x+" y:"+this.y;
    }
}

class Ball{
    constructor(x,y,radius,board){
        this.x=x
        this.y=y
        this.radius=radius
        this.speed_y=0;
        this.speed_x=3
        this.board=board
        this.direction=1
        this.bounce_angle=0
        this.max_bounce_angle=Math.PI/12
        this.speed=3

        board.ball=this
        this.kind="circle"
    }

    move(){
        this.x+=(this.speed_x*this.direction)
        this.y+=(this.speed_y)
    }

    collision(bar){
        let relative_intersect_y=(bar.y+(bar.height/2))-this.y
        let normalzed_intersect_y=relative_intersect_y/(bar.height/2)
        this.bounce_angle=normalzed_intersect_y*this.max_bounce_angle
        this.speed_y=this.speed*-Math.sin(this.bounce_angle)
        this.speed_x=this.speed*Math.cos(this.bounce_angle)

        if(this.x>(this.board.width/2)) this.direction=-1
        else this.direction=1


    }

    get width(){
        return this.radius*2
    }
    get height(){
        return this.radius*2
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
function hit(a,b) {
    let hit=false
    if(b.x+b.width>=a&& b.x<a.x+a.width){
        if(b.y+b.height>=a.y && b.y <a.y+a.height){
            hit=true
        }
    }
    if(b.x<=a.x&& b.x +b.width>=a.x+a.height){
        if(b.y <=a.y && b.y +b.height>=a.y+a.height){
            hit=true
        }
    }
    if(a.x<=b.x&& a.x +a.width>=b.x+b.width){
        if(a.y<=b.y&&a.y+a.height>=b.y+b.height){
            hit=true
        }
    }
    return hit
}



let board=new Board(800,400);
let bar=new Bar(20,100,40,100,board)
let bar2=new Bar(720,100,40,100,board)
let canvas=document.getElementById("canvas",board)
let board_view=new BoardView(canvas,board);
let ball=new Ball(350,100,10,board)


document.addEventListener("keydown", e=> {
    if(e.key==="ArrowUp"){
        e.preventDefault();
        bar.up()
    }else if(e.key==="ArrowDown"){
        e.preventDefault();
        bar.down();
    }else if(e.key==="w"){
        e.preventDefault();
        bar2.up()
    }else if(e.key==="s"){
        e.preventDefault();
        bar2.down();

    }else if(e.key==="Enter"){
        board.playing=!board.playing
    }
    console.log(e.key)
})

board_view.draw();  
window.requestAnimationFrame(controller)
function controller() {
    board_view.play()
   
    window.requestAnimationFrame(controller) 
}

