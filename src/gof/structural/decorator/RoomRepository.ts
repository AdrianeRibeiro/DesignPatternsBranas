import Room from "./Room";
import pgp from "pg-promise"

export default interface RoomRepository {
  getAvailableRoomsByPeriodAndCategory(checkinDate: Date, checkoutDate: Date, category: string): Promise<Room[]>
  getById(roomId: number): Promise<Room>
}

export class RoomRepositoryDatabase implements RoomRepository {
  DATABASE_URL = ""

  async getAvailableRoomsByPeriodAndCategory(checkinDate: Date, checkoutDate: Date, category: string): Promise<Room[]> {
    const connection = pgp()(this.DATABASE_URL)
    const query = "select * from design_patterns.room where category = $1 and status = 'available' and room_id not in (select room_id from design_patterns.booking where (checkin_date, checkout_date) overlaps ($2, $3) and status = 'confirmed')"
    const roomsData = await connection.query(query, [category, checkinDate, checkoutDate])
    await connection.$pool.end()

    const rooms: Room[] = []
    for(const roomData of roomsData) {
      rooms.push(new Room(roomData.room_id, roomData.category, parseFloat(roomData.price), roomData.status))
    }
    return rooms
  }

  async getById(roomId: number): Promise<Room> {
    const connection = pgp()(this.DATABASE_URL)
    const [roomData] = await connection.query("select * from design_patterns.room where room_id = $1", [roomId])
    await connection.$pool.end()
    return new Room(roomData.room_id, roomData.category, parseFloat(roomData.price), roomData.status)
  }
}