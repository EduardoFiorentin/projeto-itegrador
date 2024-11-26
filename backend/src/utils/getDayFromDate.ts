export function obterDiaDaSemana(dataString: string): string {
    // Validação básica da data
    // const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    // if (!dataRegex.test(dataString)) {
    //   throw new Error('Formato de data inválido. Use yyyy-mm-dd');
    // }
  
    // Cria um objeto Date a partir da string
    const data = new Date(dataString);
  
    // Obtém o dia da semana (0 = domingo, 1 = segunda, ...)
    const diaSemana = data.getDay();
  
    // Array com os nomes dos dias da semana
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']; 1    
  
  
    // Retorna o nome do dia da semana correspondente
    return diasDaSemana[diaSemana];
  }