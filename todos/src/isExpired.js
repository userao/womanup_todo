import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import _ from 'lodash';

dayjs.extend(minMax);

const isExpired = (date) => {
  const expDate = dayjs(date);
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0);
  if (_.isEqual(expDate, today)) return false;
  return _.isEqual(dayjs.max(expDate, today), today); 
};

export default isExpired;
