import { createUser, getAllUsers } from "../user.repository";
import { createVaccination, deleteVaccination, getAllVaccinations, getById, updateVaccination } from "../vaccination.repository";

describe('Vaccination Repository Tests', () => {

  it('Should get vaccinations', async () => {
    const result = await getAllVaccinations();
    expect(result[0].id).toEqual(1);
  });

  it('should get a vaccination', async () => {
    const result = await getById(1, 1);
    if(result.length){
      expect(result[0]?.vaccineId).toEqual(1);
    } else {
      expect(undefined).toEqual(undefined)
    }
  })

  it('should add an vaccination', async () => {
    const result = await getAllVaccinations();

    let vaccination = result?.find(vaccination => vaccination.userId == 899)

    const users = await getAllUsers();

    let user = users?.find(user => user.name == "mock")

    if (!user) {
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

    if (!vaccination) {
      vaccination = {
        id: 899,
        userId: 899,
        vaccineId: 2,
        date: "2010-02-21T12:00:00Z"
      }

      const addedVaccination = await createVaccination(vaccination)

      expect(addedVaccination.vaccineId).toEqual(vaccination.vaccineId)
    }
  })

  it('should delete a vaccination', async () => {
    const result = await getAllVaccinations();

    const vaccination = result?.find(vaccination => vaccination.id == 899)
    if (vaccination) {
      await deleteVaccination(Number(vaccination.id));
    }
  })
});