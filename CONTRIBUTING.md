### Contributing to GreenHealth AI

Thank you for your interest in contributing to GreenHealth AI — a real-time hospital sustainability intelligence platform built with Pathway, FastAPI, and React.

We welcome all kinds of contributions:

🐛 Bug reports

💡 Feature suggestions

📚 Documentation improvements

🔧 Code contributions

🧠 AI / RAG optimizations

### Getting Started

1️⃣ Fork & Clone the Repository
git clone https://github.com/your-username/greenhealth-ai.git
cd greenhealth-ai
2️⃣ Set Up Development Environment
Backend Setup
cd backend
python -m venv venv

Activate environment:

Mac/Linux:
source venv/bin/activate

Windows:
venv\Scripts\activate

### Install dependencies:

pip install -r requirements.txt
Frontend Setup
cd frontend
npm install
npm start
3️⃣ Create a Feature Branch
git checkout -b feature/your-feature-name
🛠 Development Workflow
✅ Before You Start

Check existing issues to avoid duplicate work

For major features, open an issue first

Ensure your idea aligns with:

Real-time streaming architecture

Sustainability intelligence goals

Production-ready design principles

💻 Making Changes
General Guidelines

Write clean, readable code

Follow existing project structure

Add comments for complex logic

Update README if APIs or architecture change

Test everything locally before submitting

### Backend (FastAPI + Pathway)

When contributing to backend:

Keep functions focused and modular

Add type hints where possible

Follow async best practices in FastAPI

Maintain streaming integrity in Pathway pipelines

Avoid blocking operations in streaming workflows

Document environment variables in .env.example

Consider memory & performance impact

If modifying streaming logic:

Preserve pw.io.subscribe integrity

Ensure windowby and reducers remain deterministic

Validate pipeline with pw.run()

###  Frontend (React Dashboard)

Use TypeScript for type safety

Follow React best practices

Keep components reusable and modular

Maintain consistent UI styling

Test WebSocket live updates

Verify charts render correctly with real-time data

Ensure responsive design

### AI / RAG Contributions

If working on AI Copilot:

Keep retrieval grounded in sustainability documents

Optimize embeddings or retrieval logic carefully

Avoid hallucination-prone prompts

Document prompt design changes clearly

Validate answers against source documents

### Submitting Changes
1️⃣ Commit Your Changes
git add .
git commit -m "Add: short description of feature"
Commit Message Guidelines

Use present tense
✅ "Add sustainability alert logic"
❌ "Added sustainability alert logic"

Keep first line under 50 characters

Add details in commit body if needed

2️⃣ Push to Your Fork
git push origin feature/your-feature-name
3️⃣ Open a Pull Request

When opening a PR:

Clearly describe what you changed

Explain why the change was needed

Reference related issues

Include screenshots (for UI changes)

Mention performance impact if relevant

## Reporting Bugs

Found an issue? Please include:

Expected behavior

Actual behavior

Steps to reproduce

Environment details:

OS

Python version

Node version

Error logs or stack traces

Clear reports help us fix issues faster.

💡 Feature Requests

When suggesting a feature, include:

Problem statement

Proposed solution

Expected impact on sustainability intelligence

Any architecture considerations

🔍 Code Review Process

A maintainer will review your PR

Feedback may request improvements

Once approved, it will be merged

We aim to review PRs within a few days.

📜 Code of Conduct

Be respectful, constructive, and collaborative.

GreenHealth AI promotes an inclusive and professional open-source environment.

🌍 Project Vision Reminder

GreenHealth AI focuses on:

Real-time sustainability intelligence

Stream-first architecture

AI-grounded decision support

Scalable, production-ready design

All contributions should align with these principles.

🙌 Thank You

Your contributions help build smarter, greener hospitals through real-time AI intelligence.

We appreciate your support in advancing sustainable healthcare technology.
