import { prisma } from "../../services/prisma.js";
import { createUser, deleteUser, getAllUsers, getById, updateUser } from "../user.repository.js";

describe('User Repository Tests', () => {

    it('Should get users', async () => {
        const result = await getAllUsers();
        expect(result[0].name).toEqual("Teste");
    });

    it('should get a user', async () => {
        const result = await getById(1);
        expect(result.name).toEqual("Teste");
    })

    it('should add an user', async () => {
        const result = await getAllUsers();

        let user = result?.find(user => user.name == "mock")

        if(!user){
            user = {
                id: 899,
                name: "mock",
                cpf: "123123123745",
                birthdate: "2010-02-21T12:00:00Z",
                isResponsible: true,
                password: "12345678",
                email: "mockUser@mail.com"
            }

            const addedUser = await createUser(user)

            expect(addedUser.name).toEqual(user.name)
        }
    })

    it('should update an user', async () => {
        const result = await getAllUsers();

        let user = result.find(user => user.name == "mock")

        if(user){
            const updatedUser = await updateUser(user.id, {birthdate: "2010-01-21T12:00:00Z",})

            expect(updatedUser.name).toEqual(user.name)
        }
    })

    it('should delete an user', async () => {
        const result = await getAllUsers();

        const user = result?.find(user => user.name == "mock")
        if (user) {
            await deleteUser(Number(user.id));
        }
    })
});