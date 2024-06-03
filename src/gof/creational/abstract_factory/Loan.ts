import crypto from 'crypto';

export default abstract class Loan {
  abstract rate: number;

  constructor(
    readonly loanId: string,
    readonly amount: number, 
    readonly income: number, 
    readonly installments: number, 
    readonly type: string
  ) {}

  static create(amount: number, income: number, installments: number) {
    throw new Error('This method is abstract')
  }
}

export class MortgageLoan extends Loan {
  rate = 10;
  maxInstallment = 420
  maxPercentIncome = 25

  constructor(loanId: string, amount: number, income: number, installments: number) {
    super(loanId, amount, income, installments, "mortgage")
    if(installments > this.maxInstallment) throw new Error(`The maximum number of installments for mortgage loan is ${this.maxInstallment}`)
      if((income * (this.maxPercentIncome / 100)) < amount / installments) throw new Error(`The installment amount could not exceed ${this.maxPercentIncome}% of monthly income`)
  }

  // factory method: define uma alternativa ao construtor
  // Pode ter mais ou menos parâmetros
  static create(amount: number, income: number, installments: number) {
    const loanId = crypto.randomUUID()
    return new MortgageLoan(loanId, amount, income, installments)
  }
}

export class CarLoan extends Loan {
  rate = 15;
  maxInstallment = 60
  maxPercentIncome = 30

  constructor(loanId: string, amount: number, income: number, installments: number) {
    super(loanId, amount, income, installments, "car")
    if(installments > this.maxInstallment) throw new Error(`The maximum number of installments for car loan is ${this.maxInstallment}`)
    if((income * (this.maxPercentIncome / 100)) < amount / installments) throw new Error(`The installment amount could not exceed ${this.maxPercentIncome}% of monthly income`)
  }

  static create(amount: number, income: number, installments: number) {
    const loanId = crypto.randomUUID()
    return new CarLoan(loanId, amount, income, installments)
  }
}