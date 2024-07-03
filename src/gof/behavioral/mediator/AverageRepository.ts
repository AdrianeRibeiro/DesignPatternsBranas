import Average from "./Average"
import pgp from "pg-promise"

export default interface AverageRepository {
  save(average: Average): Promise<void>
  getByStudentId(studentId: number): Promise<Average>
}

export class AverageRepositoryDatabase implements AverageRepository {
  DATABASE_URL = ""

  async save(average: Average): Promise<void> {
    const connection = pgp()(this.DATABASE_URL)
    await connection.query("delete from design_patterns.average where student_id = $1", [average.studentId])
    await connection.query("insert into design_patterns.average (student_id, value) values ($1, $2)", [average.studentId, average.value])
    await connection.$pool.end()
  }

  async getByStudentId(studentId: number): Promise<Average> {
    const connection = pgp()(this.DATABASE_URL)
    const [averageData] = await connection.query("select * from design_patterns.average where student_id = $1", [studentId])
    await connection.$pool.end()
    return new Average(averageData.student_id, parseFloat(averageData.value))
  }
}