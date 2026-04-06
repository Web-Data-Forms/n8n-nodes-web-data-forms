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
		description: 'The field to search by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
];
