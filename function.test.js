
import { beforeAll, expect, test, assert, vi,describe, it, afterEach  } from 'vitest'
import { getTeaByName, saveTea, generateNewTeaId } from './saver.js'
import { addTea } from './index.js'
const fs = require('fs');
const teaDataFile = "TP-devops/data.json"
beforeAll(() => {
  const teas = [
    {
      id: 1,
      name: "Green Tea",
      description: "Brew at 80C for 2-3 minutes. Known for its fresh and grassy flavor. Helps with relaxation and contains antioxidants."
    },
    {
      id: 2,
      name: "Earl Grey",
      description: "Brew at 90C for 3-5 minutes. A black tea with bergamot flavor, known for its citrus aroma. May improve focus and digestion."
    },
    {
      id: 3,
      name: "Chamomile",
      description: "Brew at 95C for 5 minutes. A caffeine-free herbal tea, often used for calming nerves and aiding sleep."
    },
    {
      id: 4,
      name: "Oolong Tea",
      description: "Brew at 85C for 3-4 minutes. A semi-oxidized tea with a complex flavor, ranging from floral to toasty. May boost metabolism."
    },
    {
      id: 5,
      name: "Peppermint Tea",
      description: "Brew at 95C for 5-6 minutes. A caffeine-free herbal tea with a refreshing mint flavor, helps with digestion and relieves headaches."
    }
  ];
  
  fs.writeFile(teaDataFile, JSON.stringify(teas, null, 4), 'utf8', (err) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement du fichier:', err);
    } else {
      console.log('Fichier data.json enregistré avec succès !');
    }
  });
}
)
test("Generate tea good", () => {
  const tolerance = 1000;
  const result = generateNewTeaId()
  // regle les probleme de timing si le code s'execute sur deux secondes différentes
  expect(result).toBeGreaterThanOrEqual(Date.now() - tolerance);
  expect(result).toBeLessThanOrEqual(Date.now() + tolerance);
}
)

test("try find by name good", () => {
  const result = getTeaByName("Peppermint Tea")
  expect(result.name).toBe("Peppermint Tea")

}

)
test("try find by name bad", () => {
  const result = getTeaByName("Black coffee")
  expect(result).toBe(undefined)

}

)
test("try save good", () => {
  const newTea = 
  {
    "id": 6,
    "name": "Jasmine Tea",
    "description": "Brew at 80-85C for 2-3 minutes. A green tea scented with jasmine flowers, offering a delicate floral aroma. Known for its calming and refreshing properties."
  }
  saveTea(newTea)
  expect(getTeaByName("Jasmine Tea").name).toBe("Jasmine Tea")
})

// test("try save throw error test", () => {
//   const newTea = 
//   {
//     id: 5,
//     name: "Peppermint Tea",
//     description: "Brew at 95C for 5-6 minutes. A caffeine-free herbal tea with a refreshing mint flavor, helps with digestion and relieves headaches."
//   }
//   saveTea(newTea)
//   assert.throws(() => saveTea(newTea), `Tea with name ${newTea.name} already exists`);
  
// })


describe('test all with index', () => {

  it('should update an existing tea if it already exists', () => {
    const updatedTea = {id: 6, name: 'Green', description: 'An updated description.' };

    const result = addTea(updatedTea);

    // Vérifie le résultat
    expect(result).toEqual({ success: true });

    // Vérifie les données dans le fichier JSON
    const teas = JSON.parse(fs.readFileSync(teaDataFile, 'utf-8'));
    expect(teas).toHaveLength(5);
    expect(teas).toContainEqual(updatedTea);
  })
//   it('should return success: false if an error occurs while saving', () => {

//     fs.chmodSync(teaDataFile, 0o444); 

//     const newTea ={
//       id: 1,
//       name: "Green Tea",
//       description: "Brew at 80C for 2-3 minutes. Known for its fresh and grassy flavor. Helps with relaxation and contains antioxidants."
//     }

//     const result = addTea(newTea);


//     expect(result).toEqual({ success: false });

 
//     fs.chmodSync(teaDataFile, 0o644);
//   });
});