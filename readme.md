# [workoutGPT.com](https://workoutsgpt.io)

Create Workouts in Seconds with chatGPT

## How it works

It's very simple, we just use chatGPT's API to generate a workout plan based on your settings. All you need is an [openAI](https://openaicom) API key to run this. It's built with [Nuxt 3](https://nuxt.com).

## Running Locally

### Cloning the repository the local machine.

```
git clone https://github.com/timb-103/workoutsGPT.git
```

### Creating a account on openai to get an API key.

1. Go to [openAI](https://openaicom) to make an account.
2. Then go to the [API keys page](https://platform.openai.com/account/api-keys)
3. Create a new key and save it somewhere

### Storing the API keys in .env

Once you have your API key, create a .env file in the root of the project and a var OPENAI_API_KEY=your_api_key

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/timb-103/workoutsGPT.git&env=OPENAI_API_KEY&project-name=workoutsGPT&repo-name=workoutsGPT)
