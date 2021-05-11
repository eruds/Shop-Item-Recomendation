import { item } from "../typeDefs/Item";

function getItemCategory(inputMessage: any) {
	const findCategoryRegex = /Books|Furniture|Music|Electronics/gi;
	const itemCategory = inputMessage.match(findCategoryRegex);
	return itemCategory;
}

function getBudget(inputMessage: any) {
	let findBudget = /budget.?\d+/gi;
	let budget = inputMessage.match(findBudget)[0].split(" ")[1];
	// let index = findBudget.findIndex(budget)
	// budget = findBudget.;
	return budget;
}

function max(a: number, b: number) {
	return a > b ? a : b;
}

function getBestValue(items: item[], itemCategory: string[], budget: number) {
	const filteredItems = items.filter((item) =>
		itemCategory.includes(item.category.toLowerCase())
	);
	let optimalCombination: number[][] = [];
	for (let i = 0; i < filteredItems.length; i++) {
		const { id, popularity, price } = filteredItems[i];
		optimalCombination.push([]);
		for (let currentTotal = 0; currentTotal * 1000 < budget; currentTotal++) {
			if (i == 0 || currentTotal == 0) {
				optimalCombination[i].push(0);
			} else if (currentTotal < Math.round(price / 1000)) {
				const topPopularity = optimalCombination[i - 1][currentTotal];
				optimalCombination[i].push(topPopularity);
			} else {
				const prevPrice = currentTotal - Math.round(price / 1000);
				const prevPopularity = optimalCombination[i - 1][prevPrice];
				const topPopularity = optimalCombination[i - 1][currentTotal];
				const bestValue = max(topPopularity, prevPopularity + popularity);
				optimalCombination[i].push(bestValue);
			}
		}
	}
	let recomendedItems: item[] = [];
	let currentCapacity = optimalCombination[1].length - 1;
	// console.log(currentCapacity);
	// console.log(optimalCombination.length);
	for (let i = optimalCombination.length - 1; i > 0; i--) {
		if (currentCapacity <= 0) {
			break;
		}
		const current = optimalCombination[i][currentCapacity];
		const topValue = optimalCombination[i - 1][currentCapacity];
		if (current != topValue) {
			recomendedItems.push(filteredItems[i]);
			const itemCapacity = Math.round(filteredItems[i].price / 1000);
			currentCapacity -= itemCapacity;
		}
	}
	return recomendedItems;
}

export function recomendation(inputMessage: string, items: item[]) {
	const budget = getBudget(inputMessage);
	const itemCategory = getItemCategory(inputMessage);
	const recommendedItems = getBestValue(items, itemCategory, budget);
	return { message: inputMessage, items: recommendedItems };
}
