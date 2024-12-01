export function obterDiaDaSemana(dataString: string): string {
    const data = new Date(dataString);
  
    const diaSemana = data.getDay();
  
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']; 1    
  
    return diasDaSemana[diaSemana];
  }