# n8n-nodes-web-data-forms

This is an n8n community node. It lets you use [Web Data Forms](https://webdataforms.com) in your n8n workflows.

Web Data Forms is a powerful front-end for automations and AI workflows. It enables businesses to build smart, branded forms and surveys, automate complex processes with integrated workflows, and manage data with a built-in headless CMS and real-time visual reporting.

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
2.  Log in to your [Web Data Forms dashboard](https://webapp.webdataforms.com).

### Authentication

You will need the following information to set up your credentials:

- **API Key**: Your unique API key found in the Web Data Forms Group->Info page.
- **Group ID**: Your specific Group identifier found in in the Web Data Forms Group->Info page.

## Compatibility

- Minimum n8n version: 1.0.0
- Tested against n8n version: 1.x

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Web Data Forms Website](https://webdataforms.com)
- [API Documentation](https://documenter.getpostman.com/view/32580100/2sB3WtrJLA)
- [Web Data Forms Tutorials](https://webdataforms.com/blog/tutorials)
- [Web Data Forms Support](https://dotzcom.atlassian.net/servicedesk/customer/portal/1)
