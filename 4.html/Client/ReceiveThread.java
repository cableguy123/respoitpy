package Client;
import java.io.BufferedReader;

import java.io.IOException;
import java.io.InputStreamReader;

import java.net.Socket;


public class ReceiveThread extends Thread{
  private Socket m_Socket;
  @Override
  public void run() {
    super.run();
    try {
     BufferedReader tmp_buf = new BufferedReader(new InputStreamReader(m_Socket.getInputStream()));
      // BufferedReader tmp_buf = new BufferedReader(new InputStreamReader(m_Socket.getInputStream()));
      String receiveString;
      while(true) {
        receiveString = tmp_buf.readLine();
        if(receiveString == null) {
          System.out.println("상대방이 없습니다");
          break;
        }
        else {
          System.out.println("상대방이" + receiveString);
        }

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
