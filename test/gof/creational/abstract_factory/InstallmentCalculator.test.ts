import { MortgageLoan } from "../../../../src/gof/creational/abstract_factory/Loan"
import { PriceInstallmentCalculator, SACInstallmentCalculator } from "../../../../src/gof/creational/abstract_factory/SACInstallmentCalculator"

test("Deve calcular as parcelas utilizando SAC", function () {
  const installmentCalculator = new SACInstallmentCalculator()
  const loan = MortgageLoan.create(100000, 10000, 240)
  const installments = installmentCalculator.calculate(loan)

  expect(installments).toHaveLength(240)
  expect(installments.at(0)).toEqual(
    expect.objectContaining({
      loanId: expect.anything(),
      number: 1,
      amount: 1250,
      amortization: 416.67,
      interest: 833.33,
      balance: 99583.33
    })
  )
  expect(installments.at(239)).toEqual(
    expect.objectContaining({
      loanId: expect.anything(),
      number: 240,
      amount: 420.14,
      amortization: 416.67,
      interest: 3.47,
      balance: 0
    })
  )
})


test("Deve calcular as parcelas utilizando Price", function () {
  const installmentCalculator = new PriceInstallmentCalculator()
  const loan = MortgageLoan.create(100000, 10000, 240)
  const installments = installmentCalculator.calculate(loan)

  expect(installments).toHaveLength(240)

  expect(installments.at(0)).toEqual(
    expect.objectContaining({
      amortization: 131.69, 
      amount: 965.02,
      balance: 99868.31, 
      interest: 833.33,
      loanId: expect.anything(),
      number: 1
    })
  )
  expect(installments.at(239)).toEqual(
    expect.objectContaining({
      loanId: expect.anything(),
      number: 240,
      amount: 965.02,
      amortization: 957.03,
      interest: 7.99,
      balance: 0
    })
  )
})