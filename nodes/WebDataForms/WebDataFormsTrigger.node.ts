import {
	NodeOperationError,
	type IHookFunctions,
	type IHttpRequestMethods,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
	type IDataObject,
} from 'n8n-workflow';
import { sanitizeNullUserId } from './utils';
import { BASE_URL_API, PARTNER_ID } from './constants';

export class WebDataFormsTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Web Data Forms Trigger',
		name: 'webDataFormsTrigger',
		icon: { light: 'file:webDataForms.svg', dark: 'file:webDataForms.dark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Handle Web Data Forms webhooks',
		defaults: {
			name: 'Web Data Forms Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: ['main'],
		credentials: [{ name: 'webDataFormsApi', required: true }],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],

		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'New Submission',
						value: 'ON_SUBMIT',
						description: 'Triggers when a new submission is created',
					},
					{
						name: 'Workflow Update',
						value: 'ON_WORKFLOW_CHANGE',
						description: 'Triggers when a workflow is updated',
					},
				],
				default: 'ON_SUBMIT',
				required: true,
			},
			{
				displayName: 'Data Template Name or ID',
				name: 'dataTemplateId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getDataTemplates',
				},
				default: '',
				required: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
				description:
					'Select the Data Template (Form) to listen to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/data/expressions/">expression</a>.',
			},
		],
	};

	methods = {
		loadOptions: {
			async getDataTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('webDataFormsApi');
				if (!credentials.groupId) {
					throw new NodeOperationError(
						this.getNode(),
						'Please create credentials first.',
					);
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
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('webDataFormsApi');
				const dataTemplateId = this.getNodeParameter('dataTemplateId') as string;
				const event = this.getNodeParameter('event') as string;
				const webhookUrl = this.getNodeWebhookUrl('default');

				const options = {
					method: 'POST' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/data-templates/${dataTemplateId}/groups/${credentials.groupId}/webhooks`,
					body: {
						url: webhookUrl,
						partnerId: PARTNER_ID,
						type: event,
					},
					json: true,
				};

				const responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'webDataFormsApi',
					options,
				);
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.externalHookId;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('webDataFormsApi');
				const dataTemplateId = this.getNodeParameter('dataTemplateId') as string;
				const webhookData = this.getWorkflowStaticData('node');

				if (!webhookData.webhookId) {
					return true;
				}

				const options = {
					method: 'DELETE' as IHttpRequestMethods,
					url: `${BASE_URL_API}/automations/data-templates/${dataTemplateId}/groups/${credentials.groupId}/webhooks/${webhookData.webhookId}`,
					json: true,
				};

				try {
					await this.helpers.httpRequestWithAuthentication.call(this, 'webDataFormsApi', options);
				} catch {
					// Even if it fails (e.g. already deleted), we return true to continue
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const items = Array.isArray(bodyData) ? bodyData : [bodyData];
		return {
			workflowData: [items.map((item) => ({ json: sanitizeNullUserId(item) as IDataObject }))],
		};
	}
}
