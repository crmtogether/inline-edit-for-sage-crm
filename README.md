# inline-edit-for-sage-crm
Inline field editing for Sage CRM

Provide a better user experience (and demo) within Sage CRM with inline editing

<img src="https://raw.githubusercontent.com/crmtogether/inline-edit-for-sage-crm/master/company_summary_sage_crm.png" alt="Company Summary Sage CRM" />

Screen support out of the box is

1. Company screen - 'CompanyBoxLong'
2. Person screen - 'PersonBoxLong'
3. Case screen - 'CaseDetailBox'
4. Opportunity screen = 'OpportunityDetailBox'
5. Lead screens - 'LeadCustomScreen','LeadDetailScreen','LeadCompanyScreen','LeadPersonScreen'

To add in new actions/screens edit "entrygroup.asp" (function _getScreen )

For multiple Sage CRM screens on a page see how Lead screens is done.

The Sage CRM component is available and this creates

1. WWWRoot\js\custom\inline.js
and files in
2. WWWRoot\CustomPages\inline\


Path of the CRM Together Open Source Initiative

https://crmtogether.com/products/open-source/

