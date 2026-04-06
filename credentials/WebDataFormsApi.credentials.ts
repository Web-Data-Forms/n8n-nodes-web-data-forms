import type {
	IAuthenticate,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';
import { BASE_URL_API } from '../nodes/WebDataForms/constants';

export class WebDataFormsApi implements ICredentialType {
	name = 'webDataFormsApi';

	displayName = 'Web Data Forms API';

	iconBasePath = 'file:../nodes/WebDataForms/';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-web-data-forms?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'Group ID',
			name: 'groupId',
			type: 'string',
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticate = async (credentials, requestOptions) => {
		const headers = {
			...requestOptions.headers,
			'x-wdf-api-key': credentials.apiKey as string,
			Authorization: 'none',
		};

		if (requestOptions.url && typeof requestOptions.url === 'string' && requestOptions.url.includes('<groupId>')) {
			requestOptions.url = requestOptions.url.replace('<groupId>', credentials.groupId as string);
		}

		return {
			...requestOptions,
			headers,
		};
	};

	test: ICredentialTestRequest = {
		request: {
			url: `=${BASE_URL_API}/groups/{{$credentials.groupId}}/info-basic`,
			method: 'GET',
		},
	};

	icon: Icon = {
		light: 'file:../nodes/WebDataForms/webDataForms.svg',
		dark: 'file:../nodes/WebDataForms/webDataForms.dark.svg',
	};
}
