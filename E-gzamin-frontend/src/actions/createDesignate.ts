/* eslint-disable @typescript-eslint/camelcase */
import axios from '../lib/axiosInstance';
import { DesignateType } from '../types';

const createDesignate = async ({
  time,
  passReq,
  startDate,
  endDate,
  group_id,
  testTemplate_id,
}: DesignateType): Promise<any> => {
  const { data } = await axios.post(`/rest/designates/`, {
    time,
    passReq,
    startDate,
    endDate,
    group_id,
    testTemplate_id,
  });
  return data;
};

export default createDesignate;
