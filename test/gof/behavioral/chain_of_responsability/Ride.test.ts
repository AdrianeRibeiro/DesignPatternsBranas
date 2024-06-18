import { NormalFareCalculator, OvernightFareCalculator, OvernightSundayFareCalculator, SundayFareCalculator } from "../../../../src/gof/behavioral/chain_of_responsability/FareCalculator"
import Ride from "../../../../src/gof/behavioral/chain_of_responsability/Ride"

let ride: Ride

beforeEach(() => {
  const overnightSundayFareCalculator = new OvernightSundayFareCalculator()
  const sundayFareCalculator = new SundayFareCalculator(overnightSundayFareCalculator)
  const overnightFareCalculator = new OvernightFareCalculator(sundayFareCalculator)
  const normalFareCalculator = new NormalFareCalculator(overnightFareCalculator)
  ride = new Ride(normalFareCalculator)
})

test("Deve calcular o valor da corrida no horário normal", function() {
  ride.addSegment(10, new Date("2021-03-01T10:00:00"))
  ride.calculateFare()
  expect(ride.getFare()).toBe(21)
})

test("Deve calcular o valor da corrida no horário noturno", function() {
  ride.addSegment(10, new Date("2021-03-01T23:00:00"))
  ride.calculateFare()
  expect(ride.getFare()).toBe(39)
})

test("Deve calcular o valor da corrida no horário de domingo", function() {
  ride.addSegment(10, new Date("2021-03-07T10:00:00"))
  ride.calculateFare()
  expect(ride.getFare()).toBe(29)
})

test("Deve calcular o valor da corrida no horário de domingo a noite", function() {
  ride.addSegment(10, new Date("2021-03-07T23:00:00"))
  ride.calculateFare()
  expect(ride.getFare()).toBe(50)
})

test("Não deve calcular o valor da corrida se a distância for inválida", function() {
  expect(() => ride.addSegment(-10, new Date("2021-03-01T10:00:00"))).toThrow(new Error("Invalid distance"))
})