export function calculateDiscount(price, percent) {
  if (typeof price !== "number" || typeof percent !== "number")
    throw new TypeError("Агрументы не число");

  return (price / 100) * percent;
}

export function getMarketingPrice(product) {
  const productObject = JSON.parse(product);

  try {
    productObject.prices.marketingPrice;
  } catch (error) {
    return null;
  }

  return productObject.prices.marketingPrice;
}

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  const image = await fetchAvatarImage(userId).catch(() => {
    return new Object({ url: "/images/default.jpg" });
  });
  return image.url;
}
