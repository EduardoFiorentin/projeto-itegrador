export function getDayFromDate(dataString: string): string {
  const data = new Date(dataString);
  const diaSemana = data.getDay();
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']; 
  return diasDaSemana[diaSemana];
}
