import { PrismaClient, sex } from "@prisma/client";

const prisma = new PrismaClient()
const namesArray = ["Petr", "Elena", "Anna"]
const surnamesArray = ["Robinus", "Servakov", "Kretov"]

function generateRandomName() {
    return namesArray[Math.floor(Math.random() * namesArray.length)]
}

function generateRandomSurname() {
    return surnamesArray[Math.floor(Math.random() * surnamesArray.length)]
}

function generateProblem() {
    return Math.random() > 0.5 ? true : false
}

function generateSex() {
    return Math.random() < 0.5 ? sex.FEMALE : sex.MALE
}

function generateAge() {
    return Math.floor(Math.random() * 100)
}

const users = Array.from({ length: 100 }, () => ({
    name: generateRandomName(),
    surname: generateRandomSurname(),
    problems: generateProblem(),
    sex: generateSex(),
    age: generateAge()
}))

prisma.user.createMany({
    data: users
}).then(() => {
    console.log(`Success!`)
})