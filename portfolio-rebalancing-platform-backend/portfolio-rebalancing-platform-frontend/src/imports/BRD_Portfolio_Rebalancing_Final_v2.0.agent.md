**BUSINESS REQUIREMENTS DOCUMENT**

Advisor Portfolio Rebalancing & Suitability Review Platform

**Version:** 1.0 **Status:** Draft for Review **Date:** May 2025

| **Document Owner**      | Product Manager - Wealth Advisory |
| ----------------------- | --------------------------------- |
| **Business Sponsor**    | Head of Wealth Advisory           |
| **Compliance Reviewer** | Chief Compliance Officer          |
| **Tech Lead**           | Technology Lead - Wealth Tech     |
| **Classification**      | Confidential - Internal Use Only  |
| **Review Cycle**        | Bi-weekly until Sign-off          |

**★ LEGEND - AI-ADDED REQUIREMENTS:** Requirements and sections marked with **★ AI-Added** were not present in the source documents (Meeting Notes or Requirement Brief) and have been inferred by the document author to ensure completeness, deliverability, and production readiness. These items should be reviewed and formally accepted or rejected by the business sponsor before baseline sign-off.

Table of Contents

1\. Executive Summary

Wealth management firms face growing pressure to modernize manual, error-prone portfolio rebalancing processes. This Business Requirements Document (BRD) defines the end-to-end functional, non-functional, and compliance requirements for a web-based Advisor Portfolio Rebalancing & Suitability Review Platform (hereafter 'the Platform').

The Platform will digitise and automate the rebalancing lifecycle - from portfolio drift detection through proposal authoring, suitability validation, multi-stage compliance approval, client summary generation, and full audit trail - enabling wealth advisors to operate faster, more consistently, and in full regulatory alignment.

This document serves as the authoritative delivery contract for the MVP release. It provides the complete input required to: (a) create a JIRA product backlog with epics and user stories; (b) design the system architecture; and (c) produce UX wireframes and prototypes.

| **30-40%**<br><br>Advisor productivity improvement (target) | **40-50%**<br><br>Compliance effort reduction (target) | **6**<br><br>Core epics in MVP scope | **49+**<br><br>Functional requirements defined |
| ----------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------ | ---------------------------------------------- |

2\. Business Context & Problem Statement

2.1 Business Context

Wealth advisors currently manage portfolio rebalancing through a combination of spreadsheets, email chains, and disconnected compliance checklists. This fragmented approach creates:

- Delays in rebalancing execution - increasing client portfolio drift beyond acceptable tolerance bands.
- Reactive, inconsistent compliance validation - reviews occur after proposals are formed rather than being embedded in the workflow.
- No centralised, tamper-proof audit trail - creating significant regulatory exposure.
- Difficulty scaling advisory capacity - manual processes cap the number of portfolios an advisor can actively manage.

  2.2 Problem Statement

| **Problem Area**         | **Description**                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Process Inefficiency** | Manual, spreadsheet-heavy rebalancing workflows create significant delays (estimated 3-5 days per proposal end-to-end), errors, and rework. |
| **Compliance Risk**      | Suitability validation is performed ad-hoc and inconsistently; violations may go undetected until post-execution review.                    |
| **Audit Deficiency**     | Absence of a centralised, immutable audit trail increases regulatory risk and hinders internal review.                                      |
| **Collaboration Gaps**   | Advisors and compliance officers exchange proposals via email with no version control, leading to confusion over current proposal state.    |
| **Advisor Capacity**     | Time spent on administrative rebalancing tasks limits the number of clients each advisor can actively manage.                               |

3\. Objectives & Success Metrics

3.1 Strategic Objectives

- OBJ-1: Streamline the end-to-end rebalancing workflow from portfolio drift detection to approved proposal within a single digital platform.
- OBJ-2: Automate suitability validation to embed compliance-by-design into the proposal workflow.
- OBJ-3: Improve advisor productivity by 30-40% by eliminating manual tasks.
- OBJ-4: Reduce compliance review effort by 40-50% through structured, pre-validated proposals.
- OBJ-5: Establish a centralised, immutable audit trail to meet regulatory obligations.
- OBJ-6: Enable AI-assisted client communication summaries to improve advisor-client engagement quality.

  3.2 Success Metrics

| **Metric**                            | **Baseline (Current State)**   | **Target (6 months post-launch)**        | **Measurement Method**                         |
| ------------------------------------- | ------------------------------ | ---------------------------------------- | ---------------------------------------------- |
| **Proposal creation time**            | 3-5 business days (end-to-end) | **< 1 business day**                     | Platform analytics - avg. time Draft to Submit |
| **Compliance review cycles**          | 2-3 iterations on avg.         | **≤ 1 iteration**                        | Avg. revision count per proposal               |
| **Suitability violation escape rate** | Not measured (manual)          | **0% critical violations post-approval** | Audit log analysis                             |
| **Advisor portfolio capacity**        | Baseline TBD pre-launch        | **+30% portfolios per advisor**          | CRM headcount tracking                         |
| **Audit trail completeness**          | 0% (no system)                 | **100% actions logged**                  | Automated audit log coverage report            |
| **Compliance effort per proposal**    | Baseline TBD pre-launch        | **−40-50% hours per proposal**           | Compliance team time tracking                  |

4\. Stakeholders & RACI Matrix

4.1 Stakeholder Register

| **Role**                        | **Stakeholder**         | **R** | **A** | **C / I**  |
| ------------------------------- | ----------------------- | ----- | ----- | ---------- |
| **Head of Wealth Advisory**     | Business Sponsor        | **-** | **A** | undefinedC |
| **Senior Financial Advisor**    | Primary end-user rep.   | **R** | **-** | undefinedC |
| **Compliance Officer**          | Regulatory gatekeeper   | **R** | **A** | undefinedC |
| **Product Manager**             | Requirements owner      | **R** | **A** | undefined- |
| **Operations Lead**             | Process & ops alignment | **R** | **-** | undefinedC |
| **Technology Lead**             | Architecture & delivery | **R** | **-** | undefinedC |
| **Financial Advisor (general)** | Day-to-day user         | **R** | **-** | undefinedI |
| **Operations Team**             | Support & data ops      | **R** | **-** | undefinedI |
| **End Client**                  | Recipient of summaries  | **-** | **-** | undefinedI |

