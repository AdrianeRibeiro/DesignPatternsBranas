
import Usecase from "./Usecase"

// ImportBooking é um decorator de BookRoom. O papel do ImportBooking  é agregar comportamento adicional. Ex: extrair do array
// Todo decorator é um wrapper que incorpora um objeto
export default class ImportBooking implements Usecase {
  constructor(readonly usecase: Usecase) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = { code: [] }
    const lines = input.file.split("\n")
    
    for(const line of lines.slice(1)) {
      const [email, checkinDate, checkoutDate, category] = line.split(";")
      const inputUsecase = { 
        email, 
        checkinDate: new Date(checkinDate), 
        checkoutDate: new Date(checkoutDate), 
        category 
      }
      const outputUsecase = await this.usecase.execute(inputUsecase)
      output.code.push(outputUsecase.code)
    }

    return output
  }
}

type Input = {
  file: string
}

type Output = {
  code: string[]
}