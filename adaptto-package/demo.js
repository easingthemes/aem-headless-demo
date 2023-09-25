const { faker } = require('@faker-js/faker');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

function createRandomCF() {
  const name = faker.lorem.sentence({ min: 4, max: 8 })
  return {
    node__name: faker.helpers.slugify(name).replace('.', '').toLowerCase() + '_' + faker.string.uuid(),
    node__title: name,
    m__name: name,
    m__description: faker.lorem.text(),
    m__speaker: faker.person.fullName(),
    m__size: faker.number.int({ min: 20, max: 100 }),
    m__techAudience: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced'])
  };
}

const RegularBreak = (i, date) => ({
  node__name: `break-${i}`,
  node__title: `Break ${i}`,
  m__name: 'Break',
  m__description: '',
  m__scheduledAt: date.toISOString(),
  m__speaker: '',
  m__size: faker.number.int({ min: 20, max: 100 }),
  m__techAudience: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced'])
});

const Lunch = (i, date) => {
  const regularBreak = RegularBreak(i, date);
  return {
    ...regularBreak,
    node__name: `lunch-${i}`,
    node__title: `Lunch ${i}`,
    m__name: 'Lunch Break',
    m__scheduledAt: date.toISOString()
  }
};

const Opening = (i, date) => {
  const regularBreak = RegularBreak(i, date);
  return {
    ...regularBreak,
    node__name: `opening-words-${i}`,
    node__title: `Opening Words ${i}`,
    m__name: 'Opening Words',
    m__scheduledAt: date.toISOString(),
    m__speaker: faker.person.fullName()
  }
};

const getDataForDay = (j, dayStart, start = 0) => {
  const all = [];
  let lunchAdded = false;
  let i = start;
  const CFS = faker.helpers.multiple(createRandomCF, {
    count: 10,
  });
  for (const cf of CFS) {
    const prevIndex = lunchAdded ? i : i - 1;
    i += 1;
    
    if (i === 1) {
      all.push({
        m__scheduledAt: dayStart.toISOString(),
        ...cf
      });
      continue;
    }
    
    const prevDate = new Date(all[prevIndex].m__scheduledAt);
    const h = prevDate.getHours();
    if (h >= 18) {
      break;
    }
    
    let dateStart = new Date(prevDate);
    const durationRandom = faker.number.int({ min: 35, max: 55 });
    let duration = Math.round(durationRandom / 5) * 5;
    
    if (!lunchAdded && h >= 11) {
      const lunchStart = new Date(prevDate);
      lunchStart.setMinutes(lunchStart.getMinutes() + 15);
      const lunch = Lunch(j, lunchStart);
      all.push(lunch);
      lunchAdded = true;
      dateStart = new Date(lunchStart);
      duration = 60;
    }
    
    dateStart.setMinutes(dateStart.getMinutes() + duration);
    all.push({
      m__scheduledAt: dateStart.toISOString(),
      ...cf
    });
  }
  
  return all;
}

const days = ['2023-09-25T10:20:00.000+02:00', '2023-09-26T09:00:00.000+02:00', '2023-09-27T09:00:00.000+02:00'];
const opening = Opening(1, new Date('2023-09-25T09:00:00.000+02:00'));
const allDays = days.map((day, i) => {
  return getDataForDay(i, new Date(day));
});

allDays[0].unshift(opening);
const items = allDays.flat();

const distDir = './content/jcr_root/content/dam/adaptto';

for (const item of items) {
  const tmplFilePath = join(__dirname, './tmpl/.content.xml');
  const tmplFileContent = readFileSync(tmplFilePath, 'utf-8');
  let distFileContent = tmplFileContent;
  Object.entries(item).forEach(([key, val]) => {
    distFileContent = distFileContent.replaceAll(key, val);
  });

  const distPath = join(__dirname, `${distDir}/${item.node__name}`);
  try {
    mkdirSync(distPath);
    writeFileSync(`${distPath}/.content.xml`, distFileContent);
  } catch (e) {
    console.log('dir err', item.node__name, item.m__speaker);
  }
}

