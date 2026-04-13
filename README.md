# n8n-nodes-web-data-forms

This is an n8n community node. It lets you use [Web Data Forms](https://webdataforms.com) in your n8n workflows.

The deepest n8n integration for any forms platform. Go beyond simple webhooks with full-lifecycle triggers, submission management, and deep submission/form workflow CRUD operations. Web Data Forms is a powerful front-end for automations and AI workflows. It enables users to build smart, branded forms and automate complex processes with integrated form workflows and visual reporting.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Submission

- **Create**: Create a new submission for a specific Data Template.
- **Find**: Retrieve a single submission by its unique submission number.
- **Search**: Search for submissions based on specific field values.
- **Update**: Update existing submission data.

### Workflow

- **Update**: Modify the workflow state of a submission, including status, priority, type, and assignee, and add internal comments.

### Triggers

- **New Submission**: Triggers a workflow when a new form is submitted.
- **Workflow Updated**: Triggers a workflow when a submission's workflow state (e.g., status or priority) is changed.

## Credentials

To use this node, you will need to authenticate with your Web Data Forms account.

### Prerequisites

1.  Sign up for a [Web Data Forms](https://webdataforms.com/pricing) account.
2.  Log in to your [Web Data Forms account](https://webapp.webdataforms.com).
3.  Retreive your Group ID and API Key (details below).

### Authentication

You will need the following information to set up your credentials:

- **API Key**: Your unique API key found in the Web Data Forms Group->Information page.
- **Group ID**: Your specific Group identifier found in in the Web Data Forms Group->Information page.

## Important Note

Automation must be enabled for the particluar Data Template (form) that you want to use on n8n. To enable automation for a Data Template please navigate to the Data Templates page, find the appropriate Data Template, click on the 'Details / Modify' button, set Automation to Enabled and finally click the 'Update' button to save changes.

## Compatibility

- Minimum n8n version: 1.0.0
- Tested against n8n version: 1.x

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Web Data Forms Website](https://webdataforms.com)
- [API Documentation](https://documenter.getpostman.com/view/32580100/2sB3WtrJLA)
- [Web Data Forms Tutorials](https://webdataforms.com/blog/tutorials)
- [Web Data Forms Support](https://dotzcom.atlassian.net/servicedesk/customer/portal/1)
