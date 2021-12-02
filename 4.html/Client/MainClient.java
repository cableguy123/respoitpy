package Client;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
public class Client {
public static void main(String[] args) {
  try {
    Socket c_socket = new Socket("192,168,1,01",8888);
    InputStream input_data = c_socket.getInputStream();
    byte[] digital = new byte[100];
    input_data.read(digital);
    System.out.println(new String(digital)); // 형변환
    c_socket.close();


  }
  catch(IOException e) {
    e.printStackTrace();
  }
}
}
