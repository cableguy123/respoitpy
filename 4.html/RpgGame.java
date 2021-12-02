import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import java.io.BufferedInputStream;
import java.awt.event.*;
import javax.swing.GrayFilter;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JComboBox.KeySelectionManager;

public class RpgGame {
  public static void main(String[] ar) {
    RpgGame_frame nr = new RpgGame_frame();


  }
}
class RpgGame_frame extends JFrame implements Runnable,KeyListener {
  boolean keyUp = false;
  boolean keyDown = false;
  boolean keyLeft = false;
  boolean keyRight = false;
  boolean playerMove = false;
  Toolkit tk = Toolkit.getDefaultToolkit();
  Image img = new ImageIcon().getImage();
  Image buffimg;
  Graphics gr;
  Thread th;
  int x,y; // 캐릭터 좌표 변수
  int cnt;
  int moveStatus; // 캐릭터가 어디보고있을지 방향변수
  RpgGame_frame() {
    setTitle("테스트");
    setSize(800,600);
    init();
    start();
    Dimension screen = tk.getScreenSize();
    int xpos = (int)(screen.getWidth() / 2 - getWidth() / 2);
    int ypos = (int)(screen.getHeight() /2 - getHeight() / 2 );
    setLocation(xpos,ypos);
    setResizable(false);
    setVisible(true);

  }
  public void init() {
    x = 100;
    y = 100;
    moveStatus = 2;
    // 0이 위쪽 1이 오른쪽 2가 아래쪽 3 왼쪽

  }
  public void start() {
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    this.addKeyListener(this);
    th = new Thread(this);
    th.start();

  }
  public void run() {
    while(true) {
      try{
        keyProcess();
        repaint();
        Thread.sleep(20);
        cnt++;
      }
      catch(Exception e)  {}
    }
  }
  public void paint(Graphics g) {
    buffimg = createImage(800,600);
    Graphics gc;
    gc = buffimg.getGraphics();
    update(g);
  }
  public void update(Graphics g) {
    DrawImg();
    g.drawImage(buffimg,0,0,this);

  }
  public void DrawImg() {
  Graphics gc;
  gc.setFont(new Font("Default",Font.BOLD,20));
  gc.drawString(Integer.toString(cnt),50,50);
  gc.drawString(Integer.toString((playerMove)?1:0),200,50);
  MoveImage(img,x,y,100,150);
  // 캐릭터를 걸어가게 하기위해 추가로만든 메소드
  }
  public void MoveImage(Image img,int x,int y,int width,int height) {
    Graphics gc;
    gc.setClip(x,y,width,height);
  } //  케릭터 이미지, 케릭터 위치, 케릭터 크기를 받습니다.

if(playerMove) {
  Graphics gc;
  if(cnt / 10 % 4 == 0) {
    gc.drawImage(img,x - (WIDTH * 0), y - (HEIGHT * moveStatus),this);

  }
  else if(cnt / 10 % 4 == 1) {
    gc.drawImage(img,x - (width * 1), y - (height * moveStatus),this);
  }
  else if(cnt / 10 % 4 == 2) {
    gc.drawImage(img,x - (width * 2), y - (height * moveStatus),this);
  }
  else if(cnt / 10 % 4 == 3) {
    gc.drawImage(img,x - (width * 3), y - (height * moveStatus),this);
  }
  else  {
    gc.drawImage(img,x - (width * 1), y - (height * moveStatus),this);
  }
  }
  public void keyProcess() {
    playerMove = false;
    if(keyUp) {
      playerMove = true;
      y -= 8;
      moveStatus = 0;
    }
    if(keyDown) {
      playerMove = true;
      y += 8;
      moveStatus = 2;
    }
    if(keyLeft) {
      playerMove = true;
      x -= 8;
      moveStatus = 3;
    }
    if(keyRight) {
      playerMove = true;
      x += 8;
      moveStatus = 1;
    }
  }
  public Void keyReleased(KeyEvent e) {
    switch(e.getKeyCode()) {
    case KeyEvent.VK_LEFT :
    keyLeft = false;
    break;
    case KeyEvent.VK_RIGHT :
    keyLeft = false;
    break;
    case KeyEvent.VK_UP :
    keyLeft = false;
    break;
    case KeyEvent.VK_DOWN :
    keyLeft = false;
    break;
    }
  }

public Void keyTyped(KeyEvent e) {

}






  
  


  

