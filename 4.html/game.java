public class game {
  public static void main(String[] args) { // static void 클래스 메소드
    game gg = new game(); // 객체 생성
    Person person = new Person(); // 인스턴스 생성
    Child child = new Child();
    Senior senior = new Senior();
    person.cry();
    child.cry();
    senior.cry();

  }
  class Person  {
    void cry() { // void cry() 인스턴스 메소드
      System.out.println("흑흑");
    }
  }
  class Child extends Person {
    @Override
    protected void cry() { // 클래스 변수
      System.out.println("잉이");
    }
  }
  class Senior extends Person {
    @Override
    public void cry() {
      System.out.println("훌쩍훌쩍");
    }
  }
}
//오버라이딩하고자 하는 메소드의 이름, 매개변수, 리턴 값이 모두 같아야 한다. 