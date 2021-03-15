import fetch from 'isomorphic-unfetch';
import https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const getBreeds = async () => {
  const result = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await result.json();

  const allBreeds = Object.keys(data.message).reduce<string[]>((acc, breed) => {
    const innerBreeds: string[] = data.message[breed];
    return innerBreeds.length > 0 ? acc.concat(...innerBreeds.map(innerBreed => `${breed}-${innerBreed}`)) : acc.concat(breed);
  }, []);

  return allBreeds;
};

const downloadRandomFromBreed = async (breed: string) => {
  const result = await fetch(`https://dog.ceo/api/breed/${breed.replace('-', '/')}/images/random`);
  const data = await result.json();

  console.log('Downloading: ', breed);
  https.get(data.message, (response) => {
    const stream = fs.createWriteStream(path.resolve(__dirname, '..', 'public', `${breed}.jpg`));
    response.pipe(stream);
  });
};

(async () => {
  try {
    const allBreeds = await getBreeds();
    // eslint-disable-next-line no-restricted-syntax
    for (const breed of allBreeds) {
      await downloadRandomFromBreed(breed);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