R = Responsible | A = Accountable | C = Consulted | I = Informed

5\. Scope

5.1 In Scope (MVP)

| **Epic #** | **Epic Name**                       | **Description**                                                                            |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| **EP-01**  | **Advisor Dashboard**               | Portfolio summary view with drift indicators, filters, and active proposal status.         |
| **EP-02**  | **Portfolio Detail View**           | Client-level holding details, risk profile, allocation vs. target, and proposal history.   |
| **EP-03**  | **Rebalancing Proposal**            | Create, edit, version, and submit allocation proposals with real-time impact preview.      |
| **EP-04**  | **Suitability Validation Engine**   | Automated, rules-driven suitability checking on proposal submission.                       |
| **EP-05**  | **Approval Workflow**               | Multi-stage workflow (Draft → Compliance Review → Approved / Rejected) with notifications. |
| **EP-06**  | **Audit Trail & Reporting**         | Immutable, searchable action log with export capability.                                   |
| **EP-07**  | **AI Summary Generation**           | AI-assisted plain-language client summary with advisor editing and PDF export.             |
| **EP-08**  | **Authentication & Access Control** | SSO, RBAC, MFA, and session management. **★ AI-ADDED**                                     |

5.2 Out of Scope

- Real-time market data integration and live pricing feeds.
- Trade execution or order management system (OMS) connectivity.
- Client self-service portal or direct client login.
- Mobile native application (iOS / Android).
- Integration with external CRM systems (deferred to Phase 2). **★ AI-ADDED**
- Regulatory filing or report submission to external bodies. **★ AI-ADDED**

  5.3 Assumptions

- The MVP will use mock / seeded data; live custodian data integration is deferred.
- Compliance rules will be implemented as a simplified, configurable rules engine - not a full regulatory rules management system.
- The platform is a single-tenant deployment for MVP; multi-tenancy is a Phase 2 consideration. **★ AI-ADDED**
- All users are internal employees; external client access is out of scope for MVP.
- The Platform will be deployed in a cloud-hosted environment (AWS or Azure) capable of meeting the NFRs defined in Section 9. **★ AI-ADDED**

6\. User Roles & Personas

| **Role**                            | **Primary Goals**                                                                         | **Key Pain Points**                                                               | **System Permissions**                                                                          |
| ----------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Financial Advisor**               | Create and submit rebalancing proposals; view portfolio drift; generate client summaries. | Manual data gathering; lack of real-time drift view; cumbersome approval chasing. | Create/edit proposals; view own client portfolios; generate AI summaries; view own audit trail. |
| **Compliance Officer**              | Review and approve/reject proposals; configure suitability rules; monitor audit trail.    | Inconsistent proposal formats; no pre-validation; audit trail gaps.               | Approve/reject proposals; configure rules; full audit trail access; export reports.             |
| **Operations Team**                 | Monitor workflow status; assist advisors; manage data.                                    | No visibility into proposal pipeline; no escalation mechanism.                    | View all proposals; manage user accounts; view audit trail.                                     |
| **System Administrator ★ AI-ADDED** | Manage users, roles, SSO configuration, and platform settings.                            | No central admin interface; manual user provisioning.                             | Full admin access; user management; role assignment; system configuration.                      |

7\. End-to-End User Journey

The following represents the primary happy-path workflow. Each step maps to one or more functional requirements in Section 8.

| **#**  | **Actor**              | **Action / System Response**                                                                                      | **State**             | **FR Ref**            |
| ------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| **1**  | **Financial Advisor**  | Logs in via SSO; system validates identity and loads role-based dashboard.                                        | _Authenticated_       | FR-045, FR-046        |
| **2**  | **Financial Advisor**  | Views dashboard; system displays all assigned client portfolios with drift indicators and proposal status.        | _Dashboard_           | FR-001-FR-005         |
| **3**  | **Financial Advisor**  | Selects a client; system loads portfolio detail view with holdings, allocation vs. target, and client profile.    | _Portfolio Detail_    | FR-006-FR-010         |
| **4**  | **Financial Advisor**  | Initiates a new rebalancing proposal; system creates a DRAFT proposal with unique ID.                             | _Draft_               | FR-011-FR-016         |
| **5**  | **Financial Advisor**  | Adjusts allocation percentages; system validates 100% sum and previews projected impact in real time.             | _Draft_               | FR-013-FR-014         |
| **6**  | **Financial Advisor**  | Adds notes and optional attachments; system auto-saves draft every 2 minutes.                                     | _Draft_               | FR-015, FR-018-FR-019 |
| **7**  | **Financial Advisor**  | Submits proposal; system triggers suitability validation engine.                                                  | _Validating_          | FR-022-FR-026         |
| **8**  | **System**             | Suitability check passes (or advisor acknowledges non-critical warnings); proposal advances to Compliance Review. | _Compliance Review_   | FR-024-FR-026         |
| **9**  | **System**             | Compliance Officer notified via in-app alert and email.                                                           | _Compliance Review_   | FR-029                |
| **10** | **Compliance Officer** | Reviews proposal, comments, attachments, and suitability report; approves or rejects with mandatory comment.      | _Compliance Review_   | FR-030                |
| **11** | **System**             | Approval / rejection recorded; audit log updated; advisor notified.                                               | _Approved / Rejected_ | FR-031, FR-040-FR-042 |
| **12** | **Financial Advisor**  | Generates AI-assisted client summary; edits and exports as PDF.                                                   | _Summary_             | FR-035-FR-038         |

8\. Functional Requirements

All requirements are atomic, uniquely identified, and testable. Requirements marked ★ AI-Added (yellow rows) were inferred to ensure completeness and were not present in the source documents.

EP-01 · Advisor Dashboard

