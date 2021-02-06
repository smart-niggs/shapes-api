import * as moment from 'moment';
import { Op } from 'sequelize';

export const parseQueryObj = (query: any, queryFilters?: string[]): any => {

  const params: any = {}
  params.page = query.page; // Page defaults to 1
  params.limit = query.limit; // Limit defaults to 20, max is 200
  params.skip = (params.page - 1) * params.limit;

  const sort_by = query.sort_by // defaults to 'created_at';
  const order = query.order // defaults to  'desc';
  params.order = [[sort_by, order]];

  // extract filters and add to where query
  params.where = {};

  if (queryFilters) {
    queryFilters.forEach((val) => {
      if (query[val])
        params.where[val] = query[val];
    });
  }

  // if (query.active)	// boolean value validated by validator
  //   params.where.active = query.active;

  // let startDate = query.start_date;
  // let endDate = query.end_date;

  // if (startDate) {
  //   startDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  //   endDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');

  //   params.where.created_at = {
  //     [Op.and]: [
  //       { [Op.gte]: startDate },
  //       { [Op.lte]: endDate }
  //     ]
  //   };
  // }
  // else if (endDate) {
  //   endDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
  //   params.where.created_at = {
  //     [Op.and]: [
  //       { [Op.lte]: endDate }
  //     ]
  //   };
  // }

  return params;
};
