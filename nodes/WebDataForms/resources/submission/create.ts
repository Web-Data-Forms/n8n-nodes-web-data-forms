import type { INodeProperties } from 'n8n-workflow';
import { PARTNER_ID } from '../../constants';

const showOnlyForCreate = {
	operation: ['create'],
	resource: ['submission'],
};

export const submissionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Partner ID',
		name: 'partnerId',
		type: 'hidden',
		default: PARTNER_ID,
		routing: {
			send: {
				type: 'body',
				property: 'partnerId',
			},
		},
	},
	{
		displayName: 'Fields to Map',
		name: 'fieldsUi',
		type: 'fixedCollection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForCreate },
		typeOptions: { multipleValues: true },
		options: [
			{
				name: 'fieldValues',
				displayName: 'Field Values',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'fieldId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getTemplateFields',
							loadOptionsDependsOn: ['dataTemplateId'],
						},
						default: '',
						// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/data/expressions/">expression</a>',
					},
					{
						displayName: 'Value',
						name: 'fieldValue',
						type: 'string',
						default: '',
						description: 'The value to assign to this field',
					},
				],
			},
		],
	},
];
