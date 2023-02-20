/*
 * @Author: Shirtiny
 * @Date: 2021-11-14 21:55:39
 * @LastEditTime: 2021-11-21 19:13:43
 * @Description: 
 */
import axios from "axios";

const pingUrl = process.env.PING_URL;

async function ping() {
  console.log("ping start");
  if (!pingUrl) {
    throw new Error("ping url为空")
  }
  const res = await axios.get(pingUrl);
  return res.data || {};
}

async function login() {
  console.log("ping start");
  if (!pingUrl) {
    throw new Error("login url为空")
  }
  const res = await axios.post(login, {
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
