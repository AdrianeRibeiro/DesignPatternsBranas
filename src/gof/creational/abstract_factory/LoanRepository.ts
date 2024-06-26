import Loan from "./Loan"

export default interface LoanRepository {
  save(loan: Loan): Promise<void>
  getById(loanId: string): Promise<Loan>
}

export class LoanRepositoryMemory implements LoanRepository {
  loans: Loan[]
  //singleton
  static instance: LoanRepository

  private constructor() {
    this.loans = []
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan)
  }

  async getById(loanId: string): Promise<Loan> {
    const loan = this.loans.find((load: Loan) => load.loanId === loanId)
    if(!loan) throw new Error("Loan not found")
    return loan
  }

  static getInstance() {
    if(!LoanRepositoryMemory.instance) {
      LoanRepositoryMemory.instance = new LoanRepositoryMemory()
    }
    return LoanRepositoryMemory.instance
  }
}