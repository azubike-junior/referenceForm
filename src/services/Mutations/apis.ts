import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Referee } from "./../../interfaces/";

const initialState = {
  page: 1,
  show: false,
  detail: "",
};

export const CreateReference = createApi({
  reducerPath: "sendReferee",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.11.200.97/accountopening/api/v1/AccountOpening/`,
    prepareHeaders: (headers) => {
      const token =
        "4I[PdB7l&/omZT[o.wG^v!<Nni%ANMkSW'+U^5>HepGZ9Nm1xox}#%<?Zx3/7O]";
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    sendReferee: builder.mutation({
      query: (data: Referee) => ({
        url: "Referee",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendRefereeMutation } = CreateReference;
