# Microsoft Power Platform Technical Guide

## GitHub Branching Agent

### Overview

The GitHub Branching Agent is a powerful tool designed to streamline and enhance your GitHub workflow. With capabilities to create, manage, and delete branches, this agent ensures seamless collaboration and efficient version control. It integrates directly with GitHub APIs, providing real-time feedback and actionable insights. Whether you're a developer looking to automate repetitive tasks or a team lead aiming to enforce best practices, this agent is your go-to solution for all things branching.

---

## 🧠 Step 1: Define Your Agent's Purpose

Decide the scope of the agent:

- Will it support branching operations like `create branch`, `merge`, `delete`?  
  ✅ Yes, it will support creating a branch, merging, and deleting branches.
- Should it guide users through branching strategy best practices?  
  ✅ Yes, it will walk users through the process but also provide a quick action for efficiency.
- Will it directly execute GitHub Actions or just provide recommendations?  
  ✅ It will execute GitHub Actions using the API.

---

## 🔧 Step 2: Set Up Copilot Studio Agent

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com/) and **create a new agent**.
2. Name your agent something clear like `BranchMasterBot` or `GitBranch Advisor`.
3. Choose a **custom topic** structure or start with prebuilt templates.
4. Enable **webhook capabilities** if you plan to integrate with GitHub APIs.

---

## 🗂 Step 3: Integrate GitHub Repository

To interact with GitHub branching:

### Create a GitHub Personal Access Token (PAT)

- Required scopes:
  - `repo` (for read/write access)
  - `workflow` (if executing Actions)

### Create a Custom Connector

1. **Define the Connector**  
   - In Copilot Studio, go to **Custom Connectors**  
   - Click **Create New Connector** → name it `GitHubBranchConnector`

2. **Configure Authentication**  
   - Choose OAuth 2.0 or API Key  
   - OAuth:
     - Auth URL: `https://github.com/login/oauth/authorize`
     - Token URL: `https://github.com/login/oauth/access_token`  
   - API Key:
     - Enter GitHub PAT as key

3. **Define Actions**  
   Add GitHub API endpoints:
   - `GET /repos/:owner/:repo/branches`  
   - `POST /repos/:owner/:repo/git/refs`  
   - `DELETE /repos/:owner/:repo/git/refs/:ref`

4. **Test and Deploy**
   - Validate actions with sample inputs
   - Save and link the connector to your agent
   - Store the PAT securely via Copilot Studio or Azure Key Vault

---

## 🧩 Step 4: Build Branching Dialogs

### Flow: Create a New Branch

- **Trigger phrase:** “Make a new branch from `main`”
- **User input:** Repository and branch name
- **API call:** `POST /repos/:owner/:repo/git/refs`
- **Response:** Confirm with branch name and link

Repeat for:
- Listing branches
- Merging branches
- Deleting a branch

---

## 🧩 Step 4.1: Add Files to the New Branch

### Flow: Add Files to Branch

- **Trigger phrase:** “Add files to branch `feature-branch`”
- **User input:** File name(s), content
- **API call:**  
  `PUT /repos/:owner/:repo/contents/:path`

**Parameters:**
- `owner`, `repo`, `path`, `message`, `content` (base64), `branch`

---

## 🧩 Step 4.2: Create a Pull Request

### Flow: Create a Pull Request

- **Trigger phrase:** “Open a pull request for `feature-branch`”
- **User input:** Repo name, branch name, title, description
- **API call:**  
  `POST /repos/:owner/:repo/pulls`

**Parameters:**
- `title`, `head`, `base`, `body`

Repeat for:
- Adding reviewers  
- Assigning labels  
- Linking issues

---

## 🤝 Step 5: Train and Test Your Agent

- Add intent variations:
  - “Spin off a new feature branch”
  - “Help me merge dev into main”
- Use the Test tab for simulated chats
- Validate API calls using mock data if needed

---

## 🚀 Step 6: Deploy and Monitor

- Deploy to Microsoft Teams, websites, or DevOps portals
- Monitor usage via Copilot Studio analytics
- Optional: Set alerts for GitHub workflow failures

---

## 🧠 Extra Tips

| Feature              | Branching Use                                 |
|----------------------|-----------------------------------------------|
| Entity recognition   | Auto-detect repo and branch names             |
| Custom prompts       | GitHub Flow vs Git Flow guidance              |
| Environment strategy | Integrate with Power Platform governance      |
| Adaptive cards       | Display branch details and commits in Teams  |

---

## Instructions

1. Define agent capabilities and scope
2. Set up agent in Copilot Studio
3. Authenticate and build GitHub connector
4. Design dialogs for branching, file upload, PR creation
5. Train and validate agent interactions
6. Deploy and monitor usage
7. Incorporate best practices like entity recognition and governance

---

## 🔄 Summary

The GitHub Branching Agent is a service-ready component for handling GitHub branching tasks and integrating with other agents or workflows. It supports modular dialog flows, secure API calls, and flexible deployment across platforms like Teams and DevOps.

Use it to scale branching automation, enforce workflow hygiene, and support governance strategies — all within the Microsoft Power Platform ecosystem.
```
