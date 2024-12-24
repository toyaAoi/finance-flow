"use strict";

import * as chaiModule from "chai";
import chaiHttp from "chai-http/index.js";

const chai = chaiModule.use(chaiHttp);
const api = chai.request.execute("http://localhost:3000/api");

export default api;
