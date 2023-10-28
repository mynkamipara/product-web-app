import Http from "../utils/Http";
import { Dispatch, AnyAction } from "redux";

export function userLogin(requestdata: any) {
  Http.post(`http://localhost:8080/login`, requestdata)
    .then((res) => {
      console.log("Resopnse Token", res.data.data.token)
      // const data = Transformer.fetch(res.data.data.token);
      // dispatch(admin.adminsignIn(data));
      return res.data
    })
    .catch((err) => {
      const statusCode = err.response.status;
      const data = {
        error: null,
        statusCode
      };
      data.error = err.response.data;
      return data;
    });
}
