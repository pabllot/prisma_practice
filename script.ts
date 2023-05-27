import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createUser() {
  await prisma.user.create({
    data: {
      name: "Pablo",
      email: "pablot@prisma.com",
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });
}

async function updateUser() {
  await prisma.user.update({
    where: {
      email: "pablot@prisma.com",
    },
    data: {
      name: "Kyle",
    },
  });
}

async function getUser() {
  const user = await prisma.user.findUnique({
    where: {
      email: "pablo@prisma.com",
    },
  });

  return [user];
}

async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      age: "asc",
    },
  });

  return [users];
}

async function deleteUser() {
  await prisma.user.delete({
    where: {
      email: "pablo@prisma.com",
    },
  });
}

async function getUsersEmailUpdates() {
  const users = await prisma.user.findMany({
    where: {
      userPreference: {
        emailUpdates: true,
      },
    },
  });

  return [users];
}

getUsers()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
