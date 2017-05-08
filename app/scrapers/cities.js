const request = require('request-promise');
const cheerio = require('cheerio');
const config = require('config');

const db = require('../models');
const index = require('./index.js');

module.exports = async () => {
  try {
    const requester = await index();
    const options = {
      url: config.anp.cities,
      form: {
        cod_Semana: requester.week,
        selSemana: requester.selWeek,
        desc_Semana: requester.descWeek,
        tipo: requester.type
      },
      transform: body => cheerio.load(body)
    };

    // Verifies if data was already requested on this week
    const week = await db.models.Weeks.findById(requester.week);

    if (week !== null) {
      return console.log('Weekly data already crawled!');
    }

    // Creates a new week, with new crawled data
    await db.models.Weeks.create({
      id: requester.week,
      description: requester.descWeek
    });

    // Makes a bidimensional search, for each state, seach data for each type
    // of fuel.
    requester.states.forEach(async (state) => {
      options.form.selEstado = state;

      await db.models.States.create({
        name: state.substring(state.indexOf('*') + 1),
        initials: state.substring(0, state.indexOf('*')).toLowerCase()
      });

      requester.fuels.forEach(async (fuel) => {
        options.form.selCombustivel = fuel;

        const $ = await request(options);

        await db.models.Fuels.findOrCreate({
          where: { id: fuel.substring(0, fuel.indexOf('*')) },
          defaults: { description: fuel.substring(fuel.indexOf('*') + 1) }
        });

        $('.table_padrao.scrollable_table > tr').each(function () {
          if ($(this).index() < 3) {
            return true;
          }

          const request = $(this).children('td:nth-child(1)').find('a').attr('href');
          const indexed = request.substring(request.indexOf('\'') + 1);
          const city_request = indexed.slice(0, -3);

          console.log(request, indexed, city_request);
        });
      });
    });
  } catch (e) {
    console.log(`Error while running the crawler: ${e}`);
  }
};