| **ID**     | **Requirement Statement**                                                                                                                                                                                                                      | **Acceptance Criteria**                                                                                                 | **Source**   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-001** | The system shall display a portfolio summary dashboard listing all client accounts assigned to the currently authenticated advisor, showing: client name, risk profile, current vs. target allocation, drift percentage, and last review date. | Dashboard loads within 3 seconds; all assigned clients are visible; each row displays all 5 required data fields.       | Source Docs  |
| **FR-002** | The dashboard shall display a colour-coded drift indicator (Green: drift ≤ 5%, Amber: 5-10%, Red: > 10%) for each client portfolio.                                                                                                            | Indicator colour matches defined thresholds; colour legend is visible on the page.                                      | Source Docs  |
| **FR-003** | The dashboard shall support column-level sorting (ascending/descending) and filtering by: client name (text search), risk profile (dropdown), drift band (Green/Amber/Red), and last review date range.                                        | Sorting and filtering operate without full page reload; results update within 1 second of filter change.                | Source Docs  |
| **FR-004** | The dashboard shall display the current status (Draft / Compliance Review / Approved / Rejected / No Active Proposal) of the most recent rebalancing proposal for each client.                                                                 | Status badge reflects the latest proposal state; no stale data older than the last page load.                           | Source Docs  |
| **FR-005** | The dashboard shall refresh portfolio drift data automatically upon each page load and support a manual refresh button with a visible last-updated timestamp.                                                                                  | Manual refresh button is present; last-updated timestamp updates on refresh; stale data is never shown beyond 24 hours. | **AI-Added** |

EP-02 · Portfolio Detail View

| **ID**     | **Requirement Statement**                                                                                                                                                                                          | **Acceptance Criteria**                                                                                                         | **Source**   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-006** | The portfolio detail view shall display all holdings for the selected client, including: asset class, security name, ticker symbol, quantity, current market value, current allocation %, and target allocation %. | All 7 data fields are rendered for each holding; page loads within 3 seconds.                                                   | Source Docs  |
| **FR-007** | The portfolio detail view shall include a visual allocation chart (bar or donut) comparing current allocation vs. target allocation per asset class.                                                               | Chart renders current and target side-by-side; asset class labels are shown; chart is readable at 1280×800 resolution.          | Source Docs  |
| **FR-008** | The system shall display the client's risk profile, stated investment goals, and investment time horizon on the portfolio detail page.                                                                             | Risk profile, goals, and horizon are visible on the page without scrolling to a separate section.                               | Source Docs  |
| **FR-009** | The portfolio detail view shall display a version history list of all prior rebalancing proposals for the client, showing: proposal ID, created date, status, and advisor name.                                    | All historical proposals are listed; clicking a proposal ID navigates to a read-only proposal view.                             | **AI-Added** |
| **FR-010** | The system shall allow the advisor to download the current client holdings as a CSV or Excel file from the portfolio detail view.                                                                                  | Download button is present; generated file contains all displayed fields; file downloads without navigating away from the page. | **AI-Added** |

EP-03 · Rebalancing Proposal

| **ID**     | **Requirement Statement**                                                                                                                                                                   | **Acceptance Criteria**                                                                                                                                             | **Source**   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-011** | The system shall allow an authenticated advisor to initiate a new rebalancing proposal for any client in their assigned portfolio.                                                          | New proposal creation action is accessible from both the dashboard and portfolio detail view; proposal is created in Draft state.                                   | Source Docs  |
| **FR-012** | The proposal creation interface shall allow the advisor to adjust target allocation percentages per asset class using numeric input fields and/or slider controls.                          | Changes are reflected immediately in the UI; both input field and slider remain synchronised.                                                                       | Source Docs  |
| **FR-013** | The system shall validate in real time that the sum of all allocation percentages equals exactly 100%; the submit action shall be disabled if the sum differs from 100%.                    | Submit button is disabled and an inline error message is shown when total allocation ≠ 100%; error clears when total = 100%.                                        | Source Docs  |
| **FR-014** | The system shall display a side-by-side comparison panel showing: current allocation vs. proposed allocation, and estimated value change per asset class based on the proposed percentages. | Comparison panel updates within 500 ms of any allocation change; all asset classes are shown.                                                                       | Source Docs  |
| **FR-015** | The system shall auto-save a proposal in Draft state at a minimum interval of every 2 minutes; the UI shall display a 'Last saved at HH:MM:SS' timestamp.                                   | Auto-save occurs without user action; timestamp updates after each save; no data is lost if the browser tab is closed between saves.                                | **AI-Added** |
| **FR-016** | Each new proposal shall be assigned a unique system-generated identifier in the format PROP-YYYYMMDD-NNNN (e.g., PROP-20250515-0001).                                                       | Proposal ID is displayed in the proposal header; no two proposals share the same ID; format matches the defined pattern.                                            | **AI-Added** |
| **FR-017** | The system shall maintain an immutable version history for each proposal; every manual save or status transition shall create a new version snapshot.                                       | Version number increments on each save; prior versions are accessible in read-only mode; no version can be modified after creation.                                 | Source Docs  |
| **FR-018** | The advisor shall be able to add, edit, and delete free-text notes on a proposal at any point while it is in Draft state.                                                                   | Notes field accepts up to 2,000 characters; character count is displayed; notes are saved with the proposal version.                                                | Source Docs  |
| **FR-019** | The advisor shall be able to attach up to 5 supporting documents (PDF format, maximum 10 MB per file) to a proposal.                                                                        | Upload control enforces file type (PDF) and size (10 MB) limits; excess files are rejected with an error message; uploaded files are listed with filename and size. | **AI-Added** |
| **FR-020** | The advisor shall be able to discard a proposal that is in Draft state; the system shall require confirmation before deletion.                                                              | Discard action prompts a confirmation dialog; confirmed discard permanently removes the draft and is recorded in the audit log.                                     | Source Docs  |

EP-04 · Suitability Validation Engine

