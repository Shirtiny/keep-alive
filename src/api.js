/*
 * @Author: Shirtiny
 * @Date: 2021-11-14 21:55:39
 * @LastEditTime: 2021-11-21 19:13:43
 * @Description: 
 */
import axios from "axios";

console.log("env:",process.env)

const pingUrl = process.env.PING_URL;
const loginUrl = process.env.LOGIN_URL;

async function ping() {
  console.log("ping start", pingUrl);
  if (!pingUrl) {
    throw new Error("ping url为空")
  }
  const res = await axios.get(pingUrl);
  return res.data || {};
}

async function login() {
  console.log("login start", loginUrl);
  if (!loginUrl) {
    throw new Error("login url为空")
  }
  const res = await axios.post(loginUrl, {
    "name": "shirtiny",
    "password": "123456"
  });
  return res.data || {};
}

const api = {
  ping,
  login
};

export default api;
