const bodyJsonSchema = {
  type: "object",
  required: ["requiredKey"],
  properties: {
    text: { type: "string" },
    completed: { type: "boolean" },
  },
};

// const queryStringJsonSchema = {
//   type: "object",
//   properties: {
//     name: { type: "string" },
//     excitement: { type: "integer" },
//   },
// };

// const paramsJsonSchema = {
//   type: "object",
//   properties: {
//     par1: { type: "string" },
//     par2: { type: "number" },
//   },
// };

// const headersJsonSchema = {
//   type: "object",
//   properties: {
//     "x-foo": { type: "string" },
//   },
//   required: ["x-foo"],
// };

export const schema = {
  body: bodyJsonSchema,
  // querystring: queryStringJsonSchema,
  // params: paramsJsonSchema,
  // headers: headersJsonSchema,
};