| **ID**     | **Requirement Statement**                                                                                                                                                                                                                                    | **Acceptance Criteria**                                                                                                                                      | **Source**   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| **FR-021** | The system shall automatically execute the suitability validation engine when a proposal is submitted by the advisor.                                                                                                                                        | Validation is triggered immediately on submission; advisor cannot navigate away during validation; a progress indicator is shown.                            | Source Docs  |
| **FR-022** | The suitability engine shall evaluate proposed allocations against the client's risk profile classification (Conservative / Moderate / Aggressive / Custom) using the configured tolerance rules.                                                            | Validation correctly identifies violations for at least Conservative, Moderate, and Aggressive profiles per the seeded rule set.                             | Source Docs  |
| **FR-023** | The suitability engine shall return a structured validation report containing: overall result (Pass / Fail / Pass with Warnings), a list of violated rules (if any), rule ID, severity (Critical / Warning), and a plain-language description per violation. | Validation report is displayed on screen; all violated rules are listed; no violated rule is omitted from the report.                                        | Source Docs  |
| **FR-024** | The system shall block proposal submission and display a blocking error message if the validation result contains one or more Critical violations.                                                                                                           | Submit action is blocked; error message lists each critical violation; advisor must modify allocation to resolve before resubmitting.                        | **AI-Added** |
| **FR-025** | The system shall allow proposal submission when validation returns Warnings only, after the advisor explicitly acknowledges each warning via a checkbox confirmation.                                                                                        | Warning acknowledgement modal appears; submission is only possible after all warning checkboxes are checked; acknowledgements are recorded in the audit log. | **AI-Added** |
| **FR-026** | An authenticated Compliance Officer or Admin shall be able to create, edit, enable, and disable suitability rules via an admin configuration panel.                                                                                                          | Rule changes take effect on the next proposal submission; rule modification events are recorded in the audit log.                                            | **AI-Added** |

EP-05 · Approval Workflow

| **ID**     | **Requirement Statement**                                                                                                                                                                                                           | **Acceptance Criteria**                                                                                                                                                 | **Source**   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-027** | The system shall enforce a multi-stage approval workflow with the following states: Draft → Submitted → Compliance Review → Approved / Rejected.                                                                                    | Proposals can only transition between states in the defined sequence; state transitions are atomic and logged.                                                          | Source Docs  |
| **FR-028** | Upon a proposal reaching Compliance Review state, the system shall send an in-app notification and an email notification to all compliance officers assigned to the originating advisor's portfolio.                                | In-app notification appears within 30 seconds of state change; email is dispatched within 5 minutes; notification includes proposal ID, client name, and a direct link. | **AI-Added** |
| **FR-029** | A Compliance Officer shall be able to approve or reject a proposal from the Compliance Review state; rejection requires a mandatory free-text comment (minimum 10 characters).                                                      | Approve / Reject actions are only available in Compliance Review state; the Reject action is blocked if the comment field is empty or < 10 chars.                       | Source Docs  |
| **FR-030** | Upon proposal approval or rejection, the system shall send an in-app notification and an email notification to the originating advisor.                                                                                             | Advisor receives notification within 30 seconds (in-app) and 5 minutes (email); notification includes the compliance officer's comment.                                 | **AI-Added** |
| **FR-031** | A rejected proposal shall be returned to Draft state and be editable by the originating advisor; the advisor shall be able to revise and resubmit.                                                                                  | After rejection, proposal state = Draft; advisor can edit and resubmit; resubmission creates a new version.                                                             | Source Docs  |
| **FR-032** | The system shall escalate a proposal automatically to the Operations Lead if it remains in Compliance Review state for more than 5 business days, and send an escalation notification.                                              | Escalation trigger fires precisely at the 5-business-day threshold (excluding weekends and public holidays); escalation event is logged.                                | **AI-Added** |
| **FR-033** | A Compliance Officer shall be able to delegate approval authority for a specified period to another Compliance Officer; all delegated approvals shall be attributed to both the delegate and the original officer in the audit log. | Delegation can be set with a start and end date; delegated approvals display both officer names in the audit trail.                                                     | **AI-Added** |

EP-07 · AI-Generated Client Summary

| **ID**     | **Requirement Statement**                                                                                                                                                     | **Acceptance Criteria**                                                                                                                                          | **Source**   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-034** | The system shall provide an AI-assisted summary generation function that produces a plain-language client-friendly explanation of the proposed portfolio changes.             | AI summary generation is accessible from the approved proposal view; output is in plain English with no technical jargon.                                        | Source Docs  |
| **FR-035** | The AI-generated summary shall reference the client's stated investment goals and time horizon to contextualise the proposed changes.                                         | Summary explicitly references at least one of: client goals, time horizon, or risk profile.                                                                      | Source Docs  |
| **FR-036** | The advisor shall be able to review, edit, and save the AI-generated summary before it is considered final.                                                                   | Summary is presented in an editable rich-text field; save action creates a versioned snapshot; the original AI output is preserved alongside the edited version. | **AI-Added** |
| **FR-037** | The finalised client summary shall be exportable as a PDF document, including the firm's branding, advisor name, client name, and proposal ID.                                | Exported PDF includes all 4 required fields; PDF is readable and correctly formatted at A4 or US Letter paper size.                                              | **AI-Added** |
| **FR-038** | AI summary generation shall complete and render the result within 30 seconds of the advisor initiating the action; a progress indicator shall be displayed during generation. | Generation completes within 30 seconds in 95th percentile testing; spinner/progress indicator is visible throughout generation.                                  | **AI-Added** |

EP-06 · Audit Trail & Reporting

