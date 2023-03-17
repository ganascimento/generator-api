'use stricts';

class CpfService {
    generate(isFormated) {
        const num1 = this.#randonNumber();
        const num2 = this.#randonNumber();
        const num3 = this.#randonNumber();    
        const dig1 = this.#dig(num1, num2, num3);
        const dig2 = this.#dig(num1, num2, num3, dig1);
    
        if (isFormated)
            return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
        
        return `${num1}${num2}${num3}${dig1}${dig2}`;
    }

    valid(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if  (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let result = true;
        
        [9,10].forEach((j) => {
            let soma = 0, r;
            cpf.split(/(?=)/).splice(0,j).forEach((e, i) => {
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r <2)?0:11-r;
            if (r != cpf.substring(j, j+1)) result = false;
        });

        return result;
    }

    #dig(n1, n2, n3, n4) {
        const nums = n1.split("").concat(n2.split(""), n3.split(""));
        let x = 0;
        
        if (n4 !== undefined) nums[9] = n4;
        for (let i = (n4 !== undefined ? 11:10), j = 0; i >= 2; i--, j++) {
          x += parseInt(nums[j]) * i;
        }
        
        const y = x % 11;
        return y < 2 ? 0 : 11 - y; 
    }
      
    #randonNumber() {
        const aleat = Math.floor(Math.random() * 999);
        return ("" + aleat).padStart(3, '0'); 
    }
}

export default CpfService;
