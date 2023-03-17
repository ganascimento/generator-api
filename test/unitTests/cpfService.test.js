'use stricts';
import mocha from 'mocha';
import chai from 'chai';
import CpfService from '../../src/service/cpfService.js';

const { describe, it, before } = mocha;
const { expect } = chai;

describe('CpfService Suite Tests', () => {
    let cpfService = {};

    before(() => {
        cpfService = new CpfService();
    });

    it('should generate plain cpf with length equals 11', () => {
        const cpf = cpfService.generate();

        expect(cpf).not.be.equal(undefined);
        expect(cpf.length).to.be.equal(11);
    });

    it('should generate with formatting cpf with length equals 14', () => {
        const cpf = cpfService.generate(true);

        expect(cpf).not.be.equal(undefined);
        expect(cpf.length).to.be.equal(14);
    });

    it('should validate plain cpf with true', () => {
        const isValid = cpfService.valid('12376755107');

        expect(isValid).to.be.equal(true);
    });

    it('should validate plain cpf with false', () => {
        const isValid = cpfService.valid('12376755106');

        expect(isValid).to.be.equal(false);
    });

    it('should validate formatting cpf with true', () => {
        const isValid = cpfService.valid('444.444.417-71');

        expect(isValid).to.be.equal(true);
    });

    it('should validate formatting cpf with false', () => {
        const isValid = cpfService.valid('444.444.417-72');

        expect(isValid).to.be.equal(false);
    });

    it('should generate valid plain cpf and pass in validation', () => {
        const cpf = cpfService.generate();
        const isValid = cpfService.valid(cpf);

        expect(isValid).to.be.equal(true);
        expect(cpf.length).to.be.equal(11);
    });

    it('should generate valid formatting cpf and pass in validation', () => {
        const cpf = cpfService.generate(true);
        const isValid = cpfService.valid(cpf);

        expect(isValid).to.be.equal(true);
        expect(cpf.length).to.be.equal(14);
    });
});