| **ID**     | **Requirement Statement**                                                                                                                                                                                                  | **Acceptance Criteria**                                                                                                                              | **Source**   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-039** | The system shall automatically log every user-initiated and system-initiated action, including: login/logout, proposal create/edit/submit/approve/reject/discard, rule changes, user management changes, and file uploads. | All listed action types generate an audit log entry; no auditable action is omitted.                                                                 | Source Docs  |
| **FR-040** | Each audit log entry shall record: UTC timestamp, user ID, user role, action type, target entity type, target entity ID, previous state, new state, source IP address, and session ID.                                     | Spot-check of 10 random log entries confirms all 10 fields are present and correctly populated.                                                      | **AI-Added** |
| **FR-041** | The audit trail shall be read-only; no user, including Admins, shall be able to modify or delete audit log entries through the application UI.                                                                             | No edit or delete control is present for audit entries; direct database access to log table is blocked at the application layer.                     | Source Docs  |
| **FR-042** | Audit logs shall be retained for a minimum of 7 years from the date of the logged event.                                                                                                                                   | Retention policy is enforced; entries older than 7 years are not deleted within the test period; retention configuration is documented.              | **AI-Added** |
| **FR-043** | A Compliance Officer or Admin shall be able to search and filter the audit log by: date range, user ID, action type, proposal ID, and client ID; and export the filtered results as a CSV file.                            | Filter combinations return accurate results; CSV export contains all displayed columns; export completes within 10 seconds for up to 10,000 records. | **AI-Added** |

EP-08 · Authentication & Access Control ★ AI-Added

| **ID**     | **Requirement Statement**                                                                                                                                                                                       | **Acceptance Criteria**                                                                                                 | **Source**   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------ |
| **FR-044** | The system shall support Single Sign-On (SSO) via SAML 2.0 or OAuth 2.0 / OIDC, integrating with the firm's existing identity provider.                                                                         | Successful SSO login using the configured IdP; failed IdP authentication blocks platform access.                        | **AI-Added** |
| **FR-045** | The system shall enforce Role-Based Access Control (RBAC) with four roles: Financial Advisor, Compliance Officer, Operations, and System Admin; each role shall have a defined, non-overlapping permission set. | Each role can only access the features defined in Section 6; cross-role permission violations return HTTP 403.          | **AI-Added** |
| **FR-046** | User sessions shall automatically expire after 30 minutes of inactivity; the user shall be prompted with a 2-minute warning before expiry.                                                                      | Session expires at 30-minute mark; warning modal appears at 28 minutes; user can extend session from the warning modal. | **AI-Added** |
| **FR-047** | Multi-Factor Authentication (MFA) shall be enforced for all users with Compliance Officer and System Admin roles.                                                                                               | Login without MFA for these roles is blocked; MFA challenge is presented after primary credential validation.           | **AI-Added** |
| **FR-048** | A System Admin shall be able to create new user accounts, deactivate existing accounts, assign and modify roles, and reset user credentials via the admin panel.                                                | All four operations succeed; deactivated accounts cannot log in; all changes are logged in the audit trail.             | **AI-Added** |

9\. Non-Functional Requirements

All NFRs are measurable and testable. Requirements marked ★ AI-Added were not present in the source documents.

| **ID**      | **Category**          | **Requirement**                                                                                                                                             | **Measurable Metric / SLA**                                                                                            | **Source**   |
| ----------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ |
| **NFR-001** | Performance           | Page load time for the Dashboard and Portfolio Detail views shall not exceed 3 seconds at the 95th percentile under a concurrent user load of 100 users.    | P95 page load ≤ 3s in load test at 100 concurrent users                                                                | Source Docs  |
| **NFR-002** | Performance           | The suitability validation engine shall return a result within 5 seconds of proposal submission.                                                            | P95 validation response ≤ 5s; measured end-to-end from submission click to result display                              | Source Docs  |
| **NFR-003** | Performance           | All non-AI REST API endpoints shall respond within 500 ms at the 95th percentile.                                                                           | P95 API response time ≤ 500 ms in load testing                                                                         | **AI-Added** |
| **NFR-004** | Availability          | The Platform shall maintain a minimum uptime of 99.5% during business hours (08:00-20:00 local time, Monday-Friday), excluding planned maintenance windows. | Uptime ≥ 99.5% measured over any rolling 30-day period                                                                 | Source Docs  |
| **NFR-005** | Scalability           | The Platform shall support up to 500 concurrent authenticated users without performance degradation below the defined NFR thresholds.                       | Load test at 500 concurrent users; NFR-001, NFR-002, NFR-003 thresholds maintained                                     | **AI-Added** |
| **NFR-006** | Security              | All data in transit between client browsers and the server shall be encrypted using TLS 1.2 or higher.                                                      | TLS version confirmed via SSL Labs scan; HTTP connections redirect to HTTPS                                            | Source Docs  |
| **NFR-007** | Security              | All data at rest, including database storage and file attachments, shall be encrypted using AES-256 or equivalent.                                          | Encryption confirmed via infrastructure audit; no plaintext PII stored at rest                                         | **AI-Added** |
| **NFR-008** | Accessibility         | The Platform UI shall conform to WCAG 2.1 Level AA accessibility standards.                                                                                 | Automated accessibility scan (axe-core or equivalent) returns 0 critical violations; manual screen reader test passes  | **AI-Added** |
| **NFR-009** | Browser Compatibility | The Platform shall be fully functional on the two most recent stable releases of: Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.         | Smoke test suite passes on all 8 browser/version combinations listed                                                   | **AI-Added** |
| **NFR-010** | Responsiveness        | The Platform UI shall be responsive and usable on tablet-sized viewports (minimum 768px width).                                                             | All core workflows complete successfully at 768px viewport width on a physical or emulated tablet device               | **AI-Added** |
| **NFR-011** | Data Retention        | Audit logs shall be retained for a minimum of 7 years; rebalancing proposal data and attachments shall be retained for a minimum of 5 years.                | Retention policies configured in storage; automated retention test confirms no premature deletion                      | **AI-Added** |
| **NFR-012** | Role-Based Access     | Each user role shall have access only to the features and data defined in Section 6; any cross-role access attempt shall be denied and logged.              | Penetration test: each role attempts access to out-of-scope features; all denied; denials logged                       | Source Docs  |
| **NFR-013** | Localisation          | All timestamps displayed to users shall show both UTC and the user's configured local timezone.                                                             | Timestamps display in dual format across all views; timezone setting is configurable per user profile                  | **AI-Added** |
| **NFR-014** | Error Handling        | All user-facing error states shall display a clear, actionable message; technical error codes shall not be exposed to non-Admin users.                      | QA review confirms no raw stack traces or HTTP codes visible to Advisor or Compliance Officer roles in error scenarios | **AI-Added** |

