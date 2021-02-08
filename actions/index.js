export const setSunriseEpoch = (store, epoch) => {
  const sunriseEpoch = epoch;
  store.setState({ sunriseEpoch });
};

export const setSunsetEpoch = (store, epoch) => {
  const sunsetEpoch = epoch;
  store.setState({ sunsetEpoch });
};

export const setSunrise = (store, date) => {
  store.setState({ date });
};

export const setSunset = (store, date) => {
  store.setState({ date });
};
