const log = require('log')('app:autocomplete');
const Router = require('koa-router');
const _ = require('lodash');
const service = require('./service');

var router = new Router();

router.get('/api/ac/tag', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.tagByType(ctx.query.type, ctx.query.q);
});

router.get('/api/ac/user', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.userByName(ctx.query.q);
});

router.get('/api/ac/user/nameOrEmail', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.userByNameOrEmail(ctx.query.q);
});

router.get('/api/ac/keyword', async (ctx, next) => {
  await service.keywordAutocomplete(ctx.query.term).then(results => {
    ctx.body = _.pickBy({
      departments: (results[0] || {}).rows,
      agencies: (results[1] || {}).rows,
      career_fields: (results[2] || {}).rows,
      skills: (results[3] || {}).rows,
      series: (results[4] || {}).rows,
    }, _.identity);
  }).catch(err => {
    // TODO: Record and swallow the error
    ctx.body = [];
  });
});

router.get('/api/ac/languages', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.languageByValue(ctx.query.q);
});

router.get('/api/ac/agency', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.agency(ctx.query.q);
});

router.get('/api/ac/country', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.countryByValue(ctx.query.q);
});

router.get('/api/ac/state', async (ctx, next) => {
  log.info('ctx.query', ctx.query);
  ctx.body = await service.stateByValue(ctx.query.q);
});

router.get('/api/ac/countrySubdivision/:code', async (ctx, next) => {
  ctx.body = await service.getCountrySubdivisions(ctx.params.code);
});

module.exports = router.routes();
