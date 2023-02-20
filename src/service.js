/*
 * @Author: Shirtiny
 * @Date: 2021-11-14 21:55:39
 * @LastEditTime: 2021-11-21 19:12:15
 * @Description:
 */
import { reactiveX, date } from "@shirtiny/utils/lib";
import api from "./api";

async function ping() {
  const request = async () => {
    console.log("发送请求", date.formatTime(date.unix()));
    const data = await api.ping();
    console.log("ping 的结果：", data);
    if (!data) throw new Error("ping 没有获取到结果");
    const user = await api.login();
    console.log("login 的结果：", user);
    if (!user) throw new Error("login 没有获取到结果");
  };

  const task = reactiveX.createRetryTask({
    name: "ping",
    request,
    maxRetryCount: 5,
    delay: 3,
    stopWhile: (cur, e) => {
      console.log(`retry count: ${cur}`, e.message);
    },
  });
  task.start();
}

const service = {
  ping,
};

export default service;
