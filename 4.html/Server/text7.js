const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display--for-advanced');
const operator = document.querySelector('.operator');
const buttons = calculator.querySelector('.calculator__buttons');


// 연산처리 
function calculate(n1,operator,n2) {
  let result = 0;
  if(operator === '+') {
    result = Number(n1) + Number(n2);
  }
  else if(operator === '-') {
    result = Number(n1) - Number(n2);
  }
  else if(operator === '*') {
    result = Number(n1) * Number(n2);
  }
   if(operator === '/') {
    result = Number(n1) / Number(n2);
  }
  else {
    return String(result);
  }
}
// 연산처리 수행 끝
let firstNum = '';
let operatorAdvanced = ''; // 연산자 저장 
let previousKey = ''; // 연산자 
let previousNum = ''; // 숫자
// 버튼처리
buttons.addEventListener('click',function(event) {
const target = event.target; // html 불러옴
const action = target.classList[0]; // 클래스명 불러옴
const buttonContext = target.textContent; // 텍스트 불러옴
if(target.matches('button')) {
  if(action === 'number') {
    if(display.textContent === '0' && operatorAdvanced === '') {
    display.textContent = buttonContext; // display에 있는것들 텍스트로 불러옴
    firstNum = display.textContent; // firstNum에 display있는것들 저장
    } // 초기화면 display.textContent가 0이거나 아에 없을때 operatorAdvanced 0을 지웠을때
    else if(display.textContent !== '0' && operatorAdvanced === '') {
      display.textContent = display.textContent + buttonContext; 
      firstNum = display.textContent;
    
    }
    else if(display.textContent !== '0' && operatorAdvanced !== '') {
     if(previousKey === operatorAdvanced) {
       display.textContent = buttonContext;
       previousKey = display.textContent;
       previousNum = display.textContent;
     } // previousKey도 연산 수행 
     else if(previousKey !== operatorAdvanced) {
       display.textContent = display.textContent + buttonContext;
       previousNum = display.textContent;
     } 
     


    }  // 숫자도없고 연산처리를 안하고있을때

  }
  if(action === 'operator') {
    operatorAdvanced = buttonContext;
    previousKey = operatorAdvanced;
  }
  if(action === 'clear') {
    display.textContent = '0',
    firstNum = '',
    operatorAdvanced = '',
    previousKey = '',
    previousNum = '';
  }
  if(action === 'calculate') {
    if(firstNum !== '' && operatorAdvanced === '') {
      display.textContent === firstNum;
    }
    else if(firstNum !== '' && previousNum === '') {
      display.textContent = calculate(display.textContent,operatorAdvanced,display.textContent);
    }
    else if(previousKey === display.textContent) {
      display.textContent = calculate(firstNum,operatorAdvanced,previousNum);
    }
    else if(previousKey !== display.textContent && previousNum !== '') {
      display.textContent = calculate(display.textContent,operatorADvanced,previousNum);
    }
    else if(previousKey !== display.textContent && previousNum === '') {
      display.textContent = firstNum;
    }

  }

}
});
