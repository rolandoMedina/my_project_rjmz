import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear un Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Demo',
      users: {
        create: [
          {
            email: 'admin@demo.com',
            name: 'Administrador',
            password: '123456',
            telephone: '8888-8888',
            role: 'ADMIN',
          },
          {
            email: 'user@demo.com',
            name: 'Usuario Normal',
            password: '123456',
            telephone: '7777-7777',
            role: 'USER',
          },
        ],
      },
    },
  })

  console.log('Tenant y usuarios insertados', tenant)
}

main()
  .then(() => {
    console.log('Seed ejecutado correctamente.')
  })
  .catch((e) => {
    console.error('Error en seed', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
