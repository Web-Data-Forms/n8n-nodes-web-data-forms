import type { IDataObject, INodeProperties } from 'n8n-workflow';
import { workflowUpdateDescription } from './update';
import { sanitizePostReceive } from '../../utils';
import { BASE_URL_API, PARTNER_ID } from '../../constants';

const showOnlyForWorkflows = {
	resource: ['workflow'],
};

export const workflowDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkflows,
		},
		options: [
			{
				name: 'Update',
				value: 'update',
				description: 'Update workflow state of a submission',
				action: 'Update a workflow',
				routing: {
					request: {
						method: 'POST',
						url: `=${BASE_URL_API}/automations/data-template-submissions/{{$parameter.submissionNumber}}/groups/<groupId>/data-templates/{{$parameter.dataTemplateId}}/workflow`,
					},
					send: {
						type: 'body',
						// preSend needed because we need to transform data before sending.
						preSend: [
							async function (
								this: import('n8n-workflow').IExecuteSingleFunctions,
								requestOptions: import('n8n-workflow').IHttpRequestOptions,
							): Promise<import('n8n-workflow').IHttpRequestOptions> {
								const priorityId = this.getNodeParameter('priorityId') as string;
								const statusId = this.getNodeParameter('statusId') as string;
								const typeId = this.getNodeParameter('typeId') as string;
								const workflowAssigneeUserId = this.getNodeParameter(
									'workflowAssigneeUserId',
								) as string;
								const comment = this.getNodeParameter('comment') as string;

								const _body: IDataObject = {
									workflowComment: {
										commentTypeId: 'ee631766-8461-4736-93ef-fdcbccdf9fc9',
										content: comment,
									},
									workflowState: {
										priorityId,
										statusId,
										typeId,
									},
									partnerId: PARTNER_ID,
								};

								if (workflowAssigneeUserId === '') {
									_body.workflowAssignee = { userId: null };
								} else {
									_body.workflowAssignee = { userId: workflowAssigneeUserId };
								}

								requestOptions.body = {
									...((requestOptions.body as object) || {}),
									..._body,
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
		default: 'update',
	},
	{
		displayName: 'Data Template Name or ID',
		name: 'dataTemplateId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDataTemplates',
		},
		displayOptions: {
			show: showOnlyForWorkflows,
		},
		default: '',
		required: true,
		description:
			'Select the Data Template (Form) to interact with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	...workflowUpdateDescription,
];
