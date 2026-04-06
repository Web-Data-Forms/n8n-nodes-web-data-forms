import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

export function sanitizeNullUserId(data: unknown): unknown {
	if (data === null || data === undefined) return data;
	if (Array.isArray(data)) {
		return data.map(sanitizeNullUserId);
	}
	if (typeof data === 'object' && data !== null) {
		const obj = data as Record<string, unknown>;
		const newObj: Record<string, unknown> = {};
		for (const key of Object.keys(obj)) {
			// Centrally catch any userId fields evaluating to null from the API
			if (key === 'userId' && obj[key] === null) {
				newObj[key] = '';
			} else {
				newObj[key] = sanitizeNullUserId(obj[key]);
			}
		}
		return newObj;
	}
	return data;
}

export async function sanitizePostReceive(
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	return items.map((item) => ({
		...item,
		json: sanitizeNullUserId(item.json as IDataObject) as IDataObject,
	}));
}
