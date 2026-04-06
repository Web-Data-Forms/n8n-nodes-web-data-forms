import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	operation: ['update'],
	resource: ['workflow'],
};

export const workflowUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Submission Number',
		name: 'submissionNumber',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		description: 'The number of the submission whose workflow to update',
	},
	{
		displayName: 'Status Name or ID',
		name: 'statusId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWorkflowStatuses',
		},
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		required: true,
		description:
			'The new status for the workflow. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Priority Name or ID',
		name: 'priorityId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWorkflowPriorities',
		},
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		required: true,
		description:
			'The new priority for the workflow. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Type Name or ID',
		name: 'typeId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getWorkflowTypes',
		},
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		required: true,
		description:
			'The new type for the workflow. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Assignee Name or ID',
		name: 'workflowAssigneeUserId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroupUsers',
		},
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		description:
			'The user to assign the workflow to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		displayOptions: { show: showOnlyForUpdate },
		default: '',
		description: 'A comment to add to the workflow update',
	},
];
