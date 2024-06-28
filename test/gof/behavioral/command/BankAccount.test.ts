import BankAccount from "../../../../src/gof/behavioral/command/BankAccount"
import TransferCommand from "../../../../src/gof/behavioral/command/TransferCommand"

test("Deve fazer uma transferência entre duas contas", function() {
  const bankAccountFrom = new BankAccount(1)
  const bankAccountTo = new BankAccount(2)

  expect(bankAccountFrom.getBalance()).toBe(0)
  expect(bankAccountTo.getBalance()).toBe(0)

  bankAccountFrom.debit(100)
  bankAccountTo.credit(100)

  expect(bankAccountFrom.getBalance()).toBe(-100)
  expect(bankAccountTo.getBalance()).toBe(100)
})

test("Deve fazer uma transferência entre duas contas usando comando", function() {
  const bankAccountFrom = new BankAccount(1)
  const bankAccountTo = new BankAccount(2)

  expect(bankAccountFrom.getBalance()).toBe(0)
  expect(bankAccountTo.getBalance()).toBe(0)

  const tranferCommand = new TransferCommand(bankAccountFrom, bankAccountTo, 100)
  tranferCommand.execute()

  expect(bankAccountFrom.getBalance()).toBe(-100)
  expect(bankAccountTo.getBalance()).toBe(100)
})