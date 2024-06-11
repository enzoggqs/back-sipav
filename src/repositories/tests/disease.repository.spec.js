import { createDisease, deleteDisease, getAllDiseases, getById, getVaccineById, updateDisease } from "../disease.repository";

describe('Disease Repository Tests', () => {

  it('Should get diseases', async () => {
    const result = await getAllDiseases();
    expect(result[0].name).toEqual("Gripe");
  });

  it('should get a disease', async () => {
    const result = await getById(1);
    expect(result.name).toEqual("Gripe");
  })

  it('should get a vaccine', async () => {
    const result = await getVaccineById(1, 1);
    expect(result.disease.name).toEqual("Gripe");
  })

  it('should add an disease', async () => {
    const result = await getAllDiseases();

    let disease = result?.find(disease => disease.name == "mock")

    if (!disease) {
      disease = {
        id: 899,
        name: "mock",
        disease_info: "mock",
        symptoms: [
          "mock",
        ],
        treatment: "mock"
      }

      const addedDisease = await createDisease(disease)

      expect(addedDisease.name).toEqual(disease.name)
    }
  })

  it('should update an disease', async () => {
    const result = await getAllDiseases();

    let disease = result.find(disease => disease.name == "mock")

    if (disease) {
      const updatedDisease = await updateDisease(disease.id, { treatment: "mock", })

      expect(updatedDisease.name).toEqual(disease.name)
    }
  })

  it('should delete a disease', async () => {
    const result = await getAllDiseases();

    const disease = result?.find(disease => disease.name == "mock")
    if (disease) {
      await deleteDisease(Number(disease.id));
    }
  })
});