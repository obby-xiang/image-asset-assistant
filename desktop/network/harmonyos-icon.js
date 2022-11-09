const _ = require('lodash');
const axios = require('axios');
const { stringify } = require('../utils');
const logger = require('../utils/logger');

const fetchSummary = () =>
  new Promise((resolve, reject) =>
    axios
      .post(
        'https://svc-drcn.harmonyos.com/servlet/partnerCommunityService/v1/servlet/icon/queryHarmonyOsIconLibMenus'
      )
      .then((response) => {
        if (response.data?.code === '00000') {
          resolve(response.data.value ?? {});
        } else {
          reject(`Error response, data = ${stringify(response.data)}`);
        }
      })
      .catch((error) =>
        reject(`Failed to request, error = ${stringify(error)}`)
      )
  );

const fetchIcons = (module) =>
  new Promise((resolve, reject) =>
    axios
      .post(
        'https://svc-drcn.harmonyos.com/servlet/partnerCommunityService/v1/servlet/icon/queryHarmonyOsIconLib',
        {
          modules: [module],
        }
      )
      .then((response) => {
        if (response.data?.code === '00000') {
          resolve(response.data.value?.icons ?? []);
        } else {
          reject(`Error response, data = ${stringify(response.data)}`);
        }
      })
      .catch((error) =>
        reject(`Failed to request, error = ${stringify(error)}`)
      )
  );

const fetchIconData = () =>
  new Promise((resolve, reject) =>
    fetchSummary()
      .then((summary) => {
        const icons = [];
        Promise.all(
          _.map(summary.moduleCn, (module) =>
            fetchIcons(module.module).then((data) => icons.push(...data))
          )
        )
          .then(() => resolve({ summary, icons }))
          .catch((error) =>
            reject(`Failed to fetch icons, error = ${stringify(error)}`)
          );
      })
      .catch((error) =>
        reject(`Failed to fetch summary, error = ${stringify(error)}`)
      )
  ).catch((error) =>
    logger.error(`Failed to fetch icon data, error = ${stringify(error)}`)
  );

module.exports = { fetchIconData };