10\. Data Requirements

10.1 Core Data Entities

| **Entity**                        | **Key Attributes**                                                                                                                                | **Notes**                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Client Profile**                | client_id, full_name, risk_profile (Enum), investment_goals (text), time_horizon (years), assigned_advisor_id, created_at, updated_at             | Source: mock data for MVP; live CRM integration in Phase 2. |
| **Portfolio Holdings**            | holding_id, client_id, asset_class, security_name, ticker, quantity, current_value, current_allocation_pct, target_allocation_pct, as_of_date     | Drift = \|current_allocation_pct − target_allocation_pct\|. |
| **Rebalancing Proposal**          | proposal_id (PROP-YYYYMMDD-NNNN), client_id, advisor_id, status (Enum), version, created_at, submitted_at, resolved_at, notes, suitability_result | Immutable after Approved; status transitions logged.        |
| **Proposal Version**              | version_id, proposal_id, version_number, allocations_snapshot (JSON), saved_by, saved_at                                                          | Created on every save or state transition.                  |
| **Suitability Validation Report** | report_id, proposal_id, version_id, run_at, overall_result (Enum), violations (JSON array)                                                        | JSON: \[{rule_id, severity, description}\].                 |
| **Compliance Rule**               | rule_id, rule_name, risk_profile_target, asset_class, operator, threshold_pct, severity (Critical/Warning), is_active, modified_by, modified_at   | Configurable by Compliance Officer.                         |
| **Audit Log Entry**               | log_id, timestamp_utc, user_id, user_role, action_type, entity_type, entity_id, previous_state, new_state, source_ip, session_id                  | Append-only; no update or delete permitted.                 |
| **User Account ★ AI-ADDED**       | user_id, full_name, email, role (Enum), is_active, sso_provider_id, mfa_enabled, created_at, last_login_at                                        | AI-Added. Managed by System Admin.                          |

10.2 Data Validation Rules

- All monetary values shall be stored as 64-bit floating point with precision to 2 decimal places.
- Allocation percentages shall be stored and validated to a maximum of 2 decimal places; total must equal 100.00%.
- Proposal IDs shall be unique across the system lifetime; uniqueness enforced at the database layer. **★ AI-ADDED**
- Risk profile enumeration: \[Conservative, Moderate, Aggressive, Custom\]; no other values accepted. **★ AI-ADDED**
- Email addresses for user accounts shall be validated against RFC 5322 format before storage. **★ AI-ADDED**

11\. Integration Requirements

All integration requirements below were inferred to ensure architectural completeness and are marked as AI-Added. The source documents did not specify integration interfaces.

| **ID**      | **Integration Point**          | **Description**                                                                                                               | **Protocol / Standard**                          |
| ----------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **INT-001** | **Identity Provider (SSO)**    | Authenticate users via the firm's existing IdP using SAML 2.0 or OAuth 2.0 / OIDC.                                            | SAML 2.0 / OAuth 2.0 + OIDC                      |
| **INT-002** | **Email Notification Service** | Dispatch workflow notification emails (Compliance Review, Approval, Rejection, Escalation) via a transactional email service. | SMTP / REST API (e.g., SendGrid or AWS SES)      |
| **INT-003** | **AI/LLM Service**             | Call an AI language model API to generate client summaries based on a structured prompt containing proposal and client data.  | HTTPS REST (e.g., Anthropic API or Azure OpenAI) |
| **INT-004** | **Document Storage**           | Store proposal attachments (PDFs) in a secure, encrypted object storage service.                                              | AWS S3 / Azure Blob with SSE-S3                  |
| **INT-005** | **Mock Data Seed (MVP only)**  | Load mock client profiles, portfolio holdings, and compliance rules at environment startup for demo and testing.              | Internal seed script; no external API            |

12\. UX / UI Requirements

12.1 Design Principles

- Clarity First: Information hierarchy must guide the advisor to the most critical action on each screen without cognitive overload.
- Status Transparency: Every proposal and portfolio must display its current state clearly at all times.
- Progressive Disclosure: Complex validation results should be summarised first with detail available on demand.
- Error Prevention: Forms should guide users away from invalid states (e.g., real-time allocation sum validation) before submission. **★ AI-ADDED**

  12.2 Key UI Screens Required

| **Screen** | **Name**                          | **Key UI Elements**                                                                                                                                                     |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S-01**   | **Login / SSO Entry**             | SSO redirect button, firm logo, error messaging for failed auth.                                                                                                        |
| **S-02**   | **Advisor Dashboard**             | Sortable/filterable client table, drift colour indicators, proposal status badges, quick-action buttons, last-updated timestamp.                                        |
| **S-03**   | **Portfolio Detail**              | Holdings table, current vs. target allocation chart, client profile card, proposal history list, CSV export button.                                                     |
| **S-04**   | **Proposal Creator**              | Allocation editor (inputs + sliders), real-time sum validator, pre/post comparison panel, notes field, attachment upload, version history sidebar, auto-save indicator. |
| **S-05**   | **Suitability Report Modal**      | Overall pass/fail banner, violation list with severity badges, per-violation descriptions, warning acknowledgement checkboxes, proceed/cancel actions.                  |
| **S-06**   | **Compliance Review View**        | Proposal summary, suitability report, version history, comment thread, approve/reject action panel.                                                                     |
| **S-07**   | **Audit Trail Viewer ★ AI-ADDED** | Filterable log table (date, user, action, entity), export to CSV button.                                                                                                |
| **S-08**   | **AI Summary Editor ★ AI-ADDED**  | AI-generated text in editable rich-text field, original AI output (read-only toggle), PDF export button, last saved indicator.                                          |
| **S-09**   | **Admin Panel ★ AI-ADDED**        | User management table, role assignment, SSO config, suitability rule editor, delegation management.                                                                     |

