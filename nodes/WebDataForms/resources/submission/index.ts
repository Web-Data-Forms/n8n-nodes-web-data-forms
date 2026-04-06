import type { INodeProperties } from 'n8n-workflow';
import { BASE_URL_API } from '../../constants';
import { submissionCreateDescription } from './create';
import { submissionFindDescription } from './find';
import { submissionSearchDescription } from './search';
import { submissionUpdateDescription } from './update';
import { sanitizePostReceive } from '../../utils';

const showOnlyForSubmissions = {
	resource: ['submission'],
};

export const submissionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSubmissions,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new submission',
				action: 'Create a submission',
				routing: {
					request: {
						method: 'POST',
						url: `=${BASE_URL_API}/automations/data-template-submissions/groups/<groupId>/data-templates/{{$parameter.dataTemplateId}}`,
					},
					send: {
						type: 'body',
						// preSend needed because we need to convert a fixedCollection into a dictionary object for the API.
						preSend: [
							async function (
								this: import('n8n-workflow').IExecuteSingleFunctions,
								requestOptions: import('n8n-workflow').IHttpRequestOptions,
							): Promise<import('n8n-workflow').IHttpRequestOptions> {
								const fieldsUi = this.getNodeParameter('fieldsUi') as {
									fieldValues: Array<{ fieldId: string; fieldValue: string }>;
								};
								const data: import('n8n-workflow').IDataObject = {};
								if (fieldsUi?.fieldValues) {
									for (const field of fieldsUi.fieldValues) {
										data[field.fieldId] = field.fieldValue;
									}
								}
								requestOptions.body = {
									...(requestOptions.body as object || {}),
									data,
								};
								return requestOptions;
							},
						],
					},
					output: {
						postReceive: [sanitizePostReceive],
					},
				},
			},
			{
				name: 'Find',
				value: 'find',
				description: 'Find a submission by number',
				action: 'Find a submission',
				routing: {
					request: {
						method: 'GET',
						url: `=${BASE_URL_API}/automations/data-template-submissions/{{$parameter.submissionNumber}}/groups/<groupId>/data-templates/{{$parameter.dataTemplateId}}`,
					},
					output: {
						postReceive: [sanitizePostReceive],
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search submissions by field value',
				action: 'Search submissions',
				routing: {
					request: {
						method: 'GET',
						url: `=${BASE_URL_API}/automations/data-template-submissions/groups/<groupId>/data-templates/{{$parameter.dataTemplateId}}`,
						qs: {
							'page-size': '10',
							detailed: 'true',
						},
					},
					send: {
						type: 'query',
						// preSend needed because we need to transform data before sending.
						preSend: [
							async function (
								this: import('n8n-workflow').IExecuteSingleFunctions,
								requestOptions: import('n8n-workflow').IHttpRequestOptions,
							): Promise<import('n8n-workflow').IHttpRequestOptions> {
								const searchableFieldKey = this.getNodeParameter('searchableFieldKey') as string;
								const searchableFieldValue = this.getNodeParameter(
									'searchableFieldValue',
								) as string;
								const parts = searchableFieldKey.split('__');
								requestOptions.qs = requestOptions.qs || {};
								requestOptions.qs['searchable-field-key'] = parts[0];
								requestOptions.qs['searchable-field-value'] = searchableFieldValue;
								if (parts[1]) {
									requestOptions.qs['searchable-field-index'] = parts[1];
								}
								return requestOptions;
							},
						],
					},
					output: {
						postReceive: [
							async function (
								this: import('n8n-workflow').IExecuteSingleFunctions,
								items: import('n8n-workflow').INodeExecutionData[],
								response: import('n8n-workflow').IN8nHttpFullResponse,
							): Promise<import('n8n-workflow').INodeExecutionData[]> {
								const data = response.body as {
									dataTemplateSubmissions: import('n8n-workflow').IDataObject[];
								};
								if (data && Array.isArray(data.dataTemplateSubmissions)) {
									return data.dataTemplateSubmissions.map((item) => ({ json: item }));
								}
								return items;
							},
							sanitizePostReceive,
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing submission',
				action: 'Update a submission',
				routing: {
					request: {
						method: 'PUT',
						url: `=${BASE_URL_API}/automations/data-template-submissions/{{$parameter.submissionNumber}}/groups/<groupId>/data-templates/{{$parameter.dataTemplateId}}`,
					},
					send: {
						type: 'body',
						preSend: [
							async function (
								this: import('n8n-workflow').IExecuteSingleFunctions,
								requestOptions: import('n8n-workflow').IHttpRequestOptions,
							): Promise<import('n8n-workflow').IHttpRequestOptions> {
								const fieldsUi = this.getNodeParameter('fieldsUi') as {
									fieldValues: Array<{ fieldId: string; fieldValue: string }>;
								};
								const data: import('n8n-workflow').IDataObject = {};
								if (fieldsUi?.fieldValues) {
									for (const field of fieldsUi.fieldValues) {
										data[field.fieldId] = field.fieldValue;
									}
								}
								requestOptions.body = {
									...(requestOptions.body as object || {}),
									data,
								};
								return requestOptions;
							},
						],
					},
					output: {
						postReceive: [sanitizePostReceive],
					},
				},
			},
		],
		default: 'create',
	},
	{
		displayName: 'Data Template Name or ID',
		name: 'dataTemplateId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDataTemplates',
		},
		displayOptions: {
			show: showOnlyForSubmissions,
		},
		default: '',
		required: true,
		description:
			'Select the Data Template (Form) to interact with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	...submissionCreateDescription,
	...submissionFindDescription,
	...submissionSearchDescription,
	...submissionUpdateDescription,
];
