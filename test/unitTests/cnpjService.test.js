'use stricts';

import mocha from 'mocha';
import chai from 'chai';
import CnpjService from '../../src/service/cnpjService.js';

const { describe, before, it } = mocha;
const { expect } = chai;

describe('CnpjService Suite Tests', () => {
    let cnpjService = {};

    before(() => {
        cnpjService = new CnpjService();
    });

    it('should generate plain cnpj with length equals 14', () => {
        const cnpj = cnpjService.generate();

        expect(cnpj).not.be.equal(undefined);
        expect(cnpj.length).to.be.equal(14);
    });

    it('should generate formatting cnpj with length equals 14', () => {
        const cnpj = cnpjService.generate(true);

        expect(cnpj).not.be.equal(undefined);
        expect(cnpj.length).to.be.equal(18);
    });

    it('should validate plain cnpj with true', () => {
        const isValid = cnpjService.valid('38966064000114');

        expect(isValid).to.be.equal(true);
    });

    it('should validate plain cnpj with false', () => {
        const isValid = cnpjService.valid('38966064000115');

        expect(isValid).to.be.equal(false);
    });

    it('should validate formatting cnpj with true', () => {
        const isValid = cnpjService.valid('38.966.064/0001-14');

        expect(isValid).to.be.equal(true);
    });

    it('should validate formatting cnpj with false', () => {
        const isValid = cnpjService.valid('38.966.064/0001-15');

        expect(isValid).to.be.equal(false);
    });

    it('should generate valid plain cnpj and pass in validation', () => {
        const cnpj = cnpjService.generate();
        const isValid = cnpjService.valid(cnpj);

        expect(isValid).to.be.equal(true);
        expect(cnpj.length).to.be.equal(14);
    });

    it('should generate valid formatting cnpj and pass in validation', () => {
        const cnpj = cnpjService.generate(true);
        const isValid = cnpjService.valid(cnpj);

        expect(isValid).to.be.equal(true);
        expect(cnpj.length).to.be.equal(18);
    });
});