12.3 Navigation Structure

- Primary navigation: Dashboard | Proposals | Audit Trail (Compliance only) | Admin (Admin only).
- In-page breadcrumb: Dashboard > Client Name > Proposal ID.
- All primary actions must be reachable within 3 clicks from the dashboard. **★ AI-ADDED**

13\. Risks & Mitigation

| **#**    | **Risk Description**                                                                                                               | **Probability** | **Impact** | **Mitigation Strategy**                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **R-01** | Mock data may not reflect real portfolio complexity, limiting realistic validation of the suitability engine.                      | **Medium**      | **High**   | Define a representative mock data set covering edge cases; conduct a suitability rule review with compliance before demo.    |
| **R-02** | Simplified compliance rules engine may not capture all regulatory nuances, creating a gap between MVP and production requirements. | **High**        | **High**   | Document all rule simplification decisions; plan a Phase 2 rules engine upgrade; obtain compliance sign-off on MVP rule set. |
| **R-03** | AI summary quality may be inconsistent for edge-case portfolios.                                                                   | **Medium**      | **Medium** | Define prompt engineering standards; implement human editing step; track summary edit rate as a quality KPI.                 |
| **R-04** | SSO integration delays with the firm's IdP may block end-to-end testing. **★ AI-ADDED**                                            | **Medium**      | **High**   | Implement local username/password fallback for non-production environments; engage IdP team early.                           |
| **R-05** | Audit log volume may exceed storage projections at scale. **★ AI-ADDED**                                                           | **Low**         | **Medium** | Size storage based on 500 users × 200 actions/day × 365 days × 7 years; implement archiving for logs > 1 year old.           |
| **R-06** | Scope creep from stakeholders requesting real-time market data during MVP. **★ AI-ADDED**                                          | **High**        | **Medium** | Maintain firm out-of-scope list; formal change control process for any scope additions post-baseline.                        |

14\. Open Questions & Deferred Decisions

| **#**    | **Question / Decision**                                                                                    | **Options**                    | **Owner**                   | **Due**  |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------- | -------- |
| **Q-01** | What is the firm's chosen IdP for SSO? SAML 2.0 or OAuth 2.0/OIDC?                                         | _SAML 2.0 / OAuth 2.0_         | **Tech Lead**               | Sprint 1 |
| **Q-02** | Which AI/LLM provider will be used for summary generation? (Anthropic, Azure OpenAI, etc.)                 | _Anthropic API / Azure OpenAI_ | **Tech Lead**               | Sprint 1 |
| **Q-03** | What is the exact set of compliance rules to be seeded for MVP? (Awaiting compliance team sign-off)        | _TBD by Compliance Officer_    | **Compliance Officer**      | Sprint 2 |
| **Q-04** | What are the branding requirements for the AI-generated PDF summary (logo, template)?                      | _Firm standard template_       | **Product Manager**         | Sprint 3 |
| **Q-05** | Should escalation notifications (R-032) go to Operations Lead only or also to the Head of Wealth Advisory? | _Operations Lead only / Both_  | **Head of Wealth Advisory** | Sprint 2 |
| **Q-06** | What is the target cloud platform for deployment: AWS or Azure?                                            | _AWS / Azure_                  | **Tech Lead**               | Sprint 1 |

15\. Requirements Traceability Matrix (RTM)

The following matrix traces each functional requirement to its parent Epic, corresponding user story summary (for JIRA backlog), and relevant UX screen - enabling direct JIRA ticket creation and design handoff.

| **FR ID**      | **Epic**  | **JIRA User Story (As a…)**                                                                                                         | **UX Screen**             | **Source**          |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------- |
| **FR-001**     | **EP-01** | As a Financial Advisor, I want to see all my assigned client portfolios on a dashboard so I can prioritise rebalancing actions.     | _S-02 Dashboard_          | Src Docs            |
| **FR-002**     | **EP-01** | As a Financial Advisor, I want colour-coded drift indicators so I can instantly identify portfolios requiring attention.            | _S-02 Dashboard_          | Src Docs            |
| **FR-003**     | **EP-01** | As a Financial Advisor, I want to filter and sort the dashboard so I can focus on specific client segments.                         | _S-02 Dashboard_          | Src Docs            |
| **FR-004**     | **EP-01** | As a Financial Advisor, I want to see the proposal status per client on the dashboard so I don't duplicate work.                    | _S-02 Dashboard_          | Src Docs            |
| **FR-005**     | EP-01     | As a Financial Advisor, I want the dashboard to show a last-updated timestamp and a manual refresh so I know data is current.       | _S-02 Dashboard_          | **AI-Added**        |
| **FR-006**     | **EP-02** | As a Financial Advisor, I want to see all holdings for a client so I can understand the current portfolio composition.              | _S-03 Portfolio Detail_   | Src Docs            |
| **FR-007**     | **EP-02** | As a Financial Advisor, I want a visual chart of current vs. target allocation so I can spot allocation gaps quickly.               | _S-03 Portfolio Detail_   | Src Docs            |
| **FR-008**     | **EP-02** | As a Financial Advisor, I want to view a client's risk profile and goals so I can ensure proposals are aligned.                     | _S-03 Portfolio Detail_   | Src Docs            |
| **FR-009**     | EP-02     | As a Financial Advisor, I want to view prior proposal history so I have context for this client.                                    | _S-03 Portfolio Detail_   | **AI-Added**        |
| **FR-010**     | EP-02     | As a Financial Advisor, I want to export holdings data to CSV/Excel so I can perform offline analysis.                              | _S-03 Portfolio Detail_   | **AI-Added**        |
| **FR-011-020** | **EP-03** | As a Financial Advisor, I want to create, edit, version, and submit rebalancing proposals with real-time validation.                | _S-04 Proposal Creator_   | Src Docs            |
| **FR-021-026** | **EP-04** | As a Financial Advisor, I want the system to auto-validate suitability on submission so I can be confident proposals are compliant. | _S-05 Suitability Modal_  | Src Docs / AI-Added |
| **FR-027-033** | **EP-05** | As a Compliance Officer, I want to review, approve, or reject proposals with audit-backed accountability.                           | _S-06 Compliance View_    | Src Docs / AI-Added |
| **FR-034-038** | **EP-07** | As a Financial Advisor, I want AI-generated client summaries so I can communicate changes professionally and efficiently.           | _S-08 AI Summary Editor_  | Src Docs / AI-Added |
| **FR-039-043** | **EP-06** | As a Compliance Officer, I want a searchable, exportable audit trail so I can demonstrate regulatory compliance.                    | _S-07 Audit Trail Viewer_ | Src Docs / AI-Added |
| **FR-044-048** | EP-08     | As a System Admin, I want SSO, RBAC, and MFA so the platform is secure and access-controlled from day one.                          | _S-09 Admin Panel_        | **AI-Added**        |

