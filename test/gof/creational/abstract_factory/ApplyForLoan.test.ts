import ApplyForLoan from "../../../../src/gof/creational/abstract_factory/ApplyForLoan"
import GetLoan from "../../../../src/gof/creational/abstract_factory/GetLoan"
import { MortgageLoanFactory } from "../../../../src/gof/creational/abstract_factory/LoanFactory"
import { RepositoryMemoryFactory } from "../../../../src/gof/creational/abstract_factory/RepositoryFactory"

test("Deve solicitar um financiamento imobiliário", async function () {
  const repositoryFactory = new RepositoryMemoryFactory()
  const loanFactory = new MortgageLoanFactory()
  const applyForLoan = new ApplyForLoan(repositoryFactory, loanFactory)
  const input = {
    amount: 100000,
    income: 10000,
    installments: 240
  }
  const outputApplyForLoan = await applyForLoan.execute(input)
  const getLoan = new GetLoan(repositoryFactory)
  const outputGetLoan = await getLoan.execute(outputApplyForLoan)

  expect(outputGetLoan.amount).toBe(100000)
  expect(outputGetLoan.income).toBe(10000)
  expect(outputGetLoan.installments).toHaveLength(240)
  expect(outputGetLoan.installments[0]).toEqual(
    expect.objectContaining({
      number: 1,
      amount: 1250,
      amortization: 416.67,
      interest: 833.33,
      balance: 99583.33
    })
  )
  expect(outputGetLoan.installments[239]).toEqual(
    expect.objectContaining({
      number: 240,
      amount: 420.14,
      amortization: 416.67,
      interest: 3.47,
      balance: 0
    })
  )
}) 