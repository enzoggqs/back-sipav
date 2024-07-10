import { createVaccine, getAllVaccines, getById, deleteVaccine, updateVaccine } from "../vaccine.repository";

describe('Vaccine Repository Tests', () => {

  it('Should get vaccines', async () => {
    const result = await getAllVaccines();
    expect(result[0].name).toEqual("Vacina contra a Dengue");
  });

  it('should get a vacine', async () => {
    const result = await getById(2);
    expect(result.name).toEqual("Vacina da Gripe");
  })

  it('should add an vaccine', async () => {
    const result = await getAllVaccines();

    let vaccine = result?.find(vaccine => vaccine.name == "mock")

    if (!vaccine) {
      vaccine = {
        id: 899,
        name: "mock",
        doses_required: "3",
        months_between_doses: "2",
        contraindications: [
          "Mock Text",
        ],
        diseases: [
          8
        ]
      }

      const addedVaccine = await createVaccine(vaccine)

      expect(addedVaccine.name).toEqual(vaccine.name)
    }
  })

  it('should update an vaccine', async () => {
    const result = await getAllVaccines();

    let vaccine = result.find(vaccine => vaccine.name == "mock")

    if (vaccine) {
      const updatedVaccine = await updateVaccine(vaccine.id, { doses_required: "9", })

      expect(updatedVaccine.name).toEqual(vaccine.name)
    }
  })

  it('should delete a vaccine', async () => {
    const result = await getAllVaccines();

    const vaccine = result?.find(vaccine => vaccine.name == "mock")
    if (vaccine) {
      await deleteVaccine(Number(vaccine.id));
    }
  })
});