16\. Glossary

| **Term**        | **Definition**                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BRD**         | Business Requirements Document - the authoritative contract defining what a system must deliver.                                                      |
| **Drift**       | The deviation between a portfolio's current asset allocation and its target allocation, expressed as a percentage difference.                         |
| **Rebalancing** | The process of adjusting a portfolio's holdings to restore the target asset allocation.                                                               |
| **Suitability** | The regulatory and firm-level requirement that investment recommendations align with the client's stated risk profile, goals, and time horizon.       |
| **Proposal**    | A formal document created by an advisor specifying the proposed changes to a client's asset allocation.                                               |
| **RBAC**        | Role-Based Access Control - a method of restricting system access based on the roles of individual users within the organisation.                     |
| **SSO**         | Single Sign-On - an authentication scheme that allows a user to log in with a single set of credentials to multiple applications.                     |
| **SAML 2.0**    | Security Assertion Markup Language 2.0 - an open standard for exchanging authentication and authorisation data between an IdP and a service provider. |
| **MFA**         | Multi-Factor Authentication - a security mechanism requiring two or more verification factors for authentication.                                     |
| **Audit Trail** | A chronological, immutable record of all system events and user actions, used for compliance and forensic purposes.                                   |
| **MVP**         | Minimum Viable Product - the smallest set of features that delivers measurable value to end users and satisfies the core business objectives.         |
| **TLS**         | Transport Layer Security - a cryptographic protocol for securing data in transit over a network.                                                      |
| **AES-256**     | Advanced Encryption Standard with a 256-bit key - the standard for encrypting data at rest.                                                           |
| **WCAG 2.1 AA** | Web Content Accessibility Guidelines version 2.1, Level AA - the internationally recognised standard for web accessibility.                           |
| **IdP**         | Identity Provider - a service that stores and manages digital identities (e.g., Azure AD, Okta).                                                      |

17\. Document Sign-Off

By signing below, the named stakeholders confirm they have reviewed this Business Requirements Document, that the requirements accurately reflect the agreed business needs, and that this document shall serve as the baseline for design, architecture, and JIRA backlog creation.

| **Name** | **Role**                     | **Signature** | **Date** |
| -------- | ---------------------------- | ------------- | -------- |
|          | **Head of Wealth Advisory**  |               |          |
|          | **Product Manager**          |               |          |
|          | **Chief Compliance Officer** |               |          |
|          | **Technology Lead**          |               |          |

<div class="joplin-table-wrapper"><table><tbody><tr><th><p><strong>★ Summary of AI-Added Requirements &amp; Sections</strong></p><p>The following items were not present in the source documents and were added by the document author to ensure the BRD is complete, unambiguous, and production-ready:</p><ul><li>EP-08 - Authentication &amp; Access Control (entire epic): SSO, RBAC, MFA, session management, user admin (FR-044 to FR-048).</li><li>FR-004 - Dashboard proposal status visibility.</li><li>FR-005 - Dashboard auto-refresh and last-updated timestamp.</li><li>FR-009 - Proposal history list on Portfolio Detail view.</li><li>FR-010 - Holdings CSV/Excel export.</li><li>FR-013 / FR-015 - Proposal auto-save and last-saved indicator.</li><li>FR-016 - Proposal unique ID format (PROP-YYYYMMDD-NNNN).</li><li>FR-019 - File attachment support (PDF, 10 MB, up to 5 files).</li><li>FR-024 / FR-025 - Hard-stop for critical suitability violations; advisory-acknowledgement for warnings.</li><li>FR-026 - Compliance rule configuration via admin panel.</li><li>FR-028 / FR-030 - In-app and email notifications for workflow state changes.</li><li>FR-032 - 5-business-day SLA escalation trigger for compliance review.</li><li>FR-033 - Compliance officer delegation mechanism.</li><li>FR-036 / FR-037 / FR-038 - AI summary editing, PDF export, and 30-second SLA.</li><li>FR-040 - Extended audit log fields (IP address, session ID, previous/new state).</li><li>FR-042 / FR-043 - 7-year audit log retention; searchable filtered export.</li><li>NFR-003 - API response time SLA (≤ 500 ms).</li><li>NFR-005 - Scalability to 500 concurrent users.</li><li>NFR-007 - AES-256 encryption at rest.</li><li>NFR-008 - WCAG 2.1 AA accessibility compliance.</li><li>NFR-009 - Browser compatibility matrix.</li><li>NFR-010 - Tablet-responsive UI (≥ 768 px).</li><li>NFR-011 - Data retention policy (7 years audit, 5 years proposals).</li><li>NFR-012 - Scalability test to 500 concurrent users.</li><li>NFR-013 - Dual-timezone timestamp display.</li><li>NFR-014 - Error handling and user-safe error messaging.</li><li>Section 10 - Full data entity model with attribute definitions and validation rules.</li><li>Section 11 - Integration requirements (SSO IdP, email service, AI/LLM, document storage).</li><li>Section 12 - UX screen inventory, navigation structure, and design principles.</li><li>Section 13 - Additional risks (IdP integration delays, audit log volume, scope creep).</li><li>Section 14 - Open questions register with owners and due dates.</li></ul></th></tr></tbody></table></div>