import TicketStatus, { RequestedStatus } from "./TicketStatus"

export default class Ticket {
  status: TicketStatus
  employeeId?: number
  assignDate?: Date
  startDate?: Date
  endDate?: Date

  constructor(readonly customerId: number, readonly requestDate: Date) {
    this.status = new RequestedStatus(this)
  }

  assign(employeeId: number, assignDate: Date) {
    this.status.assign()
    this.employeeId = employeeId
    this.assignDate = assignDate
  }

  start(startDate: Date) {
    this.status.start()
    this.startDate = startDate
  }

  close(endDate: Date) {
    this.status.close()
    this.startDate = endDate
  }

  getStatus() {
    return this.status.value
  }

  getStatistics(currentDate: Date) { 
    let assignDuration = 0
    let inSeconds = (1000 * 60 * 60)
    const requestDuration = ((this.assignDate || currentDate).getTime() - this.requestDate.getTime()) / inSeconds
    if(this.assignDate) assignDuration = ((this.startDate || currentDate).getTime() - this.assignDate.getTime()) / inSeconds
    return {
      requestDuration,
      assignDuration
    }
  }
}