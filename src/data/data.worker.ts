import { BreakData } from "../state/AppDataContext";
import { CountriesByIdMap, Country } from "./types";

/**
 * the web worker used to process the data from the API into the data
 * structures used by the app.
 */
 addEventListener('message', (event) => {
  const data = event.data;

  const [allIds, byIds, onlyIslandIds] = populateAllIds(data);
  const mostBordersIds = populateMostBordersIds(allIds, byIds);
  const sharedLanguages = buildSharedLanguages(byIds);

  const allIdsGroupData = buildAlphaGroupData(allIds, byIds);
  const onlyIslandIdsGroupData = buildAlphaGroupData(onlyIslandIds, byIds);
  const mostBordersIdsGroupData = buildBorderGroupData(mostBordersIds, byIds);
  const [sharedLanguageIds, sharedLanguageMapArray, sharedLanguageBreakData] =
    buildSharedLanguageData(sharedLanguages);

  populateExpandedBorders(byIds);

  postMessage({
    all: {
      ids: allIds,
      mapArray: allIdsGroupData.mapArray,
      breakData: allIdsGroupData.breakData,
    },
    onlyIsland: {
      ids: onlyIslandIds,
      mapArray: onlyIslandIdsGroupData.mapArray,
      breakData: onlyIslandIdsGroupData.breakData,
    },
    mostBorders: {
      ids: mostBordersIds,
      mapArray: mostBordersIdsGroupData.mapArray,
      breakData: mostBordersIdsGroupData.breakData,
    },
    sharedLanguage: {
      ids: sharedLanguageIds,
      mapArray: sharedLanguageMapArray,
      breakData: sharedLanguageBreakData,
    },
    byIds,
  });
});

/**
 * Gets an array of all country ids, sorted by the number of bordering countries
 * they have
 * @param {Array<string>} allIds an array with all of the ids in the dataset
 * @param {Object} byIds an object containing all of the data objects from the API, keyed by id
 * @returns {Array<string>} an array of all country ids, sorted by the number of bordering countries
 */
const populateMostBordersIds = (
  allIds: Array<string>,
  byIds: CountriesByIdMap
) => {
  return allIds.slice().sort((a, b) => {
    return byIds[b].borders.length - byIds[a].borders.length;
  });
};

const populateAllIds = (
  data: Array<Country>
): [Array<string>, CountriesByIdMap, Array<string>] => {
  let onlyIslandIds: Array<string> = [];
  let allIds: Array<string> = [];
  let byIds: CountriesByIdMap = {};

  data.forEach((country) => {
    if (!country.borders.length) {
      onlyIslandIds.push(country.alpha3Code);
    }

    allIds.push(country.alpha3Code);

    byIds[country.alpha3Code] = country;
  });

  const alphaSort = getAlphaSort(byIds);
  return [allIds.sort(alphaSort), byIds, onlyIslandIds.sort(alphaSort)];
};

const populateExpandedBorders = (byIds: CountriesByIdMap) => {
  Object.values(byIds).forEach((country) => {
    country.expandedBorderNames = country.borders.map((border) => {
      return byIds[border].name;
    });
  });
};

const getAlphaSort = (byIds: CountriesByIdMap) => {
  return (a: string, b: string) => {
    const aName = byIds[a].name;
    const bName = byIds[b].name;

    if (aName > bName) return 1;
    if (aName < bName) return -1;
    return 0;
  };
};

const buildSharedLanguages = (countries: CountriesByIdMap) => {
  // what I need to do here is create a list of ids that is grouped by
  // languages. so i need an array of objects that have a language name that
  // i can use to sort and an array of country ids that are the countries that
  // speak that language

  const languages: { [id: string]: string[] } = {};
  Object.values(countries).forEach((country) => {
    country.languages.forEach((language) => {
      if (languages[language.name]) {
        languages[language.name].push(country.alpha3Code);
      } else {
        languages[language.name] = [country.alpha3Code];
      }
    });
  });

  return languages;
};

/**
 * a group data object has two properties:
 *  1. an array containing a 1:1 map of group names to item elements
 *  2. an object with keys that correspond to the first index of the group and
 *   a value of the group name
 *
 */
const buildAlphaGroupData = (ids: Array<string>, byIds: CountriesByIdMap) => {
  const mapArray: Array<string> = [];
  const breakData: { [id: number]: string } = {};
  ids.forEach((id, index) => {
    const name = byIds[id].name;
    mapArray[index] = name[0];
    if (index === 0 || mapArray[index] !== mapArray[index - 1]) {
      breakData[index] = mapArray[index];
    }
  });

  return { mapArray, breakData };
};

const buildBorderGroupData = (ids: Array<string>, byIds: CountriesByIdMap) => {
  const mapArray: Array<number> = [];
  const breakData: { [id: number]: number } = {};
  ids.forEach((id, index) => {
    const borders = byIds[id].borders;
    mapArray[index] = borders.length;
    if (index === 0 || mapArray[index] !== mapArray[index - 1]) {
      breakData[index] = mapArray[index];
    }
  });

  return { mapArray, breakData };
};

const buildSharedLanguageData = (languages: {
  [id: string]: Array<string>;
}) => {
  let ids: Array<string> = [];
  const mapArray: Array<string> = [];
  const breakData: BreakData = {};

  const alphaSort = (a: any, b: any) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  Object.entries(languages)
    .sort(alphaSort)
    .forEach(([key, value]) => {
      const languageName = key;
      const countryIdArray = value;
      const groupLabel = `${languageName} - ${countryIdArray.length}`;

      ids = ids.concat(countryIdArray);
      countryIdArray.forEach(() => {
        mapArray.push(groupLabel);
      });
      breakData[mapArray.length - countryIdArray.length] = groupLabel;
    });

  return [ids, mapArray, breakData];
};
