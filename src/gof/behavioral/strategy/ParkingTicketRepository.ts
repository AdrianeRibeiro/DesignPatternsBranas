import ParkingTicket from "./ParkingTicket";
import pgp from 'pg-promise'

export default interface ParkingTicketRepository {
  getByPlate(plate: string): Promise<ParkingTicket | undefined>
  save(parkingTicket: ParkingTicket): Promise<void>
  update(parkingTicket: ParkingTicket): Promise<void>
}

export class ParkingTicketRepositoryDatabase implements ParkingTicketRepository {
  DATABASE_URL = ""

  async getByPlate(plate: string): Promise<ParkingTicket | undefined> {
    const connection = pgp()(this.DATABASE_URL)
    const [parkingTicketData] = await connection.query("select * from design_patterns.parking_ticket where plate = $1", [plate])
    await connection.$pool.end()
    if (!parkingTicketData) return
    return new ParkingTicket(parkingTicketData.plate, parkingTicketData.checkin_date, parkingTicketData.location)
  }
  
  async save(parkingTicket: ParkingTicket): Promise<void> {
    const connection = pgp()(this.DATABASE_URL)
    await connection.query("insert into design_patterns.parking_ticket (plate, checkin_date, location, fare) values ($1, $2, $3, $4)", [parkingTicket.plate, parkingTicket.checkinDate, parkingTicket.location, parkingTicket.fare])
    await connection.$pool.end()
  }

  async update(parkingTicket: ParkingTicket): Promise<void> {
    const connection = pgp()(this.DATABASE_URL)
    await connection.query("update design_patterns.parking_ticket set checkout_date = $1, fare = $2 where plate = $3", [parkingTicket.checkoutDate, parkingTicket.fare, parkingTicket.plate])
    await connection.$pool.end()
  }
}