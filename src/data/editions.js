import tbData from './original_sheets/trouble_brewing.json';
import bmrData from './original_sheets/bad_moon_rising.json';
import svData from './original_sheets/sects_and_violets.json';

function parseEdition(data) {
  const [meta, ...characters] = data;
  const editionId = characters[0]?.edition || '';
  return {
    id: editionId,
    name: meta.name,
    background: meta.background,
    characters,
  };
}

const editions = [parseEdition(tbData), parseEdition(bmrData), parseEdition(svData)];

export default editions;
