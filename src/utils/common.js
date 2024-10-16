function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updatePoint(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}

export {getRandomArrayElement, updatePoint};
