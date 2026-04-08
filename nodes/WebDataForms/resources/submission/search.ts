import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSearch = {
	operation: ['search'],
	resource: ['submission'],
};

export const submissionSearchDescription: INodeProperties[] = [
	{
		displayName: 'Searchable Field Name or ID',
		name: 'searchableFieldKey',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getSearchableFields',
			loadOptionsDependsOn: ['dataTemplateId'],
		},
		displayOptions: { show: showOnlyForSearch },
		default: '',
		required: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
		description:
			'The field to search by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/data/expressions/">expression</a>.',
	},
	{
		displayName: 'Search Value',
		name: 'searchableFieldValue',
		type: 'string',
		displayOptions: { show: showOnlyForSearch },
		default: '',
		required: true,
		description: 'The value to search for in the selected field',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: { show: showOnlyForSearch },
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
