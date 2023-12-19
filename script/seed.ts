const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const main = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Data science" },
        { name: "Programing" },
        { name: "Music" },
        { name: "Graphic design" },
        { name: "Artificial intelligence" },
      ],
    });

    console.log("data added successfully");
  } catch (error) {
    console.log(error);
  } finally {
    database.$disconnect();
  }
};

main();
