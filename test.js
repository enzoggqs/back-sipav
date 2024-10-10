import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 25 }, // Aumenta para 10 VUs em 30 segundos
    { duration: "30s", target: 100 }, // Aumenta para 50 VUs em 30 segundos
    { duration: "1m", target: 1000 },  // Mantém 50 VUs por 1 minuto
    { duration: "30s", target: 4000 },  // Reduz gradualmente até 0 VUs
    { duration: "30s", target: 500 },  // Reduz gradualmente até 0 VUs
    { duration: "30s", target: 100 },  // Reduz gradualmente até 0 VUs
    { duration: "30s", target: 0 },  // Reduz gradualmente até 0 VUs
  ],
};

export default function() {
  let res = http.post("http://localhost:3333/login", JSON.stringify({
    email: "sipavadm@gmail.com",
    password: "sipavadm",
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "login status is 200": (r) => r.status === 200,
  });

  res = http.get("http://localhost:3333/user", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "listt user status is 200": (r) => r.status === 200,
  });

  res = http.get("http://localhost:3333/vaccine", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "list vaccines status is 200": (r) => r.status === 200,
  });

  res = http.get("http://localhost:3333/disease", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(res, {
    "list diseases status is 200": (r) => r.status === 200,
  });

  sleep(1);
}