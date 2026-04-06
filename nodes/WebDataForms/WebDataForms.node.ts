import {
	NodeConnectionTypes,
	NodeOperationError,
	type IHttpRequestMethods,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { submissionDescription } from './resources/submission';
import { workflowDescription } from './resources/workflow';
import { BASE_URL_API, PARTNER_ID } from './constants';

export class WebDataForms implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Web Data Forms',
		name: 'webDataForms',
		icon: { light: 'file:webDataForms.svg', dark: 'file:webDataForms.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Web Data Forms API',
		defaults: {
			name: 'Web Data Forms',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'webDataFormsApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Submission',
						value: 'submission',
					},
					{
						name: 'Workflow',
						value: 'workflow',
					},
				],
				default: 'submission', // Changed default to submission as user references were removed
			},
			...submissionDescription,
			...workflowDescription,
		],
	};

	methods = {
		loadOptions: {
			async getDataTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/groups/${credentials.groupId}/info`,
					qs: {
						'add-data-template-options-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.dataTemplatesOptionsSchema.options;
			},
			async getTemplateFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const dataTemplateId = this.getCurrentNodeParameter('dataTemplateId');
				if (!dataTemplateId) {
					throw new NodeOperationError(
						this.getNode(),
						'Please select a Data Template first to automatically load its specific fields.',
					);
				}
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/data-template-submissions/groups/${credentials.groupId}/data-templates/${dataTemplateId}/basic`,
					qs: {
						'page-size': '1',
						'add-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.dataTemplateSchema.fields;
			},
			async getSearchableFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const dataTemplateId = this.getCurrentNodeParameter('dataTemplateId');
				if (!dataTemplateId) {
					throw new NodeOperationError(
						this.getNode(),
						'Please select a Data Template first to load its searchable fields.',
					);
				}
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/data-template-submissions/groups/${credentials.groupId}/data-templates/${dataTemplateId}/basic`,
					qs: {
						'page-size': '1',
						'add-searchable-fields-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.searchableFieldsSchema.fields;
			},
			async getWorkflowStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/groups/${credentials.groupId}/info`,
					qs: {
						'add-workflow-state-options-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.workflowStateOptionsSchema.status.options;
			},
			async getWorkflowPriorities(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/groups/${credentials.groupId}/info`,
					qs: {
						'add-workflow-state-options-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.workflowStateOptionsSchema.priority.options;
			},
			async getWorkflowTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/groups/${credentials.groupId}/info`,
					qs: {
						'add-workflow-state-options-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				return response.workflowStateOptionsSchema.type.options;
			},
			async getGroupUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(this.getNode(), 'Please create credentials first.');
				}
				const options = {
					method: 'GET' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/groups/${credentials.groupId}/info`,
					qs: {
						'add-admin-user-options-schema': 'true',
						'partner-id': PARTNER_ID,
					},
					json: true,
				};
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				const users = response.groupUserOptionsSchema.options as INodePropertyOptions[];
				users.unshift({
					name: '- Unassigned (None) -',
					value: '',
				});
				return users;
			},
		},
	};
}
