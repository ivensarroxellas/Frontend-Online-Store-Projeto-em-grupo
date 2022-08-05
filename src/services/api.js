export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return result.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(url);
  return result.json();
}
