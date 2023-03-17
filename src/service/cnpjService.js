'use stricts';

class CnpjService {
    generate(isFormated) {
        const n = 9;
        const n1 = this.#randonNumber(n);
        const n2 = this.#randonNumber(n);
        const n3 = this.#randonNumber(n);
        const n4 = this.#randonNumber(n);
        const n5 = this.#randonNumber(n);
        const n6 = this.#randonNumber(n);
        const n7 = this.#randonNumber(n);
        const n8 = this.#randonNumber(n);
        const n9 = this.#randonNumber(n);
        const n10 = this.#randonNumber(n);
        const n11 = this.#randonNumber(n);
        const n12 = this.#randonNumber(n);

        let d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
        d1 = 11 - (this.#mod(d1,11));
        if (d1 >= 10) d1 = 0;

        let d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
        d2 = 11 - ( this.#mod(d2,11) );
        if (d2>=10) d2 = 0;

        if (isFormated)
            return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
        return`${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`
    }

    valid(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,''); 
        if (cnpj == '' || cnpj.length != 14) return false;
    
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
            
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

        return true;
    }

    #randonNumber(n) {
        let ranNum = Math.round(Math.random()*n);
        return ranNum;
    }

    #mod(div, divisor)
    {
        return Math.round(div - (Math.floor(div/divisor)*divisor));
    }
}

export default CnpjService;