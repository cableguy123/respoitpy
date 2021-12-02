package Client;
 // System.in



import java.io.BufferedReader;
import java.io.IOException;// 입출력예외 처리
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SendThread extends Thread {
 private Socket m_Socket;
 @Override
 public void run() {
   super.run();
  
   try {
     BufferedReader tmp_buf = new BufferedReader(new InputStreamReader(System.in));
     PrintWriter sendWriter = new PrintWriter(m_Socket.getOutputStream());
   
    String sendString;
     while(true) {
      sendString = tmp_buf.readLine(); //키보드 출력값 가져옴
      sendWriter.println(sendString);
      sendWriter.flush();




     }

   }
   catch(IOException e) {
     e.printStackTrace();
   }
   

 }

 public void setSocket(Socket _socket) {
  m_Socket = _socket;
}
  
}
