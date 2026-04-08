export function buildWALink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function waMessageGeneral(): string {
  return 'Hello, I would like more information about VW Puri Indah.'
}

export function waMessageTestDrive(carName: string): string {
  return `Hello, I would like to schedule a test drive for the ${carName}.`
}

export function waMessageKredit(
  carName: string,
  dp: number,
  tenor: number,
  monthly: string,
): string {
  return `Hello, I'm interested in financing for the ${carName}. Down payment ${dp}%, tenure ${tenor} months, estimated monthly installment ${monthly}/month.`
}

export function waMessageService(vehicleType: string, date: string): string {
  return `Hello, I would like to book a service for my ${vehicleType} on ${date}.`
}

export function waMessageParts(partName: string): string {
  return `Hello, I would like to check the availability of ${partName}.`
}

export function waMessagePromo(promoTitle: string): string {
  return `Hello, I'm interested in the "${promoTitle}" promotion. Could you share more details?`
}
