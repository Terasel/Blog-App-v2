import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const newUserEntry = await prisma.user.create({
        data: {
            email: "prueba@gmail.com",
            name: "Ricardo Astley",
            role: "admin"
        }
    })
    console.log(newUserEntry);
}

main()