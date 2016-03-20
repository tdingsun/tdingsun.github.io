
Dot dot1;
Dot dot2;
Dot dot3;
Dot dot4;
Dot dot5;
Dot dot6;
Dot dot7;
Dot dot8;
Dot dot9;
Dot dot10;
Dot dot11;
Dot dot12;
Dot dot13;
Dot dot14;
Dot dot15;
Dot dot16;
Dot dot17;
Dot dot18;
Dot dot19;
Dot dot20;
Dot dot21;
Dot dot22;
Dot dot23;
Dot dot24;
Dot dot25;
Dot dot26;


int speed = 3;
    int counter = 1;

void setup(){
    


  size(1200, 700);
  
  dot1= new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot2 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot3 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot4 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot5 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
    dot6 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
        dot7 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
          dot8= new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot9 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot10 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot11 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot12 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
    dot13 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
        dot14 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
          dot15= new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot16 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot17 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot18 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot19 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
    dot20 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
        dot21 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
          dot22 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot23 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot24 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
  dot25 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));
    dot26 = new Dot(350, 350, random(-speed, speed), random(-speed,speed));

};

void draw(){
  background(255);
  dot1.create();
  dot1.move();
  dot2.create();
  dot2.move();
  dot3.create();
  dot3.move();
  dot4.create();
  dot4.move();
  dot5.create();
  dot5.move();
    dot6.create();
  dot6.move();
  dot7.create();
  dot7.move();
  dot8.create();
  dot8.move();
  dot9.create();
  dot9.move();
  dot10.create();
  dot10.move();
  dot11.create();
  dot11.move();
  dot12.create();
  dot12.move();
  dot13.create();
  dot13.move();
  dot14.create();
  dot14.move();
    dot15.create();
  dot15.move();
  dot16.create();
  dot16.move();
  dot17.create();
  dot17.move();
  dot18.create();
  dot18.move();
  dot19.create();
  dot19.move();
    dot20.create();
  dot20.move();
  dot21.create();
  dot21.move();
      dot22.create();
  dot22.move();
  dot23.create();
  dot23.move();
  dot24.create();
  dot24.move();
  dot25.create();
  dot25.move();
  dot26.create();
  dot26.move();



  stroke(50,255);
  fill(255, 100);
  /*line(dot1.xpos, dot1.ypos, dot2.xpos, dot2.ypos);
  line(dot1.xpos, dot1.ypos, dot3.xpos, dot3.ypos);
  line(dot1.xpos, dot1.ypos, dot4.xpos, dot4.ypos);
  line(dot1.xpos, dot1.ypos, dot5.xpos, dot5.ypos);
  line(dot2.xpos, dot2.ypos, dot3.xpos, dot3.ypos);
  line(dot2.xpos, dot2.ypos, dot4.xpos, dot4.ypos);
  line(dot2.xpos, dot2.ypos, dot5.xpos, dot5.ypos);
  line(dot3.xpos, dot3.ypos, dot4.xpos, dot4.ypos);
  line(dot3.xpos, dot3.ypos, dot5.xpos, dot5.ypos);
  line(dot4.xpos, dot4.ypos, dot5.xpos, dot5.ypos);
  */

  beginShape(TRIANGLE_STRIP);
vertex(dot1.xpos, dot1.ypos);
vertex(dot2.xpos, dot2.ypos); 
vertex(dot3.xpos, dot3.ypos); 
vertex(dot4.xpos, dot4.ypos); 
vertex(dot5.xpos, dot5.ypos); 
vertex(dot6.xpos, dot6.ypos); 
vertex(dot7.xpos, dot7.ypos);
vertex(dot8.xpos, dot8.ypos);
vertex(dot9.xpos, dot9.ypos); 
vertex(dot10.xpos, dot10.ypos); 
vertex(dot11.xpos, dot11.ypos); 
vertex(dot12.xpos, dot12.ypos); 
vertex(dot13.xpos, dot13.ypos); 
vertex(dot14.xpos, dot14.ypos); 
vertex(dot15.xpos, dot15.ypos);
vertex(dot16.xpos, dot16.ypos); 
vertex(dot17.xpos, dot17.ypos); 
vertex(dot18.xpos, dot18.ypos); 
vertex(dot19.xpos, dot19.ypos); 
vertex(dot20.xpos, dot20.ypos); 
vertex(dot21.xpos, dot21.ypos); 
vertex(dot22.xpos, dot22.ypos);
vertex(dot23.xpos, dot23.ypos); 
vertex(dot24.xpos, dot24.ypos); 
vertex(dot25.xpos, dot25.ypos); 
vertex(dot26.xpos, dot26.ypos); 
vertex(dot2.xpos, dot2.ypos);

endShape();

fill(0, 150);
textSize(72);
text("Hyperfeit",250,350);

};


class Dot {
  float xpos;
  float ypos;
  float xspeed;
  float yspeed;
  
  Dot(float tempXpos, float tempYpos, float tempXspeed, float tempYspeed) {
    xpos = tempXpos;
    ypos = tempYpos;
    xspeed = tempXspeed;
    yspeed = tempYspeed;
  };
  
  void create(){
    noStroke();
    fill(51);
    ellipse(xpos, ypos, 1, 1);
  };
  
  void move(){
    int xdirection = 1;
    int ydirection = 1;
    float time = random(30,50);
    
    if(counter > time){
          xspeed = random(-3, 3);
          yspeed = random(-3, 3);
          counter = 1;
    };
    
    xpos = xpos + xspeed;
    ypos = ypos + yspeed;
    if(xpos > 1100){
      xspeed = xspeed * -xdirection;
    };
    if(xpos < 100){
      xspeed = xspeed * -xdirection;
    };
    if(ypos > 600){
      yspeed = yspeed * -ydirection;
    };
    if(ypos < 100){
      yspeed = yspeed * -ydirection;
    };
    
    counter++;
  }
}