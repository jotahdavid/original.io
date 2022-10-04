function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

export default function generateID() {
  const random = randomNumber(10) * new Date().getTime();
  return String(random).slice(0, 12);
}
