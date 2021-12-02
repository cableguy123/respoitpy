import java.util.*;
class Solution {
    public int solution(String s) {
      int answer = 0;
      String result = "";
      String[] E = {"zero","one","two","three","four","five","six","seven","eight","nine"};
      while(s.length()!=0) {
        if(Character.isDigit(s.charAt(0))) {
          for(int i=0; i<E.length; i++) {
           int n = s.indexOf(E[i]); // 정수 변환해서 저장변수
           if(n == 0) {
             int len =E[i].length(); // 0이 나왔을시 저장변수
             result += i;
             s = s.substring(len); // 0저장


           }
          }

        }
        else {
          result += s.charAt(0);
          s = s.substring(1);

        } // s.length() 에서 0 이 나올시


      }
      answer = Integer.parseInt(result);
      return answer;
    }
}