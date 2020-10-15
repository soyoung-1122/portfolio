class Calculator {

    isFloat = false; //소수점 다중입력 방지하기 위해
    hasOP = false; //오퍼레이터 입력과 변경을 구분하기 위해
    checkChangeOP = false;
    status = ''; //입력 과정을 출력할 변수     
    operator = '';
    inputNum = '0';
    number1 = 0;
    number2 = 0;


    showStatusBar(num) {
        if(this.checkChangeOP) {
            this.status = this.status.slice(0,-1) + this.operator;
        } else {
            this.status += num + this.operator;
        }
        document.getElementById("statusBar").innerHTML = this.status;
    }
    showResult(result) {
        document.getElementById("result").innerHTML = result;
        console.log(result)
    }

    setNumber() {
        if(this.number1){
            this.number2 = Number(this.inputNum);
        } else {
            this.number1 = Number(this.inputNum);
        } 
        this.inputNum = '0';
        this.isFloat = false;
    }

    getInputNum(num) {
        if(this.inputNum.length == 10) return false; 
        this.inputNum += num;    
        if(this.inputNum.charAt(0) == '0' && this.inputNum.charAt(1) != '.') {
            this.inputNum = this.inputNum.substring(1);
        }    
        this.showResult(this.inputNum);
        this.checkChangeOP = false;
    }

    getInputOP(op) {
        if(!this.checkChangeOP) this.setNumber();
        if(this.hasOP) {
            this.getResult();
        }
        else this.hasOP = true;
        this.operator = op;
        this.showStatusBar(this.number2 || this.number1);
        this.checkChangeOP = true;
        console.log('num1', this.number1, 'num2', this.number2, 'op', this.operator);
    }

    getResult() {
        if(!this.checkChangeOP) {
            switch(this.operator) {
                case '/' :
                    this.number1 /= this.number2;
                    if(this.number1 == Infinity) this.number1 = 0;   
                    break;
                case 'x' :
                    this.number1 *= this.number2;
                    break;
                case '-' :
                    this.number1 -= this.number2;
                    break;
                case '+' :
                    this.number1 += this.number2;
            }
            if(this.number1.toString().length >= 10) {
                this.showResult(this.number1.toExponential(4));
            } else {
                this.showResult(this.number1);
            }
        } 
    }

    clearAll() {    
        this.checkChangeOP = this.isSecondNum = this.hasOP = this.isFloat = false; 
        this.operator = this.status = '';       
        this.inputNum = '0';
        this.number2 = this.number1 = '';
        this.showResult(0);
        this.showStatusBar();
    }   

    clear(event) {
        if(event.button == 2) {
            this.inputNum = this.inputNum.slice(0,this.inputNum.length-1);
            if(this.inputNum == '') this.inputNum = '0';
            this.showResult(this.inputNum);
        }
    }

    checkDecimalPoint() {
        if(!this.isFloat) {         
            this.isFloat = true;        
            this.getInputNum('.');
        } 
    }

    getEqual() {
        console.log('equal-top','num1', this.number1, 'num2', this.number2, 'op', this.operator);
        if(!this.number2) this.setNumber();
        this.getResult();
        this.checkChangeOP = false;
        console.log('clicked');
        console.log('equal-btm','num1', this.number1, 'num2', this.number2, 'op', this.operator);
    }
}
let soculator = new Calculator();