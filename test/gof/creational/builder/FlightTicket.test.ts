import FlightTicket from "../../../../src/gof/creational/builder/FlightTicket"
import FlightTicketBuilder from "../../../../src/gof/creational/builder/FlightTicketBuilder"

test("Deve criar uma passagem aérea", function () {
  const builder = new FlightTicketBuilder()
    .setFlight("Azul", "9876")
    .setTrip("FLN", "GRU")
    .setPassenger("John Doe", "john.doe@gmail.com", "111.111.111-11", "M")
    .setEmergencyContact("Bob Simpson", "5511999999999")
    .setSeat("8A")
    .setCheckedBags(2)
    .setCheckinInformation(true, "1", "4A")
    .setPriority(5)

  const flightTicket = new FlightTicket(builder)
  expect(flightTicket).toEqual({
    airline: 'Azul',
    fromAirport: 'FLN',
    toAirport: 'GRU',
    flightCode: '9876',
    passengerName: 'John Doe',
    passengerEmail: 'john.doe@gmail.com',
    passengerDocument: '111.111.111-11',
    passengerGender: 'M',
    emergencyContactName: 'Bob Simpson',
    emergencyContactTelephone: '5511999999999',
    seat: '8A',
    checkedBags: 2,
    hasCheckin: true,
    terminal: '1',
    gate: '4A',
    priority: 5
  })

})