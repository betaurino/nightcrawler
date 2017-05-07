const request = require('request-promise');
const cheerio = require('cheerio');
const config = require('config');

// Scrapping the index page method
module.exports = async () => {
  try {
    const data = {};
    const options = {
      url: config.anp.index,
      transform: body => cheerio.load(body)
    };

    const $ = await request(options);

    $('#frmAberto').filter(() => {
      const fuels = [];
      const states = [];

      data.week = $('[name="cod_Semana"]').val();
      data.selWeek = $('[name="selSemana"]').val();
      data.descWeek = $('[name="desc_Semana"]').val();
      data.type = $('[name="tipo"]').val();

      // Get all the fuels (arrow functions doesn't work here)
      $('#selCombustivel option').each(function () {
        fuels.push($(this).val());
      });

      // Get all the states
      $('[name="selEstado"]>option').each(function () {
        states.push($(this).val());
      });

      data.fuels = fuels;
      data.states = states;
    });

    return data;
  } catch (e) {
    console.log(`Error at crawling: ${e}`);
    return e;
  }
};
