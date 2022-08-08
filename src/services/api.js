export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return result.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(url);
  return result.json();
}

export async function getByCategory(categoryId) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const promise = await fetch(URL);
  const data = await promise.json();
  return data;
}

export async function getByProductId(productId) {
  const URL = `https://api.mercadolibre.com/items/${productId}`;
  const promise = await fetch(URL);
  const data = await promise.json();
  return data;
}

export async function getByQuery(query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const promise = await fetch(URL);
  const data = await promise.json();
  return data;
}
