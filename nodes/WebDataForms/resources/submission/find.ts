import type { INodeProperties } from 'n8n-workflow';

const showOnlyForFind = {
	operation: ['find'],
	resource: ['submission'],
};

export const submissionFindDescription: INodeProperties[] = [
	{
		displayName: 'Submission Number',
		name: 'submissionNumber',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForFind },
		default: '',
		description: 'The number of the submission to find',
	},
];
