require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Use o método deleteMany para excluir todos os registros da tabela
    const deleteResult = await prisma.job.deleteMany({});
    
    console.log(`Foram deletados ${deleteResult.count} registros da tabela Job.`);
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
  } finally {
    // Sempre desconecte o Prisma após a execução das operações
    await prisma.$disconnect();
  }
}

// Chame a função para deletar os dados
deleteAllData();
